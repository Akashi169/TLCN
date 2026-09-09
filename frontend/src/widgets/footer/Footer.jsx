import React from 'react';
import { ShieldCheck, RotateCcw, PlusCircle } from 'lucide-react';

export default function Footer({ metrics, variant = 'default' }) {
    if (variant === 'compact') {
        return (
            <footer className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 text-[11px] text-slate-600 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3 text-xs text-slate-700 font-medium">
                    <span className="inline-flex items-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5" />
                        TLS 1.3 End-to-End
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="hover:text-slate-900 cursor-pointer transition-colors">Hotline 1900 xxxx (24/7)</span>
                </div>
                <div className="text-xs font-mono font-medium text-slate-600">Build v4.8.2-cloud</div>
            </footer>
        );
    }

    const m = metrics || { localCount: 56, cloudCount: 28, readyCount: 28, maintCount: 8 };

    return (
        <footer className="fixed bottom-0 left-[240px] right-0 z-30 px-6 sm:px-8 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-4 shadow-sm">
            {/* Color status legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Tại Quán ({m.localCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <span>Cloud Remote ({m.cloudCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Sẵn Sàng ({m.readyCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>Bảo Trì / Cảnh Báo ({m.maintCount})</span>
                </div>
            </div>

            {/* Shortcuts & Action buttons with crisp 24px right alignment */}
            <div className="flex items-center gap-3">
                <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <span>
                        <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-800 font-mono font-bold text-[10px]">F2</kbd> Nạp giờ
                    </span>
                    <span>•</span>
                    <span>
                        <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-800 font-mono font-bold text-[10px]">ESC</kbd> Đóng
                    </span>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all">
                    <RotateCcw className="w-4 h-4 text-slate-700" />
                    <span>Khởi Động Lại</span>
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs shadow-sky-200 transition-all">
                    <PlusCircle className="w-4 h-4 text-white" />
                    <span>Mở Máy Nhanh</span>
                </button>
            </div>
        </footer>
    );
}
