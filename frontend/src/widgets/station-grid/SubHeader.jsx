import React from 'react';
import { ArrowUpDown, Zap, Gauge, Grid, LayoutList } from 'lucide-react';

export default function SubHeader({ viewMode, setViewMode }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    THỜI GIAN THỰC
                </div>
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                    Sơ Đồ Trạm Máy Phòng Game (Realtime Station Matrix)
                </h1>
            </div>

            <div className="flex items-center gap-3">
                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/90 text-xs">
                    <button
                        type="button"
                        onClick={() => setViewMode && setViewMode('grid')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                            viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <Grid className="w-4 h-4" />
                        <span className="hidden sm:inline">Bàn Lưới</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode && setViewMode('list')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                            viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <LayoutList className="w-4 h-4" />
                        <span className="hidden sm:inline">Danh Sách</span>
                    </button>
                </div>

                {/* Secondary Action Toolbar with Clean Hierarchy */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-xs transition"
                    >
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                        <span>Sắp xếp</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-xs transition font-bold"
                        title="Bật nguồn tất cả các trạm máy đang sẵn sàng"
                    >
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Bật tất cả</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/90 hover:bg-slate-200/70 transition font-bold"
                    >
                        <Gauge className="w-3.5 h-3.5 text-slate-600" />
                        <span>Bootrom Log</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
