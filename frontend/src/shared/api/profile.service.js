import { apiClient } from './client';

class ProfileService {
  /**
   * Fetch customer profile details
   */
  async getProfile(memberId) {
    try {
      const endpoint = memberId ? `/profile/${memberId}` : '/profile/me';
      const response = await apiClient.get(endpoint);
      if (response && response.status === 'success') {
        return response.data;
      }
      if (response && (response.member_id || response.user_id)) {
        return response;
      }
      throw new Error(response?.message || 'Lỗi khi tải dữ liệu hồ sơ từ hệ thống');
    } catch (error) {
      console.error('Lỗi khi gọi API profile:', error.response?.data?.message || error.message);
      const apiError = error.response?.data?.message || error.message || 'Lỗi kết nối máy chủ';
      throw new Error(apiError);
    }
  }

  /**
   * Update basic profile info (phone, etc.)
   */
  async updateProfile(memberId, profileData) {
    if (!memberId) throw new Error('Thiếu mã thành viên khi cập nhật hồ sơ cá nhân');
    try {
      const response = await apiClient.put(`/profile/${memberId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ cá nhân:', error);
      const apiError = error.response?.data?.message || error.message || 'Lỗi khi cập nhật hồ sơ';
      throw new Error(apiError);
    }
  }


  /**
   * Update avatar image URL
   */
  async updateAvatar(memberId, avatarUrl) {
    if (!memberId) throw new Error('Thiếu mã thành viên khi cập nhật ảnh đại diện');
    try {
      const response = await apiClient.post(`/profile/${memberId}/avatar`, { avatar_url: avatarUrl });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật ảnh đại diện:', error);
      const apiError = error.response?.data?.message || error.message || 'Lỗi khi cập nhật ảnh đại diện';
      throw new Error(apiError);
    }
  }
}

export default new ProfileService();

