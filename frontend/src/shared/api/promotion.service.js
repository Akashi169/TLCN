import { apiClient } from './client';

/**
 * PromotionService (Frontend API Client)
 * Connects frontend features STRICTLY to /api/promotions backend endpoint.
 * Zero mock data on frontend. All data must come from MySQL Database.
 */
class PromotionService {
  /**
   * Lấy tất cả chiến dịch khuyến mãi & metrics từ MySQL Database
   */
  async getPromotions() {
    try {
      const response = await apiClient.get('/promotions');
      if (response && response.status === 'success') {
        const promotionsList = Array.isArray(response.data)
          ? response.data.map((p) => this.mapPromotionData(p))
          : [];
        return {
          promotions: promotionsList,
          metrics: response.metrics || null
        };
      }
      return { promotions: [], metrics: null };
    } catch (error) {
      console.error('Lỗi khi tải khuyến mãi từ backend API /api/promotions:', error);
      return { promotions: [], metrics: null };
    }
  }

  /**
   * Tạo khuyến mãi mới vào CSDL
   */
  async createPromotion(data) {
    try {
      const response = await apiClient.post('/promotions', data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo khuyến mãi mới:', error);
      throw error;
    }
  }

  /**
   * Cập nhật thông tin khuyến mãi trong CSDL
   */
  async updatePromotion(id, data) {
    try {
      const response = await apiClient.put(`/promotions/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Bật/Tắt kích hoạt khuyến mãi trong CSDL
   */
  async togglePromotionStatus(id, isActive) {
    try {
      const response = await apiClient.patch(`/promotions/${id}/toggle`, { is_active: isActive });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái kích hoạt khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Xóa khuyến mãi khỏi CSDL
   */
  async deletePromotion(id) {
    try {
      const response = await apiClient.delete(`/promotions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa khuyến mãi:', error);
      throw error;
    }
  }

  /**
   * Map raw MySQL DB response to clean frontend data representation
   */
  mapPromotionData(p) {
    return {
      id: p.promotion_id,
      code: p.code || '',
      name: p.name || 'Chiến dịch khuyến mãi',
      description: p.description || '',
      discountType: p.discount_type || 'PERCENTAGE',
      discountValue: Number(p.discount_value || 0),
      maxDiscountAmount: p.max_discount_amount ? Number(p.max_discount_amount) : null,
      minDepositAmount: p.min_deposit_amount ? Number(p.min_deposit_amount) : null,
      startDate: p.start_date || '',
      endDate: p.end_date || '',
      scheduleNote: p.schedule_note || '',
      targetAudience: p.target_audience || 'ALL',
      status: p.status || 'ACTIVE',
      budgetSpent: Number(p.budget_spent || 0),
      totalBudget: Number(p.total_budget || 60000000),
      isActive: Boolean(p.is_active)
    };
  }
}

export default new PromotionService();
