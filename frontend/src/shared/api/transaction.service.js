import { apiClient } from './client';

/**
 * TransactionService (Frontend API Client)
 * Connects frontend features STRICTLY to /api/transactions backend endpoint.
 * Zero mock data on frontend. All data must come from MySQL Database.
 */
class TransactionService {
  /**
   * Lấy tất cả giao dịch tài chính & metrics từ CSDL MySQL
   */
  async getTransactions() {
    try {
      const response = await apiClient.get('/transactions');
      if (response && response.status === 'success') {
        const transactionsList = Array.isArray(response.data)
          ? response.data
          : [];
        return {
          transactions: transactionsList,
          metrics: response.metrics || null
        };
      }
      return { transactions: [], metrics: null };
    } catch (error) {
      console.error('Lỗi khi tải giao dịch từ backend API /api/transactions:', error);
      return { transactions: [], metrics: null };
    }
  }

  /**
   * Nạp tiền tại quầy cho hội viên
   */
  async createTopUp(data) {
    try {
      const response = await apiClient.post('/transactions/topup', data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo giao dịch nạp tiền tại quầy:', error);
      throw error;
    }
  }

  /**
   * Hoàn tiền giao dịch
   */
  async refundTransaction(id, reason) {
    try {
      const response = await apiClient.post(`/transactions/${id}/refund`, { reason });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi hoàn tiền giao dịch:', error);
      throw error;
    }
  }
}

export default new TransactionService();
