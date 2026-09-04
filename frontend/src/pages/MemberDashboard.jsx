import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import StationCard from '../components/dashboard/StationCard';
import StationDrawer from '../components/modals/StationDrawer';
import { ZONES, STATION_TYPES } from '../data/mockData';
import authService from '../services/authService';
import { LogOut, User, Wallet, Award, Gamepad2 } from 'lucide-react';

export default function MemberDashboard({ user, onLogout }) {
    const [filter, setFilter] = useState('all');
    const [selectedStation, setSelectedStation] = useState(null);

    const memberInfo = user?.memberProfile || {};

    const handleLogout = () => {
        authService.logout();
        if (onLogout) onLogout();
    };

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
            {/* Top Bar for Member Navigation */}
            <div className="bg-slate-900 text-white border-b border-slate-800 px-6 py-2.5 flex items-center justify-between sticky top-0 z-40 text-xs">
                <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 text-[10px]">
                        ROLE: MEMBER
                    </span>
                    <span className="font-extrabold text-slate-200">PORTAL HỘI VIÊN NEXUS</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tài khoản chính: <strong className="text-emerald-400 font-mono">{parseFloat(memberInfo.real_balance || 500000).toLocaleString()}đ</strong></span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Hạng: <strong className="text-amber-300 font-bold">{memberInfo.MembershipRank?.name || 'Vàng'}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-bold">{user?.full_name || 'Khách Hàng VIP'}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold transition"
                    >
                        <LogOut className="w-3 h-3" />
                        <span>Thoát</span>
                    </button>
                </div>
            </div>

            <Header />
            <Sidebar />

            <div className="pl-[240px]">
                <main className="w-full pt-16 pb-20">

                    {/* HEADER SECTION CỦA DASHBOARD */}
                    <section className="p-6 bg-white border-b border-slate-200/80">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                                    <Gamepad2 className="w-6 h-6 text-brand-600" />
                                    Sơ Đồ Phòng Máy & Trạm Cloud Gaming
                                </h1>
                                <p className="text-xs text-slate-500 mt-1">
                                    Chọn trạm máy trống để kích hoạt phiên chơi Cloud độ trễ siêu thấp 1.1ms
                                </p>
                            </div>
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
                            <section key={zone.id} className={`bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs col-span-${zone.colSpan || 1}`}>
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
