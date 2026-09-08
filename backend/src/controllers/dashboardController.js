const dashboardService = require('../services/dashboardService');

class DashboardController {
    /**
     * GET /api/dashboard/overview
     */
    async getOverview(req, res) {
        try {
            const data = await dashboardService.getOverviewData();
            return res.status(200).json({
                status: 'success',
                data,
                message: 'Lấy dữ liệu Dashboard thành công.'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                data: null,
                message: error.message || 'Lỗi khi lấy dữ liệu Dashboard.'
            });
        }
    }
}

module.exports = new DashboardController();
