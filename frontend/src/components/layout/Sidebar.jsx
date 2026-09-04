import React from 'react';

const MENU_ITEMS = [
    { icon: 'grid_view', label: 'Sơ Đồ Phòng Máy', active: true },
    { icon: 'badge', label: 'Quản Lý Hội Viên' },
    { icon: 'point_of_sale', label: 'Nạp Giờ & Dịch Vụ F&B' },
    { icon: 'memory', label: 'Giám Sát Phần Cứng' },
    { icon: 'stadia_controller', label: 'Kho Game & BootROM' },
    { icon: 'monitoring', label: 'Báo Cáo Doanh Thu' },
];

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-full w-[240px] bg-white border-r border-slate-200/80 z-30 flex flex-col pt-16 pb-4">
            <div className="px-5 py-3">
                <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-semibold">ĐIỀU HÀNH & PHÂN KHU</span>
            </div>
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {MENU_ITEMS.map((item, index) => (
                    <a key={index} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${item.active ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-200/60 shadow-xs' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
                        <span className={`material-symbols-outlined text-[20px] ${item.active ? 'text-sky-600' : 'text-slate-400'}`}>{item.icon}</span>
                        {item.label}
                    </a>
                ))}
            </nav>
            <div className="px-3 pt-3 border-t border-slate-100 space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-mono text-[11px] text-slate-600 font-medium uppercase">BootROM Host</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">ONLINE</span>
                </div>
            </div>
        </aside>
    );
}