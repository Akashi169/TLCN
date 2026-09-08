import React from 'react';
import { User, Cloud, Power, Wrench } from 'lucide-react';
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
        color: 'slate',
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-200'
    };
    
    const IconComponent = typeIconMap[station.type] || Power;
    const isVacant = station.type === 'ready' || station.type === 'maint' || !station.user;

    return (
        <div
            onClick={() => onClick && onClick(station)}
            className={`cursor-pointer group rounded-xl p-3 bg-white border border-${typeDef.color}-200/80 shadow-xs hover:shadow-md hover:border-sky-500 transition-all duration-200 flex flex-col justify-between aspect-square`}
        >
            {/* Top Header: ID & Type Icon */}
            <div className="flex items-center justify-between">
                <span className={`font-mono text-xs font-bold text-${typeDef.color}-900`} title={station.id}>
                    {station.id}
                </span>
                <span className={`w-5 h-5 rounded-md ${typeDef.bg} ${typeDef.text} flex items-center justify-center border ${typeDef.border}`}>
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                </span>
            </div>

            {/* Middle Content: User & Game or Centered Status for Vacant */}
            {isVacant ? (
                <div className="my-auto py-1 text-center flex flex-col items-center justify-center">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {station.type === 'maint' ? '⚠️ BẢO TRÌ' : '⚪ SẴN SÀNG'}
                    </span>
                </div>
            ) : (
                <div className="my-auto py-1">
                    <p
                        className="text-xs font-extrabold text-slate-900 truncate"
                        title={station.user || 'Khách chơi'}
                    >
                        {station.user || 'Khách chơi'}
                    </p>
                    <p
                        className="text-[11px] text-slate-600 truncate font-semibold mt-0.5"
                        title={station.game || 'League of Legends'}
                    >
                        {station.game || 'League of Legends'}
                    </p>
                </div>
            )}

            {/* Bottom Row: Time Tag & Telemetry Tag (Hidden for Vacant/Idle stations to create visual rest) */}
            {!isVacant && (
                <div className={`flex items-center justify-between pt-1 border-t border-${typeDef.color}-100`}>
                    <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-extrabold ${typeDef.bg} ${typeDef.text} border ${typeDef.border}`}
                        title={`Thời lượng đã chơi: ${station.time || '0h 0m'}`}
                    >
                        {station.time || '0h 0m'}
                    </span>
                    <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200/80"
                        title={station.telemetry || station.latency || 'Telemetry OK'}
                    >
                        {station.latency || (station.telemetry ? station.telemetry.split('•')[0].trim() : '38°C')}
                    </span>
                </div>
            )}
        </div>
    );
}
