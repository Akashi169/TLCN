import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import StationCard from '../components/dashboard/StationCard';
import StationDrawer from '../components/modals/StationDrawer';
import { ZONES, STATION_TYPES } from '../data/mockData';

export default function Dashboard() {
    const [filter, setFilter] = useState('all');
    const [selectedStation, setSelectedStation] = useState(null);

    // Lắng nghe sự kiện bàn phím
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedStation(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="bg-[#F8F9FA] font-sans text-slate-800 min-h-screen">
            <Header />
            <Sidebar />

            <div className="pl-[240px]">
                <main className="w-full pt-16 pb-20">

                    {/* HEADER SECTION CỦA DASHBOARD */}
                    <section className="p-6 bg-white border-b border-slate-200/80">
                        <div className="mb-6">
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sơ Đồ Phòng Máy & Trạm Cloud</h1>
                        </div>

                        {/* KPI & FILTER BUTTONS */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                            <button onClick={() => setFilter('all')} className={`p-4 text-left rounded-xl border shadow-xs transition-all ${filter === 'all' ? 'bg-slate-100 border-slate-400' : 'bg-white border-slate-200'}`}>
                                <span className="text-[11px] font-bold uppercase text-slate-600">Tất Cả Máy</span>
                                <div className="mt-2 text-2xl font-extrabold text-slate-800">120</div>
                            </button>

                            {/* Map 4 nút filter từ STATION_TYPES */}
                            {Object.values(STATION_TYPES).map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setFilter(type.id)}
                                    className={`p-4 text-left rounded-xl border shadow-xs transition-all ${type.bg} ${filter === type.id ? 'ring-2 ring-offset-1 ring-' + type.color + '-400' : type.border}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[11px] font-bold uppercase ${type.text}`}>{type.label}</span>
                                        <span className={`material-symbols-outlined text-[15px] ${type.text}`}>{type.icon}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* RENDERING CÁC PHÂN KHU (ZONES) */}
                    <div className="p-6 space-y-6">
                        {ZONES.map((zone) => (
                            <section key={zone.id} className={`bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs col-span-${zone.colSpan}`}>
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-2.5">
                                        <h2 className="text-sm font-extrabold text-slate-800">{zone.name}</h2>
                                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] font-semibold">{zone.totalCount} máy</span>
                                        <span className="material-symbols-outlined text-[18px] text-slate-400 cursor-help" title={zone.config}>info</span>
                                    </div>
                                </div>

                                {/* Lưới chứa các máy tính trong Zone */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3.5">
                                    {zone.stations
                                        .filter(station => filter === 'all' || station.type === filter)
                                        .map(station => (
                                            <StationCard
                                                key={station.id}
                                                station={station}
                                                onClick={(st) => setSelectedStation(st)}
                                            />
                                        ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </main>
            </div>

            <Footer />

            {/* DRAWER MODAL */}
            <StationDrawer
                station={selectedStation}
                isOpen={!!selectedStation}
                onClose={() => setSelectedStation(null)}
            />
        </div>
    );
}