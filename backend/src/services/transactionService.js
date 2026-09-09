const db = require('../models');
const { TRANSACTION_TYPES, TRANSACTION_CATEGORIES, PAYMENT_METHODS, TRANSACTION_STATUS } = require('../utils/constants');

/**
 * TransactionService
 * Quản lý nghiệp vụ Sổ Cái & Tra Cứu Giao Dịch Tài Chính (Audit Stream v2.4)
 * Tuân thủ quy tắc SOLID & Clean Code Architecture
 */
class TransactionService {
  /**
   * Lấy danh sách giao dịch kèm thông tin Member & User + Tính toán các chỉ số KPI Tài Chính
   */
  async getAllTransactions() {
    try {
      const transactions = await db.FinancialTransaction.findAll({
        include: [
          {
            model: db.Member,
            as: 'memberInfo',
            include: [
              {
                model: db.User,
                as: 'userInfo',
                attributes: ['user_id', 'username', 'full_name', 'phone_number', 'email']
              },
              {
                model: db.MembershipRank,
                attributes: ['rank_id', 'name']
              }
            ]
          }
        ],
        order: [['transaction_id', 'DESC']]
      });

      // Calculate 4 Financial KPI Cards
      let totalRevenueToday = 0;
      let pcTimeRevenue = 0;
      let foodServiceRevenue = 0;
      let successCount = 0;
      let pendingCount = 0;

      transactions.forEach((t) => {
        const amt = parseFloat(t.amount || 0);
        const st = (t.status || '').toUpperCase();
        const type = (t.type || '').toUpperCase();
        const cat = (t.category || '').toUpperCase();

        if (st === TRANSACTION_STATUS.SUCCESS) {
          successCount++;
          if (type === TRANSACTION_TYPES.INCOME) {
            totalRevenueToday += amt;
            if (cat === TRANSACTION_CATEGORIES.TOPUP) {
              pcTimeRevenue += amt;
            } else if (cat === TRANSACTION_CATEGORIES.SERVICE_FOOD) {
              foodServiceRevenue += amt;
            } else if (cat === TRANSACTION_CATEGORIES.COMBINED || cat === TRANSACTION_CATEGORIES.NIGHT_COMBO) {
              // Estimate 65% PC time, 35% F&B for combined orders
              pcTimeRevenue += amt * 0.65;
              foodServiceRevenue += amt * 0.35;
            }
          }
        } else if (st === TRANSACTION_STATUS.PENDING) {
          pendingCount++;
        }
      });

      const totalTxnCount = transactions.length || 1;
      const successRate = Number(((successCount / totalTxnCount) * 100).toFixed(1));

      const metrics = {
        totalRevenueToday,
        pcTimeRevenue: Math.round(pcTimeRevenue),
        pcTimePercent: totalRevenueToday > 0 ? Number(((pcTimeRevenue / totalRevenueToday) * 100).toFixed(1)) : 66.5,
        foodServiceRevenue: Math.round(foodServiceRevenue),
        foodServicePercent: totalRevenueToday > 0 ? Number(((foodServiceRevenue / totalRevenueToday) * 100).toFixed(1)) : 33.5,
        successRate,
        successCount,
        pendingCount,
        totalTxnCount
      };

      const formattedTransactions = transactions.map((t) => {
        const userObj = t.memberInfo ? t.memberInfo.userInfo : null;
        const rankObj = t.memberInfo ? t.memberInfo.MembershipRank : null;

        return {
          id: t.transaction_id,
          txnCode: t.txn_code || `TXN-${String(t.transaction_id).padStart(5, '0')}`,
          type: t.type || TRANSACTION_TYPES.INCOME,
          category: t.category || TRANSACTION_CATEGORIES.TOPUP,
          amount: parseFloat(t.amount || 0),
          paymentMethod: t.payment_method || PAYMENT_METHODS.CASH,
          status: t.status || TRANSACTION_STATUS.SUCCESS,
          memberId: t.member_id,
          memberName: userObj ? userObj.full_name : 'Khách Vãng Lai',
          username: userObj ? userObj.username : 'guest',
          phone: userObj ? userObj.phone_number : '—',
          rankName: rankObj ? rankObj.name : 'Thường',
          computerName: t.computer_name || '—',
          staffName: t.staff_name || 'Thu Ngân Quầy',
          notes: t.notes || '',
          createdAt: t.created_at
        };
      });

      return {
        transactions: formattedTransactions,
        metrics
      };
    } catch (error) {
      console.error('Lỗi khi lấy danh sách giao dịch tài chính:', error);
      throw error;
    }
  }

