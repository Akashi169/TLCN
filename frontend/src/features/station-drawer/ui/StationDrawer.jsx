import React from 'react';
import { X, Power, Lock, Unlock, ArrowRightLeft, CreditCard, Clock, User, Gamepad2, ShieldAlert, Cpu } from 'lucide-react';
import { STATION_TYPES } from '../../../shared/data/mockData';

export default function StationDrawer({ station, isOpen, onClose }) {
    if (!station || !isOpen) return null;

    const typeDef = STATION_TYPES[station.type] || {
        label: 'Sẵn sàng',
        color: 'slate',
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-200'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity duration-300">
            <div
                className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-6">
                    {/* Header Drawer */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md">
                                {station.id}
                            </div>
                            <div>
                                <h3 className="text-base font-extrabold text-slate-800">{station.id} - Chi tiết máy</h3>
                                <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${typeDef.bg} ${typeDef.text} border ${typeDef.border}`}>
                                    {typeDef.label}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Quick Control Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 font-bold text-xs transition">
                            <Power className="w-4 h-4" /> Bật / Khởi động
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/80 font-bold text-xs transition">
                            <Lock className="w-4 h-4" /> Tạm khóa máy
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 font-bold text-xs transition">
                            <ArrowRightLeft className="w-4 h-4" /> Chuyển máy
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 font-bold text-xs transition">
                            <ShieldAlert className="w-4 h-4" /> Tắt máy khẩn cấp
                        </button>
                    </div>

                    {/* Active Session Info */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                        <h4 className="text-xs font-extrabold uppercase text-slate-400 font-mono tracking-wider">Thông Tin Phiên Sử Dụng</h4>
                        
                        <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50">
                            <span className="text-slate-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> Tên người chơi:</span>
                            <span className="font-bold text-slate-800">{station.user || 'Chưa đăng nhập'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50">
                            <span className="text-slate-500 flex items-center gap-1.5"><Gamepad2 className="w-3.5 h-3.5 text-slate-400" /> Tựa game / Ứng dụng:</span>
                            <span className="font-bold text-slate-800">{station.game || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50">
                            <span className="text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> Thời gian đã chơi:</span>
                            <span className="font-mono font-bold text-emerald-600">{station.time || '00:00'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1">
                            <span className="text-slate-500 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-slate-400" /> Telemetry / Nhiệt độ:</span>
                            <span className="font-mono text-slate-700">{station.telemetry || '32°C • Normal'}</span>
                        </div>
                    </div>

                    {/* Member Quick Balance Topup */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                                <CreditCard className="w-3.5 h-3.5" /> Nạp tiền nhanh tài khoản
                            </span>
                            <span className="text-[10px] bg-indigo-500/30 px-2 py-0.5 rounded text-indigo-200">PAYMENT</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Nhập số tiền (VD: 50000)"
                                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            <button className="px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-bold transition">
                                Nạp Ngay
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition"
                    >
                        Đóng
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition">
                        Lưu Thay Đổi
                    </button>
                </div>
            </div>
        </div>
    );
}
