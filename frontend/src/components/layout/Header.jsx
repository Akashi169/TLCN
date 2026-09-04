import React from 'react';
import { Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-4">
      {/* Logo and Brand Name */}
      <a className="flex items-center space-x-3 group" href="#" title="NEXUS Cyber Command Home">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-sky-400 flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-brand-700">NEXUS</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-200/70 uppercase tracking-widest">CLOUD</span>
          </div>
          <p className="text-[10px] tracking-widest text-slate-600 font-semibold uppercase">Cyber OS & Cloud Gaming</p>
        </div>
      </a>

      {/* Top Right Actions: Lang & Back to Home */}
      <div className="flex items-center space-x-3 text-xs">
        <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-semibold text-xs text-slate-800">VIE / VNĐ</span>
        </div>
        <a className="inline-flex items-center text-slate-700 hover:text-brand-600 font-medium transition-colors" href="#">
          <span>Trở về trang chủ</span>
          <Home className="w-3.5 h-3.5 ml-1" />
        </a>
      </div>
    </header>
  );
}
