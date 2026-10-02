import React from 'react';
import { User, Cloud, Power, Wrench, Clock, Thermometer, Wifi, Lock } from 'lucide-react';
import { STATION_TYPES } from '../../../shared/constants/stationConstants';

const typeIconMap = {
    local: User,
    cloud: Cloud,
    ready: Power,
    maint: Wrench,
    off: Power,
    locked: Lock
};

export default function StationCard({ station, onClick }) {
    if (!station) return null;

    const statusUpper = String(station.status || '').toUpperCase();
    const isOffline = statusUpper === 'OFFLINE' || station.type === 'off';
    const isMaint = statusUpper === 'MAINTENANCE' || station.type === 'maint';
    const isLocked = statusUpper === 'LOCKED' || station.type === 'locked';
    const isOnlineReady = (statusUpper === 'ONLINE' || station.type === 'ready') && !station.user;

    const currentType = isOffline ? 'off' : isMaint ? 'maint' : isLocked ? 'locked' : isOnlineReady ? 'ready' : (station.type || 'local');

    const typeDef = STATION_TYPES[currentType] || {
        label: isOffline ? 'Tắt Nguồn' : isMaint ? 'Bảo Trì' : isLocked ? 'Tạm Khóa' : 'Sẵn Sàng',
        bg: isOffline ? 'bg-slate-100' : isMaint ? 'bg-rose-100' : isLocked ? 'bg-amber-100' : 'bg-emerald-100',
        text: isOffline ? 'text-slate-600' : isMaint ? 'text-rose-950' : isLocked ? 'text-amber-950' : 'text-emerald-950',
        border: isOffline ? 'border-slate-300' : isMaint ? 'border-rose-300' : isLocked ? 'border-amber-300' : 'border-emerald-300'
    };
    
    const IconComponent = typeIconMap[currentType] || Power;
    const isNonSession = isOffline || isMaint || isLocked || isOnlineReady || !station.user;

    const tooltipText = `Máy ${station.id} • ${
        station.user
            ? `Tài khoản: ${station.user} (${station.game || 'Game'})`
            : isOffline
            ? 'Đã tắt nguồn (Offline)'
            : isMaint
            ? 'Đang kiểm tra bảo trì'
            : isLocked
            ? 'Trạm đang tạm khóa'
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
                    title={`Trạng thái: ${typeDef.label}`}
                >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                </span>
            </div>

            {/* Middle Content: User & Game or Centered Status for Non-Active Sessions */}
            {isNonSession ? (
                <div className="my-auto py-1 text-center flex flex-col items-center justify-center">
                    {isOffline ? (
                        <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs text-[11px] font-mono font-extrabold uppercase tracking-wide"
                            title="Máy đã tắt nguồn"
                        >
                            <Power className="w-3 h-3 text-slate-500 shrink-0" />
                            TẮT NGUỒN
                        </span>
                    ) : isMaint ? (
                        <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 text-rose-950 border border-rose-300 shadow-2xs text-[11px] font-mono font-extrabold uppercase tracking-wide"
                            title="Máy đang trong quá trình bảo trì kỹ thuật"
                        >
                            <Wrench className="w-3 h-3 text-rose-700 shrink-0" />
                            BẢO TRÌ
                        </span>
                    ) : isLocked ? (
                        <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs text-[11px] font-mono font-extrabold uppercase tracking-wide"
                            title="Máy hiện đang tạm khóa"
                        >
                            <Lock className="w-3 h-3 text-amber-700 shrink-0" />
                            TẠM KHÓA
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

            {/* Bottom Row: Micro-UI Tags for Active Sessions */}
            {!isNonSession && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-1">
                    {/* Time Tag */}
                    <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs shrink-0"
                        title={`Thời gian đã chơi: ${station.time || '0h 0m'}`}
                    >
                        <Clock className="w-2.5 h-2.5 text-amber-800 shrink-0" />
                        {station.time || '0h 0m'}
                    </span>

                    {/* Telemetry Tag */}
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
