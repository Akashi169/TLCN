import { apiClient } from './client';
import { MOCK_MEMBERS, MOCK_MEMBER_METRICS } from '../../features/members/model/mockMembersData';

class MemberService {
  /**
   * Fetch member list from backend API (/api/members)
   * Fallback to mock data if API call fails or backend is not responding
   */
  async getMembers() {
    try {
      const response = await apiClient.get('/members');
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        // Map backend member data to UI format
        return response.data.data.map((m, idx) => ({
          id: m.member_id || idx + 1,
          uid: `UID-${String(m.member_id).padStart(5, '0')}`,
          name: m.userInfo?.full_name || 'Hội Viên',
          username: m.userInfo?.username || 'user',
          email: `${m.userInfo?.username || 'member'}@cyber.vn`,
          phone: '0912.xxx.xxx',
          avatar: '',
          tier: m.rank_id === 4 ? 'diamond' : m.rank_id === 3 ? 'gold' : 'normal',
          badge: m.rank_id === 4 ? 'streamer' : m.rank_id === 3 ? 'verified' : null,
          balance: Number(m.real_balance || 0),
          balanceNote: `~ ${(Number(m.real_balance || 0) / 20000).toFixed(1)} giờ chơi`,
          pts: Math.floor(Number(m.real_balance || 0) / 1000),
          status: 'offline',
          station: 'Máy trống',
          stationCode: null,
          stationDetail: null,
          lastLoginTime: 'Hôm nay',
          lastLoginDetail: 'Mới cập nhật',
          ipAddress: '192.168.1.10'
        }));
      }
      return MOCK_MEMBERS;
    } catch (error) {
      console.warn('Không thể tải từ backend API /api/members, đang sử dụng mock data:', error.message);
      return MOCK_MEMBERS;
    }
  }

  async getMemberMetrics() {
    return MOCK_MEMBER_METRICS;
  }
}

export default new MemberService();
