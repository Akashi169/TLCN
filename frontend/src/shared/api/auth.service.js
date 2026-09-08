import apiClient from './client';

export const authService = {
  async login(identity, password) {
    const res = await apiClient.post('/auth/login', { identity, password });
    if (res.data && res.data.token) {
      apiClient.setToken(res.data.token);
      apiClient.setCurrentUser(res.data.user);
    }
    return res.data;
  },

  async getMe() {
    const res = await apiClient.get('/auth/me');
    if (res.data && res.data.user) {
      apiClient.setCurrentUser(res.data.user);
    }
    return res.data?.user;
  },

  logout() {
    apiClient.clearAuth();
  },

  getToken() {
    return apiClient.getToken();
  },

  getCurrentUser() {
    return apiClient.getCurrentUser();
  },
};

export default authService;
