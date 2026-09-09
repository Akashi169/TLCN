import React from 'react';
import { User, Cloud, Power, Wrench, Clock, Thermometer, Wifi } from 'lucide-react';
import { STATION_TYPES } from '../../../shared/data/mockData';

const typeIconMap = {
    local: User,
    cloud: Cloud,
    ready: Power,
    maint: Wrench
};

export default function StationCard({ station, onClick }) {
    if (!station) return null;

    const typeDef = STATION_TYPES[station.type] || {
        label: 'Sẵn sàng',
        color: 'emerald',
        bg: 'bg-emerald-100',
        text: 'text-emerald-950',
        border: 'border-emerald-300'
    };
    
    const IconComponent = typeIconMap[station.type] || Power;
    const isVacant = station.type === 'ready' || station.type === 'maint' || !station.user;
    const tooltipText = `Máy ${station.id} • ${
        station.user
            ? `Tài khoản: ${station.user} (${station.game || 'Game'})`
            : station.type === 'maint'
            ? 'Đang kiểm tra bảo trì'
            : 'Sẵn sàng phục vụ khách'
    }`;

    return (
        <div
            onClick={() => onClick && onClick(station)}
            title={tooltipText}
            className="cursor-pointer group rounded-xl p-3 bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-500 transition-all duration-200 flex flex-col justify-between aspect-square"
        >
            {/* Top Header: ID & Type Icon */}
            <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-slate-900" title={`Mã số máy: ${station.id}`}>
                    {station.id}
                </span>
                <span
                    className={`w-5.5 h-5.5 rounded-md ${typeDef.bg} ${typeDef.text} flex items-center justify-center border ${typeDef.border} shadow-2xs`}
                    title={`Loại máy: ${typeDef.label}`}
                >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                </span>
            </div>

            {/* Middle Content: User & Game or High-Contrast Centered Status for Vacant */}
            {isVacant ? (
                <div className="my-auto py-1 text-center flex flex-col items-center justify-center">
                    {station.type === 'maint' ? (
                        <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 text-rose-950 border border-rose-300 shadow-2xs text-[11px] font-mono font-extrabold uppercase tracking-wide"
                            title="Máy đang trong quá trình bảo trì kỹ thuật"
                        >
                            <Wrench className="w-3 h-3 text-rose-700 shrink-0" />
                            BẢO TRÌ
                        </span>
                    ) : (
                        <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-2xs text-[11px] font-mono font-extrabold uppercase tracking-wide"
                            title="Máy trống, sẵn sàng cho khách nạp giờ"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                            SẴN SÀNG
                        </span>
                    )}
                </div>
            ) : (
                <div className="my-auto py-1 min-w-0">
                    <p
                        className="text-xs font-extrabold text-slate-900 truncate leading-tight"
                        title={`Tên người dùng: ${station.user}`}
                    >
                        {station.user}
                    </p>
                    <p
                        className="text-[11px] text-slate-600 truncate font-bold mt-0.5"
                        title={`Ứng dụng/Game: ${station.game || 'League of Legends'}`}
                    >
                        {station.game || 'League of Legends'}
                    </p>
                </div>
            )}

            {/* Bottom Row: Balanced Micro-UI Tags for Active Sessions */}
            {!isVacant && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-1">
                    {/* Time Tag */}
                    <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs shrink-0"
                        title={`Thời gian đã chơi: ${station.time || '0h 0m'}`}
                    >
                        <Clock className="w-2.5 h-2.5 text-amber-800 shrink-0" />
                        {station.time || '0h 0m'}
                    </span>

                    {/* Telemetry / Temp / Latency Tag */}
                    <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-900 border border-slate-300 shadow-2xs truncate"
                        title={`Thông số thiết bị: ${station.telemetry || station.latency || 'Hoạt động bình thường'}`}
                    >
                        {station.latency ? (
                            <>
                                <Wifi className="w-2.5 h-2.5 text-sky-700 shrink-0" />
                                {station.latency}
                            </>
                        ) : (
                            <>
                                <Thermometer className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                                {station.telemetry ? station.telemetry.split('•')[0].trim() : '38°C'}
                            </>
                        )}
                    </span>
                </div>
            )}
        </div>
    );
}
