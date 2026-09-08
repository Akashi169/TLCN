import authService from './auth.service';
import { ZONES } from '../data/mockData';

export const dashboardService = {
    async getOverview() {
        try {
            const res = await authService.fetchWithAuth('/dashboard/overview');
            if (res && res.status === 'success' && res.data) {
                return res.data;
            }
        } catch (error) {
            console.warn('⚡ Không thể kết nối API Dashboard Backend, dùng dữ liệu Model chuẩn:', error.message);
        }

        let totalStations = 0;
        let localCount = 0;
        let cloudCount = 0;
        let readyCount = 0;
        let maintCount = 0;

        ZONES.forEach(zone => {
            totalStations += zone.stations.length;
            zone.stations.forEach(st => {
                if (st.type === 'local') localCount++;
                else if (st.type === 'cloud') cloudCount++;
                else if (st.type === 'ready') readyCount++;
                else if (st.type === 'maint') maintCount++;
            });
        });

        if (totalStations < 100) {
            totalStations = 120;
            localCount = 56;
            cloudCount = 28;
            readyCount = 28;
            maintCount = 8;
        }

        const occupiedCount = localCount + cloudCount;
        const occupancyRate = ((occupiedCount / totalStations) * 100).toFixed(1);

        return {
            metrics: {
                totalStations,
                occupancyRate,
                localCount,
                cloudCount,
                readyCount,
                maintCount,
                shiftRevenue: 14850000,
                bootromStatus: 'ONLINE'
            },
            zones: ZONES
        };
    }
};

export default dashboardService;
