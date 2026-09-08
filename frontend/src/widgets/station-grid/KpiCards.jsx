import React from 'react';
import { Monitor, User, Cloud, Power, Wrench, DollarSign } from 'lucide-react';

export default function KpiCards({ metrics, filter, setFilter }) {
    const m = metrics || {
        totalStations: 120,
        occupancyRate: '70.0',
        localCount: 56,
        cloudCount: 28,
        readyCount: 28,
        maintCount: 8,
        shiftRevenue: 14850000
    };

    const cards = [
        {
            id: 'all',
            title: 'TỔNG TRẠM MÁY',
            value: m.totalStations,
            sub: `Công suất: ${m.occupancyRate}%`,
            icon: Monitor,
            border: filter === 'all' ? 'border-slate-800 ring-2 ring-slate-800/20' : 'border-slate-200/90',
            bg: 'bg-slate-50/70',
            iconBg: 'bg-slate-900 text-white'
        },
        {
            id: 'local',
            title: 'TẠI QUÁN (LOCAL)',
            value: m.localCount,
            sub: 'Khách ngồi trực tiếp',
            icon: User,
            border: filter === 'local' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-amber-200/90',
            bg: 'bg-amber-50/50',
            iconBg: 'bg-amber-500 text-white'
        },
        {
            id: 'cloud',
            title: 'CLOUD REMOTE',
            value: m.cloudCount,
            sub: 'Stream kết nối xa',
            icon: Cloud,
            border: filter === 'cloud' ? 'border-sky-500 ring-2 ring-sky-500/20' : 'border-sky-200/90',
            bg: 'bg-sky-50/50',
            iconBg: 'bg-sky-500 text-white'
        },
        {
            id: 'ready',
            title: 'SẴN SÀNG (READY)',
            value: m.readyCount,
            sub: 'Máy trống chờ kết nối',
            icon: Power,
            border: filter === 'ready' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-emerald-200/90',
            bg: 'bg-emerald-50/50',
            iconBg: 'bg-emerald-500 text-white'
        },
        {
            id: 'maint',
            title: 'BẢO TRÌ (MAINT)',
            value: m.maintCount,
            sub: 'Đang sửa / Cập nhật',
            icon: Wrench,
            border: filter === 'maint' ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-rose-200/90',
            bg: 'bg-rose-50/50',
            iconBg: 'bg-rose-500 text-white'
        },
        {
            id: 'revenue',
            title: 'DOANH THU CA',
            value: `${m.shiftRevenue ? m.shiftRevenue.toLocaleString() : '14.850.000'} đ`,
            sub: 'Cập nhật thu ngân',
            icon: DollarSign,
            border: 'border-indigo-200/90',
            bg: 'bg-indigo-50/50',
            iconBg: 'bg-indigo-600 text-white'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {cards.map(card => {
                const IconComp = card.icon;

                return (
                    <div
                        key={card.id}
                        onClick={() => setFilter && setFilter(card.id)}
                        className={`cursor-pointer rounded-2xl p-4 border ${card.border} ${card.bg} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">
                                {card.title}
                            </span>
                            <div className={`w-7 h-7 rounded-xl ${card.iconBg} flex items-center justify-center shadow-xs`}>
                                <IconComp className="w-4 h-4 shrink-0" />
                            </div>
                        </div>

                        <div className="mt-3 mb-1">
                            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-mono">
                                {card.value}
                            </span>
                        </div>

                        <p className="text-[11px] text-slate-700 font-semibold truncate">
                            {card.sub}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
