import { apiClient } from './client';
import { MOCK_MEMBERS, MOCK_MEMBER_METRICS } from '../../features/members/model/mockMembersData';

class MemberService {
  /**
   * Fetch member list from backend API (/api/members)
   * Fallback to mock data if API call fails
   */
  async getMembers() {
    try {
      const response = await apiClient.get('/members');
      if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
        return response.data.data.map((m) => {
          const rankName = m.rank_name || 'Đồng';
          const tier = rankName.includes('Kim Cương')
            ? 'diamond'
            : rankName.includes('Vàng')
            ? 'gold'
            : rankName.includes('Bạc')
            ? 'silver'
            : 'normal';

          return {
            id: m.id,
            uid: m.uid || `#MB-${String(m.id).padStart(3, '0')}`,
            name: m.full_name || 'Hội Viên',
            username: m.username || 'user',
            phone: m.phone || 'Chưa cập nhật',
            email: m.email || 'Chưa cập nhật',
            tier,
            rankName,
            status: m.status || 'ACTIVE',
            realBalance: Number(m.real_balance || 0),
            bonusBalance: Number(m.bonus_balance || 0),
            totalBalance: Number(m.real_balance || 0) + Number(m.bonus_balance || 0),
            pts: Number(m.points || 0),
            station: m.station_name ? `Máy ${m.station_name}` : 'Chưa vào máy',
            stationCode: m.station_name || null,
            stationStatus: m.station_status || null,
            lastLoginTime: m.last_login
              ? new Date(m.last_login).toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Chưa đăng nhập'
          };
        });
      }
      return MOCK_MEMBERS;
    } catch (error) {
      console.warn('Không thể tải từ backend API /api/members, đang sử dụng mock data:', error.message);
      return MOCK_MEMBERS;
    }
  }

  /**
   * Chỉnh sửa thông tin hồ sơ cơ bản (Họ tên, SĐT, Email)
   */
  async updateMemberInfo(memberId, data) {
    try {
      const response = await apiClient.put(`/members/${memberId}/info`, data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin hội viên:', error);
      throw error;
    }
  }

  /**
   * Đổi trạng thái tài khoản (ACTIVE, LOCKED, SUSPENDED)
   */
  async updateAccountStatus(memberId, status) {
    try {
      const response = await apiClient.put(`/members/${memberId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi đổi trạng thái tài khoản hội viên:', error);
      throw error;
    }
  }

  async getMemberMetrics() {
    return MOCK_MEMBER_METRICS;
  }
}

export default new MemberService();
