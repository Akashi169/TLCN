const db = require('../models');

class MemberService {
  /**
   * Lấy danh sách hội viên kèm thông tin User, MembershipRank & RentalSession active
   */
  async getAllMembers() {
    try {
      const members = await db.Member.findAll({
        include: [
          {
            model: db.User,
            as: 'userInfo',
            attributes: ['user_id', 'username', 'full_name', 'role', 'phone_number', 'email', 'status', 'last_login']
          },
          {
            model: db.MembershipRank,
            attributes: ['rank_id', 'name']
          },
          {
            model: db.RentalSession,
            where: { status: 'ACTIVE' },
            required: false,
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
        const activeSession = m.RentalSessions && m.RentalSessions[0];
        const comp = activeSession ? activeSession.Computer : null;

        return {
          id: m.member_id,
          uid: `#MB-${String(m.member_id).padStart(3, '0')}`,
          username: m.userInfo ? m.userInfo.username : '',
          full_name: m.userInfo ? m.userInfo.full_name : '',
          phone: m.userInfo ? m.userInfo.phone_number : null,
          email: m.userInfo ? m.userInfo.email : null,
          status: m.userInfo ? m.userInfo.status : 'ACTIVE',
          rank_id: m.rank_id,
          rank_name: m.MembershipRank ? m.MembershipRank.name : 'Đồng',
          real_balance: parseFloat(m.real_balance || 0),
          bonus_balance: parseFloat(m.bonus_balance || 0),
          points: m.points || 0,
          station_name: comp ? comp.computer_name : null,
          station_status: comp ? comp.status : null,
          last_login: m.userInfo ? m.userInfo.last_login : null
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
            attributes: ['user_id', 'username', 'full_name', 'role', 'phone_number', 'email', 'status', 'last_login']
          },
          {
            model: db.MembershipRank
          },
          {
            model: db.RentalSession,
            where: { status: 'ACTIVE' },
            required: false,
            include: [{ model: db.Computer }]
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
   * Chỉnh sửa thông tin hồ sơ cơ bản (Họ tên, Số điện thoại, Email)
   * Tuân thủ quy tắc business logic: KHÔNG chỉnh sửa trực tiếp số dư, điểm thưởng, hạng TV hay máy/trạm
   */
  async updateMemberInfo(memberId, { full_name, phone_number, email }) {
    try {
      const member = await db.Member.findByPk(memberId, {
        include: [{ model: db.User, as: 'userInfo' }]
      });
      if (!member || !member.userInfo) return null;

      if (full_name !== undefined) member.userInfo.full_name = full_name;
      if (phone_number !== undefined) member.userInfo.phone_number = phone_number;
      if (email !== undefined) member.userInfo.email = email;

      await member.userInfo.save();
      return member;
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin hội viên:', error);
      throw error;
    }
  }

  /**
   * Cập nhật trạng thái tài khoản (ACTIVE, LOCKED, SUSPENDED)
   */
  async updateAccountStatus(memberId, status) {
    try {
      const allowedStatuses = ['ACTIVE', 'LOCKED', 'SUSPENDED'];
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
