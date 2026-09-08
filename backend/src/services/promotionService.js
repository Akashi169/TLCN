const db = require('../models');

/**
 * PromotionService
 * Quản lý nghiệp vụ các Chiến dịch Khuyến mãi & Ưu đãi
 * Tuân thủ quy tắc SOLID & Clean Code Architecture
 */
class PromotionService {
  /**
   * Lấy danh sách tất cả khuyến mãi + tính toán số liệu KPI metrics
   */
  async getAllPromotions() {
    try {
      const promotions = await db.Promotion.findAll({
        order: [['promotion_id', 'ASC']]
      });

      // Calculate summary metrics for KPI cards
      const totalCount = promotions.length;
      const activeCount = promotions.filter(p => p.status === 'ACTIVE' && p.is_active).length;
      const upcomingCount = promotions.filter(p => p.status === 'UPCOMING').length;
      const endedCount = promotions.filter(p => p.status === 'ENDED' || !p.is_active).length;

      const totalBudgetSpent = promotions.reduce((sum, p) => sum + Number(p.budget_spent || 0), 0);
      const totalMaxBudget = 60000000; // 60M VNĐ
      const budgetPercent = Number(((totalBudgetSpent / totalMaxBudget) * 100).toFixed(1));

      const metrics = {
        totalPromotions: totalCount,
        activePromotions: activeCount,
        upcomingPromotions: upcomingCount,
        endedPromotions: endedCount,
        budgetSpent: totalBudgetSpent,
        totalBudget: totalMaxBudget,
        budgetPercent: budgetPercent
      };

      return {
        promotions,
        metrics
      };
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Lấy chi tiết 1 khuyến mãi theo ID
   */
  async getPromotionById(id) {
    try {
      return await db.Promotion.findByPk(id);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Tạo chiến dịch khuyến mãi mới
   */
  async createPromotion(promoData) {
    try {
      const newPromo = await db.Promotion.create({
        code: promoData.code || `#PROMO-${Math.floor(1000 + Math.random() * 9000)}`,
        name: promoData.name,
        description: promoData.description || null,
        discount_type: promoData.discount_type || 'PERCENTAGE',
        discount_value: promoData.discount_value || 0,
        max_discount_amount: promoData.max_discount_amount || null,
        min_deposit_amount: promoData.min_deposit_amount || null,
        start_date: promoData.start_date || null,
        end_date: promoData.end_date || null,
        schedule_note: promoData.schedule_note || null,
        target_audience: promoData.target_audience || 'ALL',
        status: promoData.status || 'ACTIVE',
        budget_spent: 0,
        total_budget: promoData.total_budget || 60000000,
        is_active: promoData.is_active !== undefined ? promoData.is_active : true
      });
      return newPromo;
    } catch (error) {
      console.error('Lỗi khi tạo mới khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Cập nhật thông tin chiến dịch khuyến mãi
   */
  async updatePromotion(id, updateData) {
    try {
      const promo = await db.Promotion.findByPk(id);
      if (!promo) return null;

      Object.assign(promo, updateData);
      await promo.save();
      return promo;
    } catch (error) {
      console.error('Lỗi khi cập nhật khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Bật/Tắt kích hoạt khuyến mãi
   */
  async togglePromotionStatus(id, isActive) {
    try {
      const promo = await db.Promotion.findByPk(id);
      if (!promo) return null;

      promo.is_active = isActive;
      if (!isActive && promo.status === 'ACTIVE') {
        promo.status = 'SUSPENDED';
      } else if (isActive && promo.status === 'SUSPENDED') {
        promo.status = 'ACTIVE';
      }

      await promo.save();
      return promo;
    } catch (error) {
      console.error('Lỗi khi đổi trạng thái kích hoạt khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Xóa chiến dịch khuyến mãi
   */
  async deletePromotion(id) {
    try {
      const promo = await db.Promotion.findByPk(id);
      if (!promo) return false;
      await promo.destroy();
      return true;
    } catch (error) {
      console.error('Lỗi khi xóa khuyến mãi:', error);
      throw error;
    }
  }
}

module.exports = new PromotionService();
