const promotionService = require('../services/promotionService');

/**
 * PromotionController
 * Điều hướng request HTTP và phản hồi kết quả nghiệp vụ Khuyến Mãi
 */
class PromotionController {
  async getPromotions(req, res, next) {
    try {
      const data = await promotionService.getAllPromotions();
      return res.json({
        status: 'success',
        data: data.promotions,
        metrics: data.metrics,
        message: 'Lấy danh sách chiến dịch khuyến mãi thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async getPromotionById(req, res, next) {
    try {
      const { id } = req.params;
      const promo = await promotionService.getPromotionById(id);
      if (!promo) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy chiến dịch khuyến mãi'
        });
      }
      return res.json({
        status: 'success',
        data: promo
      });
    } catch (error) {
      next(error);
    }
  }

  async createPromotion(req, res, next) {
    try {
      const newPromo = await promotionService.createPromotion(req.body);
      return res.status(201).json({
        status: 'success',
        data: newPromo,
        message: 'Tạo chiến dịch khuyến mãi mới thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePromotion(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await promotionService.updatePromotion(id, req.body);
      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy chiến dịch khuyến mãi để cập nhật'
        });
      }
      return res.json({
        status: 'success',
        data: updated,
        message: 'Cập nhật chiến dịch khuyến mãi thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async togglePromotionStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { is_active } = req.body;
      const updated = await promotionService.togglePromotionStatus(id, is_active);
      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy chiến dịch khuyến mãi'
        });
      }
      return res.json({
        status: 'success',
        data: updated,
        message: `Đã ${is_active ? 'bật' : 'tắt'} khuyến mãi thành công`
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePromotion(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await promotionService.deletePromotion(id);
      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy chiến dịch khuyến mãi để xóa'
        });
      }
      return res.json({
        status: 'success',
        message: 'Xóa chiến dịch khuyến mãi thành công'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PromotionController();
