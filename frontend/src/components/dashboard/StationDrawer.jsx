import React from 'react';
import { STATION_TYPES } from '../../data/mockData';

export default function StationDrawer({ station, isOpen, onClose }) {
    if (!station) return null;
    const typeDef = STATION_TYPES[station.type];

    return (
        <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

            <div className="space-y-6">
                {/* Header Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-extrabold font-mono">{station.id}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${typeDef.bg} ${typeDef.text} border ${typeDef.border}`}>
                            {typeDef.label}
                        </span>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Thông tin chi tiết */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-xs text-slate-500">Người chơi:</span>
                        <span className="text-sm font-bold text-slate-800">{station.user}</span>
                    </div>
                    {/* ... Các thông tin khác */}
                </div>
            </div>

        </div>
    );
}