import React from 'react';
import { Search, Bell, Sliders, Gamepad2, ShieldCheck, LogOut, Home } from 'lucide-react';

export default function Header({ user, searchQuery, setSearchQuery, metrics, onLogout, variant = 'full' }) {
    if (variant === 'simple') {
        return (
            <header className="flex items-center justify-between pb-4">
                <a className="flex items-center space-x-3 group" href="#" title="NEXUS Cyber Command Home">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-sky-400 flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
                        <Gamepad2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-1.5">
                            <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-brand-700">NEXUS</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-200/70 uppercase tracking-widest">CLOUD</span>
                        </div>
                        <p className="text-[10px] tracking-widest text-slate-600 font-semibold uppercase">Cyber OS & Cloud Gaming</p>
                    </div>
                </a>

                <div className="flex items-center space-x-3 text-xs">
                    <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="font-semibold text-xs text-slate-800">VIE / VNĐ</span>
                    </div>
                    <a className="inline-flex items-center text-slate-700 hover:text-brand-600 font-medium transition-colors" href="#">
                        <span>Trở về trang chủ</span>
                        <Home className="w-3.5 h-3.5 ml-1" />
                    </a>
                </div>
            </header>
        );
    }

    const m = metrics || { totalStations: 120, localCount: 56, cloudCount: 28, readyCount: 28, maintCount: 8, shiftRevenue: 14850000 };

    return (
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
                        <span className="font-mono text-xs text-slate-800 font-bold">{m.totalStations} máy</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/70 border border-amber-200/60">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="font-mono text-[11px] text-amber-700 font-semibold uppercase">Tại quán:</span>
                        <span className="font-mono text-xs text-amber-900 font-bold">{m.localCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50/80 border border-sky-200/60">
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                        <span className="font-mono text-[11px] text-sky-700 font-semibold uppercase">Cloud Remote:</span>
                        <span className="font-mono text-xs text-sky-900 font-bold">{m.cloudCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200/60">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-mono text-[11px] text-emerald-700 font-semibold uppercase">Sẵn sàng:</span>
                        <span className="font-mono text-xs text-emerald-900 font-bold">{m.readyCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50/70 border border-rose-200/60">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span className="font-mono text-[11px] text-rose-700 font-semibold uppercase">Bảo trì:</span>
                        <span className="font-mono text-xs text-rose-900 font-bold">{m.maintCount}</span>
                    </div>
                </div>
            </div>

            {/* Central Global Search */}
            {setSearchQuery && (
                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative flex items-center">
                        <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                        <input
                            className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                            placeholder="Tìm kiếm máy (ESP-01, VIP-..), hội viên, IP..."
                            type="text"
                            value={searchQuery || ''}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Actions & User Profile */}
            <div className="flex items-center gap-3 flex-shrink-0">
                {m.shiftRevenue !== undefined && (
                    <div className="hidden lg:flex flex-col items-end px-3 py-1 bg-emerald-50/80 border border-emerald-200/60 rounded-lg">
                        <span className="font-mono text-[10px] text-emerald-700 font-semibold tracking-wider uppercase">DOANH THU CA TRỰC</span>
                        <span className="font-mono text-xs text-emerald-800 font-extrabold">{m.shiftRevenue ? m.shiftRevenue.toLocaleString() : '14.850.000'} đ</span>
                    </div>
                )}
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
                        <span className="text-xs font-bold text-slate-800 leading-tight">{user?.full_name || 'Quản Trị Viên'}</span>
                        <span className="font-mono text-[10px] text-purple-600 leading-tight font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 inline" /> {user?.role || 'ADMIN'}
                        </span>
                    </div>
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition"
                            title="Đăng xuất"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Thoát</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
