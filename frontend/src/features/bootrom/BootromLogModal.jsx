import React, { useState, useEffect } from 'react';
import { X, Gauge, Search, RefreshCw, Cpu, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import machineService from '../../shared/api/machine.service';

export default function BootromLogModal({ isOpen, onClose }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const loadBootromLogs = async () => {
        setLoading(true);
        try {
            const data = await machineService.getBootromLogs();
            setLogs(data || []);
        } catch (error) {
            console.error('Lỗi tải Bootrom Logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            loadBootromLogs();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.computer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.ip_address.includes(searchQuery) ||
            log.mac_address.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            filterStatus === 'all' ||
            (filterStatus === 'success' && log.boot_status === 'PXE_SUCCESS_READY') ||
            (filterStatus === 'warning' && log.boot_status === 'PXE_DROP_WARNING') ||
            (filterStatus === 'off' && log.boot_status === 'POWER_OFF');

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div
                className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center">
                            <Gauge className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-extrabold text-base tracking-tight text-white">
                                    Nhật Ký Máy Chủ Bootrom & Mạng LAN (PXE Boot Logs)
                                </h3>
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                                    iCafe / Gcafe Server 1.1ms
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">
                                Theo dõi thời gian boot Windows qua LAN, tốc độ Đọc/Ghi Diskless & Trạng thái rớt gói PXE
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm theo Tên máy (ESP-01, VIP-..), IP, MAC..."
                                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 font-bold">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none"
                        >
                            <option value="all">Tất cả trạng thái Bootrom</option>
                            <option value="success">🟢 PXE Boot Thành Công (Ready)</option>
                            <option value="warning">🔴 Cảnh báo rớt gói LAN (Drop Warning)</option>
                            <option value="off">⚪ Tắt máy (Power Off)</option>
                        </select>

                        <button
                            onClick={loadBootromLogs}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                            <span>Làm mới</span>
                        </button>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="p-12 text-center text-slate-400 font-mono text-xs">
                            ⏳ Đang quét gói tin PXE Bootrom từ máy chủ...
                        </div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 font-mono text-xs">
                            Không tìm thấy dữ liệu nhật ký Bootrom phù hợp.
                        </div>
                    ) : (
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 text-[11px] font-mono uppercase font-bold text-slate-600 border-b border-slate-200">
                                        <th className="p-3">Tên Máy</th>
                                        <th className="p-3">Phân Khu</th>
                                        <th className="p-3">Địa Chỉ IP & MAC</th>
                                        <th className="p-3">Trạng Thái PXE</th>
                                        <th className="p-3">Tốc Độ Đọc Diskless</th>
                                        <th className="p-3">Tốc Độ Ghi Diskless</th>
                                        <th className="p-3">Thời Gian Boot OS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                                    {filteredLogs.map((log) => (
                                        <tr key={log.computer_id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-3 font-mono font-extrabold text-slate-900">
                                                {log.computer_name}
                                            </td>
                                            <td className="p-3 text-slate-600 font-medium">{log.zone_name}</td>
                                            <td className="p-3 font-mono text-[11px]">
                                                <div>{log.ip_address}</div>
                                                <div className="text-slate-400">{log.mac_address}</div>
                                            </td>
                                            <td className="p-3">
                                                {log.boot_status === 'PXE_SUCCESS_READY' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                                                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                                        PXE OK (Ready)
                                                    </span>
                                                ) : log.boot_status === 'PXE_DROP_WARNING' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold">
                                                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                                                        Rớt gói tin LAN
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-mono font-bold">
                                                        Tắt nguồn (Offline)
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3 font-mono text-emerald-600 font-bold">
                                                {log.read_speed_mbps ? `${log.read_speed_mbps} MB/s` : '0 MB/s'}
                                            </td>
                                            <td className="p-3 font-mono text-sky-600 font-bold">
                                                {log.write_speed_mbps ? `${log.write_speed_mbps} MB/s` : '0 MB/s'}
                                            </td>
                                            <td className="p-3 font-mono">
                                                {log.boot_time_seconds ? (
                                                    <span className="text-slate-900 font-bold">{log.boot_time_seconds}s</span>
                                                ) : (
                                                    <span className="text-slate-400">N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span>Server Bootrom Primary: 192.168.1.1 • Sync Rate: 10Gbps LAN Switch</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                    >
                        Đóng cửa sổ
                    </button>
                </div>
            </div>
        </div>
    );
}
