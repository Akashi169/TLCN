import React, { useState, useEffect } from 'react';
import StationCard from '../components/dashboard/StationCard';
import StationDrawer from '../components/modals/StationDrawer';
import { ZONES } from '../data/mockData';
import authService from '../services/authService';
import {
    LogOut,
    Bell,
    Sliders,
    Search,
    ShieldCheck,
    LayoutGrid,
    UserCheck,
    CreditCard,
    Cpu,
    Gamepad2,
    BarChart3,
    Settings,
    ArrowUpDown,
    Zap,
    Gauge,
    Grid,
    Map,
    Building,
    Monitor,
    PieChart,
    User,
    Cloud,
    Power,
    Wrench,
    Info,
    RotateCcw,
    PlusCircle
} from 'lucide-react';

export default function AdminDashboard({ user, onLogout }) {
    const [filter, setFilter] = useState('all');
    const [selectedStation, setSelectedStation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    const handleLogout = () => {
        authService.logout();
        if (onLogout) onLogout();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedStation(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="bg-[#F8F9FA] font-sans text-slate-800 antialiased selection:bg-sky-100 selection:text-sky-800 min-h-screen">
            {/* TOP HEADER */}
            <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-sky-200">
                            <Gamepad2 className="w-5 h-5 shrink-0" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">NEXUS</span>
                            <span className="font-mono text-[10px] tracking-wider text-slate-400 leading-none mt-1 uppercase font-semibold">Cyber OS Cloud</span>
                        </div>
                    </div>
                    {/* Quick Metrics Ribbon */}
                    <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-200">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60">
                            <span className="font-mono text-[11px] text-slate-500 uppercase font-semibold">Tổng:</span>
                            <span className="font-mono text-xs text-slate-800 font-bold">120 máy</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/70 border border-amber-200/60">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span className="font-mono text-[11px] text-amber-700 font-semibold uppercase">Tại quán:</span>
                            <span className="font-mono text-xs text-amber-900 font-bold">56</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50/80 border border-sky-200/60">
                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                            <span className="font-mono text-[11px] text-sky-700 font-semibold uppercase">Cloud Remote:</span>
                            <span className="font-mono text-xs text-sky-900 font-bold">28</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200/60">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="font-mono text-[11px] text-emerald-700 font-semibold uppercase">Sẵn sàng:</span>
                            <span className="font-mono text-xs text-emerald-900 font-bold">28</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50/70 border border-rose-200/60">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span className="font-mono text-[11px] text-rose-700 font-semibold uppercase">Bảo trì:</span>
                            <span className="font-mono text-xs text-rose-900 font-bold">8</span>
                        </div>
                    </div>
                </div>

                {/* Central Global Search */}
                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative flex items-center">
                        <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                        <input
                            className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                            placeholder="Tìm kiếm máy (ESP-01, VIP-..), hội viên, IP..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Actions & User Profile */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden lg:flex flex-col items-end px-3 py-1 bg-emerald-50/80 border border-emerald-200/60 rounded-lg">
                        <span className="font-mono text-[10px] text-emerald-700 font-semibold tracking-wider uppercase">DOANH THU CA TRỰC</span>
                        <span className="font-mono text-xs text-emerald-800 font-extrabold">14.850.000 đ</span>
                    </div>
                    <button
                        className="relative p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/70 transition-colors"
                        title="Thông báo hệ thống">
                        <Bell className="w-4 h-4 text-slate-600" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                    </button>
                    <button
                        className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/70 transition-colors"
                        title="Cài đặt bố cục">
                        <Sliders className="w-4 h-4 text-slate-600" />
                    </button>
                    <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-300 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                            {user?.full_name ? user.full_name.substring(0, 2).toUpperCase() : 'AD'}
                        </div>
                        <div className="hidden sm:flex flex-col text-left">
                            <span className="text-xs font-bold text-slate-800 leading-tight">{user?.full_name || 'Admin Quốc Huy'}</span>
                            <span className="font-mono text-[10px] text-purple-600 leading-tight font-semibold flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 inline" /> {user?.role || 'ADMIN'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition"
                            title="Đăng xuất"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Thoát</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* LEFT SIDEBAR */}
            <aside className="fixed left-0 top-0 h-full w-[240px] bg-white border-r border-slate-200/80 z-30 flex flex-col pt-16 pb-4">
                <div className="px-5 py-3">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-semibold">ĐIỀU HÀNH & PHÂN KHU</span>
                </div>
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    <a aria-current="page"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sky-50 text-sky-700 font-semibold text-sm border border-sky-200/60 shadow-xs"
                        href="#">
                        <LayoutGrid className="w-5 h-5 text-sky-600 shrink-0" />
                        <span>Sơ Đồ Phòng Máy</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-all"
                        href="#">
                        <UserCheck className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Quản Lý Hội Viên</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-all"
                        href="#">
                        <CreditCard className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Nạp Giờ & Dịch Vụ F&B</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-all"
                        href="#">
                        <Cpu className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Giám Sát Phần Cứng</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-all"
                        href="#">
                        <Gamepad2 className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Kho Game & BootROM</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-all"
                        href="#">
                        <BarChart3 className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Báo Cáo Doanh Thu</span>
                    </a>
                </nav>
                <div className="px-3 pt-3 border-t border-slate-100 space-y-2">
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-all"
                        href="#">
                        <Settings className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Cấu Hình Hệ Thống</span>
                    </a>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="font-mono text-[11px] text-slate-600 font-medium uppercase">BootROM Host</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">ONLINE</span>
                    </div>
                </div>
            </aside>

            {/* MAIN WRAPPER */}
            <div className="pl-[240px]">
                <main className="w-full pt-16 min-h-screen bg-[#F8F9FA] pb-20">
                    {/* SUB-HEADER & KPI OVERVIEW */}
                    <section className="p-6 bg-white border-b border-slate-200/80">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/60">
                                        ORCHESTRATOR CLUSTER
                                    </span>
                                    <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">CAMPUS A - TẦNG 02</span>
                                </div>
                                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sơ Đồ Phòng Máy & Trạm Cloud</h1>
                            </div>
                            {/* View Switcher & Live Ping */}
                            <div className="flex items-center gap-3">
                                <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                                    <span className="flex items-center gap-1 font-mono font-medium">
                                        <ArrowUpDown className="w-4 h-4 text-slate-400" />
                                        <span>4.2G / 8.8G</span>
                                    </span>
                                    <span className="text-slate-300">|</span>
                                    <span className="flex items-center gap-1 font-mono font-medium">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                        <span>0.8ms Switch</span>
                                    </span>
                                    <span className="text-slate-300">|</span>
                                    <span className="flex items-center gap-1 font-mono font-medium">
                                        <Gauge className="w-4 h-4 text-sky-500" />
                                        <span>1.1ms WebRTC</span>
                                    </span>
                                </div>
                                <div className="flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200/60">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'grid' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}>
                                        <Grid className="w-4 h-4 text-sky-600" />
                                        <span>Lưới Ma Trận</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('plan')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'plan' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}>
                                        <Map className="w-4 h-4 text-slate-500" />
                                        <span>Sơ Đồ 2D</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('zone')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'zone' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}>
                                        <Building className="w-4 h-4 text-slate-500" />
                                        <span>Phân Khu</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 6 KPI / Quick Filter Cards (Light Mode Pastel) */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                            {/* Total Stations */}
                            <button onClick={() => setFilter('all')} className={`p-4 text-left rounded-xl border shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow ${filter === 'all' ? 'bg-slate-100 border-slate-400' : 'bg-white border-slate-200/70'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Tổng Máy</span>
                                    <Monitor className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="mt-2 flex items-baseline gap-1.5">
                                    <span className="text-2xl font-extrabold text-slate-800">120</span>
                                    <span className="text-xs text-slate-400 font-medium">máy</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden flex">
                                    <div className="bg-amber-400 h-full" style={{ width: '46.7%' }}></div>
                                    <div className="bg-sky-400 h-full" style={{ width: '23.3%' }}></div>
                                    <div className="bg-emerald-400 h-full" style={{ width: '23.3%' }}></div>
                                    <div className="bg-rose-400 h-full" style={{ width: '6.7%' }}></div>
                                </div>
                            </button>

                            {/* Occupancy Rate */}
                            <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Tỉ Lệ Lấp Đầy</span>
                                    <PieChart className="w-4 h-4 text-sky-600" />
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-sky-600">70.0%</span>
                                    <span className="text-xs font-semibold text-slate-500">84/120</span>
                                </div>
                                <span className="text-[11px] text-slate-400 truncate">Cao điểm ca tối +12%</span>
                            </div>

                            {/* Filter Tab: Local Play (Amber Pastel) */}
                            <button
                                onClick={() => setFilter('local')}
                                className={`text-left p-4 rounded-xl shadow-xs transition-all cursor-pointer group border ${filter === 'local' ? 'ring-2 ring-amber-400 bg-amber-100 border-amber-300' : 'bg-amber-50/50 hover:bg-amber-50 border-amber-200/70'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Tại Quán (Local)</span>
                                    <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
                                        <User className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-amber-800">56</span>
                                    <span className="text-[11px] font-semibold text-amber-600">46.7%</span>
                                </div>
                                <span className="text-[11px] text-amber-700/80 truncate">Khách chơi trực tiếp</span>
                            </button>

                            {/* Filter Tab: Cloud Remote (Sky Pastel) */}
                            <button
                                onClick={() => setFilter('cloud')}
                                className={`text-left p-4 rounded-xl shadow-xs transition-all cursor-pointer group border ${filter === 'cloud' ? 'ring-2 ring-sky-400 bg-sky-100 border-sky-300' : 'bg-sky-50/50 hover:bg-sky-50 border-sky-200/70'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Cloud Remote</span>
                                    <div className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center">
                                        <Cloud className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-sky-800">28</span>
                                    <span className="text-[11px] font-semibold text-sky-600">23.3%</span>
                                </div>
                                <span className="text-[11px] text-sky-700/80 truncate">WebRTC Full GPU</span>
                            </button>

                            {/* Filter Tab: Available / Standby (Emerald Pastel) */}
                            <button
                                onClick={() => setFilter('ready')}
                                className={`text-left p-4 rounded-xl shadow-xs transition-all cursor-pointer group border ${filter === 'ready' ? 'ring-2 ring-emerald-400 bg-emerald-100 border-emerald-300' : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200/70'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Sẵn Sàng</span>
                                    <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                        <Power className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-emerald-800">28</span>
                                    <span className="text-[11px] font-semibold text-emerald-600">Trống</span>
                                </div>
                                <span className="text-[11px] text-emerald-700/80 truncate">Đã dọn sạch session</span>
                            </button>

                            {/* Filter Tab: Maintenance (Rose Pastel) */}
                            <button
                                onClick={() => setFilter('maint')}
                                className={`text-left p-4 rounded-xl shadow-xs transition-all cursor-pointer group border ${filter === 'maint' ? 'ring-2 ring-rose-400 bg-rose-100 border-rose-300' : 'bg-rose-50/50 hover:bg-rose-50 border-rose-200/70'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Bảo Trì / Lỗi</span>
                                    <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center">
                                        <Wrench className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-rose-800">8</span>
                                    <span className="text-[11px] font-semibold text-rose-600">Cần xử lý</span>
                                </div>
                                <span className="text-[11px] text-rose-700/80 truncate">Lỗi Driver / Mạng</span>
                            </button>
                        </div>
                    </section>

                    {/* ZONES & STATION CARDS */}
                    <div className="p-6 space-y-6">
                        {ZONES.map((zone) => (
                            <section key={zone.id} className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs">
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-2.5">
                                        <h2 className="text-sm font-extrabold text-slate-800 tracking-tight">{zone.name}</h2>
                                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] font-semibold">
                                            {zone.totalCount} máy
                                        </span>
                                        <span title={zone.config}>
                                            <Info className="w-4 h-4 text-slate-400 hover:text-sky-600 cursor-help transition-colors" />
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3.5">
                                    {zone.stations
                                        .filter(st => {
                                            const matchesFilter = filter === 'all' || st.type === filter;
                                            const matchesSearch = !searchQuery || 
                                                st.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                st.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                st.game.toLowerCase().includes(searchQuery.toLowerCase());
                                            return matchesFilter && matchesSearch;
                                        })
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

            {/* FIXED FOOTER */}
            <footer className="fixed bottom-0 left-[240px] right-0 z-30 px-6 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span>Tại Quán (56)</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span><span>Cloud Remote (28)</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>Sẵn Sàng (28)</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>Bảo Trì / Cảnh Báo (8)</span></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400">
                        <span><kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700 font-mono font-bold text-[10px]">F2</kbd> Nạp giờ</span>
                        <span>•</span>
                        <span><kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700 font-mono font-bold text-[10px]">ESC</kbd> Đóng</span>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all">
                        <RotateCcw className="w-4 h-4 text-slate-600" />
                        <span>Khởi Động Lại</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs shadow-sky-200 transition-all">
                        <PlusCircle className="w-4 h-4 text-white" />
                        <span>Mở Máy Nhanh</span>
                    </button>
                </div>
            </footer>

            {/* DRAWER MODAL */}
            <StationDrawer
                station={selectedStation}
                isOpen={!!selectedStation}
                onClose={() => setSelectedStation(null)}
            />
        </div>
    );
}
