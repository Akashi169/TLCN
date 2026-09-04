const API_URL = 'http://localhost:3001/api';

/**
 * Service xử lý Đăng nhập & Lưu trữ Bearer Token (JWT) ở Client
 */
export const authService = {
    /**
     * Gửi yêu cầu đăng nhập lên Server
     * @param {string} identity Username hoặc số điện thoại 
     * @param {string} password Mật khẩu
     */
    async login(identity, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identity, password }),
        });

        const data = await response.json();

        if (!response.ok || data.status === 'error') {
            throw new Error(data.message || 'Đăng nhập không thành công.');
        }

        // Lưu JWT Token và User Info vào localStorage khi thành công
        if (data.data && data.data.token) {
            localStorage.setItem('nexus_token', data.data.token);
            localStorage.setItem('nexus_user', JSON.stringify(data.data.user));
        }

        return data.data;
    },

    /**
     * Đăng xuất hệ thống
     */
    logout() {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
    },

    /**
     * Lấy token hiện tại
     */
    getToken() {
        return localStorage.getItem('nexus_token');
    },

    /**
     * Lấy user hiện tại từ bộ nhớ
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('nexus_user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    /**
     * Helper gửi request kèm chuỗi Bearer Token
     */
    async fetchWithAuth(url, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(url.startsWith('http') ? url : `${API_URL}${url}`, {
            ...options,
            headers,
        });

        if (response.status === 401 || response.status === 403) {
            // Token hết hạn hoặc không hợp lệ -> logout
            this.logout();
            window.location.href = '/login';
            throw new Error('Phiên đăng nhập đã hết hạn.');
        }

        return response.json();
    }
};

export default authService;
