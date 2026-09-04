import React from 'react';
import { User, Cloud, Power, Wrench } from 'lucide-react';
import { STATION_TYPES } from '../../data/mockData';

const typeIconMap = {
    local: User,
    cloud: Cloud,
    ready: Power,
    maint: Wrench
};

export default function StationCard({ station, onClick }) {
    const typeDef = STATION_TYPES[station.type] || STATION_TYPES.ready;
    const IconComponent = typeIconMap[station.type] || Power;

    return (
        <div
            onClick={() => onClick(station)}
            className={`cursor-pointer group rounded-xl p-3 bg-white border border-${typeDef.color}-200/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between aspect-square`}
        >
            <div className="flex items-center justify-between">
                <span className={`font-mono text-xs font-bold text-${typeDef.color}-800`}>{station.id}</span>
                <span className={`w-5 h-5 rounded-md ${typeDef.bg} ${typeDef.text} flex items-center justify-center border ${typeDef.border}`}>
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                </span>
            </div>

            <div className="my-auto py-1">
                <p className={`text-xs font-bold text-${typeDef.color === 'emerald' ? 'emerald-700' : 'slate-800'} truncate`}>
                    {station.user}
                </p>
                <p className={`text-[11px] text-${typeDef.color === 'emerald' ? 'slate-400' : 'slate-500'} truncate font-medium`}>
                    {station.game}
                </p>
            </div>

            <div className={`flex items-center justify-between pt-1 border-t border-${typeDef.color}-100`}>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${typeDef.bg} ${typeDef.text} border ${typeDef.border}`}>
                    {station.time}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                    {station.latency || (station.telemetry ? station.telemetry.split('•')[0] : '28°C')}
                </span>
            </div>
        </div>
    );
}