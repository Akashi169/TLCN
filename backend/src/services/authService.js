const db = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

class AuthService {
    /**
     * Xử lý nghiệp vụ Đăng Nhập & Tạo Bearer Token
     */
    async login({ username, password }) {
        if (!username || !password) {
            throw new Error('Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.');
        }

        // Tìm user theo username
        const user = await db.User.findOne({
            where: { username },
            include: [{
                model: db.Member,
                as: 'memberProfile',
                include: [{ model: db.MembershipRank }]
            }]
        });

        if (!user) {
            throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác.');
        }

        // Kiểm tra mật khẩu (hỗ trợ cả bcrypt hash và tự động mã hóa lại nếu DB chứa plain-text cũ)
        let isPasswordValid = false;
        if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
            isPasswordValid = bcrypt.compareSync(password, user.password);
        } else {
            isPasswordValid = (user.password === password);
            if (isPasswordValid) {
                // Tự động nâng cấp mã hóa bcrypt cho tài khoản cũ trong DB
                user.password = bcrypt.hashSync(password, 10);
                await user.save();
            }
        }

        if (!isPasswordValid) {
            throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác.');
        }

        // Payload cho JWT
        const tokenPayload = {
            user_id: user.user_id,
            username: user.username,
            role: user.role,
        };

        // Tạo JWT Token
        const token = generateToken(tokenPayload);

        // Sanitize thông tin user trả về frontend
        const userData = {
            user_id: user.user_id,
            username: user.username,
            full_name: user.full_name,
            role: user.role,
            memberProfile: user.memberProfile || null
        };

        return {
            token,
            tokenType: 'Bearer',
            user: userData
        };
    }

    /**
     * Lấy thông tin tài khoản hiện tại từ userId trong Token
     */
    async getUserProfile(userId) {
        const user = await db.User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [{
                model: db.Member,
                as: 'memberProfile',
                include: [{ model: db.MembershipRank }]
            }]
        });

        if (!user) {
            throw new Error('Không tìm thấy thông tin người dùng.');
        }

        return user;
    }
}

module.exports = new AuthService();
