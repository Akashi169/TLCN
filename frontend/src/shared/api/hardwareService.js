import { apiClient } from './client';
import {
  MOCK_HARDWARE_SPECS,
  MOCK_HARDWARE_METRICS,
  MOCK_HARDWARE_DIAGNOSTICS
} from '../../features/hardware-config/model/mockHardwareData';

class HardwareService {
  /**
   * Fetch hardware specs & telemetry from backend /api/computers/specs
   * Graceful fallback to mock data if backend server is starting
   */
  async getHardwareSpecs() {
    try {
      const response = await apiClient.get('/computers/specs');
      if (response.data && response.data.status === 'success' && response.data.data) {
        return response.data.data;
      }
      return {
        specs: MOCK_HARDWARE_SPECS,
        metrics: MOCK_HARDWARE_METRICS,
        diagnostics: MOCK_HARDWARE_DIAGNOSTICS
      };
    } catch (error) {
      console.warn('⚠️ Không thể tải /api/computers/specs, sử dụng dữ liệu seeder mặc định:', error.message);
      return {
        specs: MOCK_HARDWARE_SPECS,
        metrics: MOCK_HARDWARE_METRICS,
        diagnostics: MOCK_HARDWARE_DIAGNOSTICS
      };
    }
  }

  /**
   * Create new hardware station spec via POST /api/computers/specs
   */
  async createHardwareSpec(data) {
    try {
      const response = await apiClient.post('/computers/specs', data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo cấu hình phần cứng mới:', error);
      throw error;
    }
  }
}

export default new HardwareService();