  /**
   * Map input string to Enum Constant
   */
  mapCategoryToConstant(catInput) {
    const lower = (catInput || '').toLowerCase();
    if (lower.includes('nạp giờ') || lower === 'topup') return TRANSACTION_CATEGORIES.TOPUP;
    if (lower.includes('f&b') || lower.includes('ẩm thực') || lower === 'service_food') return TRANSACTION_CATEGORIES.SERVICE_FOOD;
    if (lower.includes('combo đêm') || lower === 'night_combo') return TRANSACTION_CATEGORIES.NIGHT_COMBO;
    if (lower.includes('kết hợp') || lower === 'combined') return TRANSACTION_CATEGORIES.COMBINED;
    return TRANSACTION_CATEGORIES.OTHER;
  }

  mapPaymentMethodToConstant(pmInput) {
    const lower = (pmInput || '').toLowerCase();
    if (lower.includes('vietqr') || lower.includes('qr')) return PAYMENT_METHODS.VIETQR;
    if (lower.includes('pos') || lower.includes('card') || lower.includes('thẻ')) return PAYMENT_METHODS.POS;
    if (lower.includes('momo') || lower.includes('ví')) return PAYMENT_METHODS.MOMO;
    return PAYMENT_METHODS.CASH;
  }

  /**
   * Tạo mới giao dịch Nạp Tiền Tại Quầy
   */
  async createTopUpTransaction(data) {
    try {
      const { member_id, amount, payment_method, category, computer_name, notes, staff_name } = data;

      // Find target member
      const member = await db.Member.findByPk(member_id, {
        include: [{ model: db.User, as: 'userInfo' }]
      });

      if (!member) {
        throw new Error('Không tìm thấy tài khoản hội viên');
      }

      const topupAmount = parseFloat(amount || 0);
      if (isNaN(topupAmount) || topupAmount <= 0) {
        throw new Error('Số tiền nạp không hợp lệ');
      }

      // Add to member real balance
      member.real_balance = parseFloat(member.real_balance || 0) + topupAmount;
      // Award bonus points (1000 đ = 1 point)
      member.points = (member.points || 0) + Math.floor(topupAmount / 1000);
      await member.save();

      // Create Financial Transaction record (txn_code will be auto-generated by beforeValidate hook if not supplied)
      const newTxn = await db.FinancialTransaction.create({
        type: TRANSACTION_TYPES.INCOME,
        category: this.mapCategoryToConstant(category),
        amount: topupAmount,
        payment_method: this.mapPaymentMethodToConstant(payment_method),
        status: TRANSACTION_STATUS.SUCCESS,
        member_id: member.member_id,
        computer_name: computer_name || null,
        staff_name: staff_name || 'Thu Ngân Quầy',
        notes: notes || `Nạp tiền tại quầy cho ${member.userInfo ? member.userInfo.full_name : 'hội viên'}`,
        created_at: new Date()
      });

      return newTxn;
    } catch (error) {
      console.error('Lỗi khi tạo giao dịch nạp tiền:', error);
      throw error;
    }
  }

  /**
   * Hoàn tiền giao dịch
   */
  async refundTransaction(transactionId, reason) {
    try {
      const txn = await db.FinancialTransaction.findByPk(transactionId);
      if (!txn) return null;

      txn.status = TRANSACTION_STATUS.REFUNDED;
      if (reason) {
        txn.notes = `${txn.notes || ''} [Lý do hoàn tiền: ${reason}]`;
      }
      await txn.save();

      return txn;
    } catch (error) {
      console.error('Lỗi khi hoàn tiền giao dịch:', error);
      throw error;
    }
  }
}

module.exports = new TransactionService();
