import { apiClient } from './client';
import { MOCK_MACHINES, MOCK_MACHINE_METRICS } from '../../features/machines/model/mockMachinesData';

class MachineService {
  /**
   * Fetch all machines from backend API (/api/computers or /api/dashboard/overview)
   * Graceful fallback to MOCK_MACHINES if server is loading or offline
   */
  async getMachines() {
    try {
      // 1. Try fetching from /api/computers endpoint
      const response = await apiClient.get('/computers');
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data.map((c) => ({
          id: c.computer_name || `PC-${c.computer_id}`,
          numericId: String(c.computer_id).padStart(2, '0'),
          ip: `192.168.1.${100 + c.computer_id}`,
          port: `Port #${c.computer_id}`,
          zoneId: `zone-${c.zone_id || 1}`,
          zoneName: c.ComputerZone?.zone_name || 'Zone 1: Esports Arena',
          zoneIcon: c.zone_id === 2 ? 'hotel_class' : c.zone_id === 4 ? 'videocam' : c.zone_id === 5 ? 'cloud_sync' : 'military_tech',
          cpu: c.zone_id === 1 || c.zone_id === 4 ? 'i9-14900K' : 'i7-14700KF',
          gpu: c.zone_id === 4 || c.zone_id === 5 ? 'RTX 4090 24GB' : 'RTX 4070 Ti Super 16GB',
          ram: '32GB DDR5',
          bootImage: 'Win11-Pro-Cyber-v25.02',
          userName: c.RentalSessions && c.RentalSessions[0]?.Member?.userInfo?.full_name ? c.RentalSessions[0].Member.userInfo.full_name : null,
          userRank: c.zone_id === 2 ? 'VIP Gold' : null,
          userInitials: c.RentalSessions && c.RentalSessions[0]?.Member?.userInfo?.full_name ? c.RentalSessions[0].Member.userInfo.full_name.split(' ').map(n=>n[0]).join('').slice(0,2) : null,
          currentGame: c.status === 'IN_USE' ? 'Valorant Ranked' : null,
          cleanStatus: c.status === 'ONLINE' ? 'Sẵn sàng nạp khách' : c.status === 'MAINTENANCE' ? 'Đang kiểm tra phần cứng' : 'Tắt nguồn',
          status: c.status === 'ONLINE' ? 'online' : c.status === 'IN_USE' ? 'in-use' : c.status === 'MAINTENANCE' ? 'maintenance' : 'offline',
          statusLabel: c.status === 'ONLINE' ? 'Online (Sẵn sàng)' : c.status === 'IN_USE' ? 'Đang sử dụng' : c.status === 'MAINTENANCE' ? 'Bảo trì' : 'Offline'
        }));
      }
      return MOCK_MACHINES;
    } catch (error) {
      console.warn('Không thể kết nối API /api/computers, sử dụng dữ liệu mẫu:', error.message);
      return MOCK_MACHINES;
    }
  }

  async getMachineMetrics() {
    return MOCK_MACHINE_METRICS;
  }
}

export default new MachineService();
