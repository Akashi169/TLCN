import React from 'react';

export default function LiveStats() {
  return (
    <div className="relative z-10 p-4">
      <div className="glass-panel p-5 rounded-2xl shadow-xl text-slate-800">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-md bg-brand-500/10 text-brand-700 text-[10px] font-extrabold uppercase tracking-wider border border-brand-200/70">
            NEXUS Cloud Ecosystem
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-bold text-slate-600">Thế hệ Cyber Gaming thứ 5</span>
        </div>
        
        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
          "Chơi mọi tựa game AAA đỉnh cao ở bất cứ đâu. Không cần cài đặt, không cần đầu tư phần cứng đắt tiền."
        </p>
        
        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>84 trạm máy đang online</span>
          </div>
          <div>
            <span className="text-slate-800 font-bold">3,420 hội viên tin dùng</span>
          </div>
        </div>
      </div>
    </div>
  );
}
