const memberService = require('../services/memberService');

class MemberController {
  async getMembers(req, res, next) {
    try {
      const members = await memberService.getAllMembers();
      return res.json({
        status: 'success',
        data: members,
        message: 'Lấy danh sách hội viên thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async getMemberById(req, res, next) {
    try {
      const { id } = req.params;
      const member = await memberService.getMemberById(id);
      if (!member) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy hội viên'
        });
      }
      return res.json({
        status: 'success',
        data: member
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MemberController();
