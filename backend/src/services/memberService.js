const db = require('../models');

class MemberService {
  /**
   * Lấy danh sách hội viên kèm thông tin User & MembershipRank
   */
  async getAllMembers() {
    try {
      const members = await db.Member.findAll({
        include: [
          {
            model: db.User,
            as: 'userInfo',
            attributes: ['user_id', 'username', 'full_name', 'role']
          },
          {
            model: db.MembershipRank,
            attributes: ['rank_id', 'name']
          }
        ]
      });

      return members;
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
            attributes: ['user_id', 'username', 'full_name', 'role']
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
}

module.exports = new MemberService();
