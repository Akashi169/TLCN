import { apiClient } from './client';
import { mapComputerToMachineDTO } from '../adapters/machineAdapter';

/**
 * MachineService
 * Enforces Single Responsibility Principle (SRP): Dedicated purely to API HTTP communication with CSDL backend.
 * Data transformation is delegated to machineAdapter.js.
 */
class MachineService {
  /**
   * Fetch full Room Layout Grid from backend API (/api/computers/grid)
   */
  async getRoomLayoutGrid() {
    try {
      const response = await apiClient.get('/computers/grid');
      if (response && response.status === 'success' && response.data) {
        return response.data;
      }
    } catch (error) {
      console.warn('⚡ Không thể kết nối API /api/computers/grid:', error.message);
    }
    return null;
  }

  /**
   * Remote control machine status (ONLINE, OFFLINE, LOCKED, MAINTENANCE)
   */
  async changeStatus(computerId, status, memberId = null, notes = null) {
    const response = await apiClient.patch(`/computers/${computerId}/status`, {
      status,
      member_id: memberId,
      notes
    });
    return response.data;
  }

  /**
   * Switch session from one computer to another
   */
  async switchStation(fromComputerId, targetComputerId, memberId = null) {
    const response = await apiClient.post(`/computers/${fromComputerId}/switch`, {
      target_computer_id: targetComputerId,
      member_id: memberId
    });
    return response.data;
  }

  /**
   * Wake-on-LAN (WOL) - Batch power on all offline machines
   */
  async wakeOnLan(zoneId = null) {
    const response = await apiClient.post('/computers/wake-on-lan', { zone_id: zoneId });
    return response;
  }

  /**
   * Fetch technical Bootrom LAN PXE boot logs
   */
  async getBootromLogs(computerId = null) {
    const endpoint = computerId ? `/computers/bootrom-logs?computer_id=${computerId}` : '/computers/bootrom-logs';
    const response = await apiClient.get(endpoint);
    return response.data;
  }

  /**
   * Fetch all machines from backend API (/api/computers)
   * Reads 100% live data populated from CSDL Seeder without hardcoded mock fallbacks
   */
  async getMachines() {
    try {
      const response = await apiClient.get('/computers');
      const rawData = response?.data?.data;
      if (Array.isArray(rawData) && rawData.length > 0) {
        return rawData.map(mapComputerToMachineDTO);
      }
    } catch (error) {
      console.warn('Lỗi khi lấy danh sách trạm máy từ CSDL:', error.message);
    }
    return [];
  }
}

export default new MachineService();
