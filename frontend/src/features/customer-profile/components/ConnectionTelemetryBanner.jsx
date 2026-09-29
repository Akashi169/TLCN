import React from 'react';
import { Wifi, TrendingUp, ShieldCheck } from 'lucide-react';

/**
 * ConnectionTelemetryBanner Component
 * Renders Infrastructure & Network Status Capsule
 */
export default function ConnectionTelemetryBanner({ nodeName = 'Hà Nội Server Node Alpha' }) {
  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
          style={{ background: 'linear-gradient(135deg, #06b6d4, #0284c7)' }}
        >
          <Wifi className="w-6.5 h-6.5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-slate-900 font-sans">
              Trạng thái kết nối Cloud Gaming
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
              Esports Grade
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {nodeName} • Băng thông không giới hạn
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
        {/* Ping / Latency */}
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Độ trễ / Ping
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-end gap-[3px] h-4 pr-1">
              <span className="w-1 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="w-1 h-2 rounded-full bg-emerald-500"></span>
              <span className="w-1 h-3 rounded-full bg-emerald-500"></span>
              <span className="w-1 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </div>
            <span className="text-lg font-bold text-emerald-600 tracking-tight font-mono">1.18 ms</span>
            <span className="text-xs text-emerald-700 font-semibold">(Rất tốt)</span>
          </div>
        </div>

        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>

        {/* Jitter */}
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Jitter
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
            <span className="text-lg font-bold text-slate-900 font-mono">0.04 ms</span>
          </div>
        </div>

        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>

        {/* Packet Loss */}
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Packet Loss
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
            <span className="text-lg font-bold text-slate-900 font-mono">0.00%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
