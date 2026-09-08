import React, { useState, useEffect } from 'react';
import Header from '../../widgets/header/Header';
import Sidebar from '../../widgets/sidebar/Sidebar';
import Footer from '../../widgets/footer/Footer';
import SubHeader from '../../widgets/station-grid/SubHeader';
import KpiCards from '../../widgets/station-grid/KpiCards';
import ZoneSection from '../../widgets/station-grid/ZoneSection';
import StationDrawer from '../../features/station-drawer/ui/StationDrawer';
import dashboardService from '../../shared/api/dashboard.service';

export default function AdminDashboardPage({ user, onLogout }) {
    const [filter, setFilter] = useState('all');
    const [selectedStation, setSelectedStation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [overviewData, setOverviewData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            const data = await dashboardService.getOverview();
            setOverviewData(data);
            setLoading(false);
        };

        loadDashboardData();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedStation(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const metrics = overviewData?.metrics;
    const zones = overviewData?.zones || [];

    return (
        <div className="bg-[#F8F9FA] font-sans text-slate-800 antialiased min-h-screen">
            {/* TOP UNIFIED HEADER */}
            <Header
                user={user}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                metrics={metrics}
                onLogout={onLogout}
            />

            {/* LEFT UNIFIED SIDEBAR */}
            <Sidebar bootromStatus={metrics?.bootromStatus || 'ONLINE'} role="ADMIN" />

            {/* MAIN CONTENT WRAPPER */}
            <div className="pl-[240px]">
                <main className="w-full pt-16 min-h-screen bg-[#F8F9FA] pb-20">
                    <section className="p-6 bg-white border-b border-slate-200/80">
                        <SubHeader
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                        />

                        <KpiCards
                            metrics={metrics}
                            filter={filter}
                            setFilter={setFilter}
                        />
                    </section>

                    <div className="p-6 space-y-6">
                        {loading ? (
                            <div className="p-12 text-center text-slate-400 font-mono text-xs">
                                ⏳ Đang tải dữ liệu trạm máy từ CSDL Sequelize...
                            </div>
                        ) : (
                            zones.map((zone) => (
                                <ZoneSection
                                    key={zone.id || zone.zone_id}
                                    zone={zone}
                                    filter={filter}
                                    searchQuery={searchQuery}
                                    onSelectStation={(st) => setSelectedStation(st)}
                                />
                            ))
                        )}
                    </div>
                </main>
            </div>

            {/* FIXED UNIFIED FOOTER */}
            <Footer metrics={metrics} />

            {/* FEATURE DRAWER */}
            <StationDrawer
                station={selectedStation}
                isOpen={!!selectedStation}
                onClose={() => setSelectedStation(null)}
            />
        </div>
    );
}
