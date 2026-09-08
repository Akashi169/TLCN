const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Route Lấy Dữ Liệu Dashboard Tổng Quan
router.get('/overview', authenticateToken, (req, res) => dashboardController.getOverview(req, res));

module.exports = router;
