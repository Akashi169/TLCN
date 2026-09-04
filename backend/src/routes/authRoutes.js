const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Route Đăng Nhập
router.post('/login', (req, res) => authController.login(req, res));

// Route Lấy Thông Tin Người Dùng Hiện Tại (Bảo vệ bằng Bearer Token)
router.get('/me', authenticateToken, (req, res) => authController.getMe(req, res));

module.exports = router;
