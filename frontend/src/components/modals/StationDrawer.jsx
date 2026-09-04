import React from 'react';
import { User, Cloud, Power, Wrench, X } from 'lucide-react';
import { STATION_TYPES } from '../../data/mockData';

const typeIconMap = {
    local: User,
    cloud: Cloud,
    ready: Power,
    maint: Wrench
};

export default function StationDrawer({ station, isOpen, onClose }) {
    if (!station) return null;
    const typeDef = STATION_TYPES[station.type] || STATION_TYPES.ready;
    const IconComponent = typeIconMap[station.type] || Power;

    return (
        <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${typeDef.bg} ${typeDef.border} ${typeDef.text} flex items-center justify-center font-mono font-bold text-sm`}>
                            <IconComponent className="w-5 h-5 shrink-0" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-extrabold text-slate-900 font-mono">{station.id}</h3>
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${typeDef.bg} ${typeDef.text} border ${typeDef.border}`}>
                                    {typeDef.label}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">Trạm tác chiến Campus A</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">Hội viên / Người chơi:</span>
                        <span className="text-sm font-bold text-slate-800">{station.user}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">Ứng dụng hoạt động:</span>
                        <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/60">{station.game}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">Telemetry:</span>
                        <span className="font-mono text-xs font-semibold text-slate-700">{station.telemetry}</span>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
                <button onClick={onClose} className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all">
                    Đóng Bảng Thao Tác
                </button>
            </div>
        </div>
    );
}