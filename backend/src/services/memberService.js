const db = require('../models');

class MemberService {
  /**
   * Lấy danh sách hội viên kèm thông tin User, MembershipRank & Trạng thái máy
   */
  async getAllMembers() {
    try {
      const members = await db.Member.findAll({
        include: [
          {
            model: db.User,
            as: 'userInfo',
            attributes: ['user_id', 'username', 'full_name', 'role', 'status']
          },
          {
            model: db.MembershipRank,
            attributes: ['rank_id', 'name', 'discount_percent']
          },
          {
            model: db.ComputerStatusLog,
            required: false,
            order: [['recorded_at', 'DESC']],
            limit: 1,
            include: [
              {
                model: db.Computer,
                attributes: ['computer_id', 'computer_name', 'status']
              }
            ]
          }
        ],
        order: [['member_id', 'ASC']]
      });

      return members.map((m) => {
        const latestLog = m.ComputerStatusLogs && m.ComputerStatusLogs[0];
        const comp = latestLog ? latestLog.Computer : null;

        return {
          id: m.member_id,
          uid: `#MB-${String(m.member_id).padStart(3, '0')}`,
          username: m.userInfo ? m.userInfo.username : '',
          full_name: m.userInfo ? m.userInfo.full_name : '',
          phone: m.phone || null,
          id_number: m.id_number || null,
          status: m.userInfo ? m.userInfo.status : 'ACTIVE',
          rank_id: m.rank_id,
          rank_name: m.MembershipRank ? m.MembershipRank.name : 'Đồng',
          real_balance: parseFloat(m.real_balance || 0),
          bonus_balance: parseFloat(m.bonus_balance || 0),
          points: m.point || 0,
          station_name: comp ? comp.computer_name : null,
          station_status: comp ? comp.status : null,
          last_login: null
        };
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách hội viên:', error);
      throw error;
    }
  }

  /**
   * Lấy thông tin chi tiết hội viên theo ID
   */
  async getMemberById(memberId) {
    try {
      const member = await db.Member.findByPk(memberId, {
        include: [
          {
            model: db.User,
            as: 'userInfo',
            attributes: ['user_id', 'username', 'full_name', 'role', 'status']
          },
          {
            model: db.MembershipRank
          }
        ]
      });
      return member;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết hội viên:', error);
      throw error;
    }
  }

  /**
   * Chỉnh sửa thông tin hồ sơ cơ bản (Họ tên, Số điện thoại, CCCD)
   */
  async updateMemberInfo(memberId, { full_name, phone_number, phone, id_number }) {
    try {
      const member = await db.Member.findByPk(memberId, {
        include: [{ model: db.User, as: 'userInfo' }]
      });
      if (!member || !member.userInfo) return null;

      if (full_name !== undefined) member.userInfo.full_name = full_name;
      const newPhone = phone || phone_number;
      if (newPhone !== undefined) member.phone = newPhone;
      if (id_number !== undefined) member.id_number = id_number;

      await member.userInfo.save();
      await member.save();
      return member;
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin hội viên:', error);
      throw error;
    }
  }

  /**
   * Cập nhật trạng thái tài khoản (ACTIVE, INACTIVE, LOCKED, BANNED)
   */
  async updateAccountStatus(memberId, status) {
    try {
      const allowedStatuses = ['ACTIVE', 'INACTIVE', 'LOCKED', 'BANNED'];
      if (!allowedStatuses.includes(status)) {
        throw new Error('Trạng thái tài khoản không hợp lệ');
      }

      const member = await db.Member.findByPk(memberId, {
        include: [{ model: db.User, as: 'userInfo' }]
      });
      if (!member || !member.userInfo) return null;

      member.userInfo.status = status;
      await member.userInfo.save();
      return member;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái tài khoản:', error);
      throw error;
    }
  }
}

module.exports = new MemberService();
