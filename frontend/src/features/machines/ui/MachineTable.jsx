import React from 'react';
import { Eye, Edit, Trash2, MoreVertical, HardDrive, Cpu, AlertTriangle, CheckCircle, PowerOff, Wrench } from 'lucide-react';

/**
 * Status Badge Helper
 */
function StatusBadge({ status, statusLabel }) {
  if (status === 'online') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0fdf4] text-[#15803d] rounded-full font-mono text-[11px] font-bold">
        <span className="h-2 w-2 rounded-full bg-[#16a34a]"></span>
        {statusLabel || 'Online (Sẵn sàng)'}
      </span>
    );
  }
  if (status === 'in-use') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f9ff] text-[#0369a1] rounded-full font-mono text-[11px] font-bold">
        <span className="h-2 w-2 rounded-full bg-[#0284c7]"></span>
        {statusLabel || 'Đang sử dụng'}
      </span>
    );
  }
  if (status === 'reserved') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#faf5ff] text-[#7e22ce] rounded-full font-mono text-[11px] font-bold">
        <span className="h-2 w-2 rounded-full bg-[#9333ea]"></span>
        {statusLabel || 'Đặt trước'}
      </span>
    );
  }
  if (status === 'maintenance') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff1f2] text-[#be123c] rounded-full font-mono text-[11px] font-bold">
        <span className="h-2 w-2 rounded-full bg-[#e11d48]"></span>
        {statusLabel || 'Bảo trì'}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f8fafc] text-[#475569] rounded-full font-mono text-[11px] font-bold">
      <span className="h-2 w-2 rounded-full bg-[#64748b]"></span>
      {statusLabel || 'Offline'}
    </span>
  );
}

/**
 * MachineTable component displaying complete fleet list
 */
export default function MachineTable({
  machines = [],
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onLiveMirror,
  onEdit,
  onDelete
}) {
  const isAllSelected = machines.length > 0 && selectedIds.length === machines.length;

  return (
    <div className="w-full bg-white rounded-xl shadow-xs border border-slate-200/90 flex flex-col">
      <div className="w-full overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse" id="machineFleetTable">
          <thead>
            <tr className="bg-slate-100/90 text-slate-800 text-[11px] uppercase tracking-wider select-none border-b border-slate-200 font-extrabold">
              <th className="w-12 py-3.5 px-4 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded w-4 h-4 text-sky-600 accent-sky-600 focus:ring-0 cursor-pointer"
                  id="selectAllCheckbox"
                />
              </th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 min-w-[170px]">PC ID / Địa Chỉ IP</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 min-w-[140px]">Phân Khu (Zone)</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 min-w-[280px] max-w-[320px]">Cấu Hình Phần Cứng &amp; BootROM</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 min-w-[200px]">Người Dùng / Phiên Hoạt Động</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 text-center min-w-[170px] whitespace-nowrap">TRẠNG THÁI</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 text-right pr-6 min-w-[150px] whitespace-nowrap">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
            {machines.map((m) => {
              const isSelected = selectedIds.includes(m.id);

              return (
                <tr
                  key={m.id}
                  className={`hover:bg-slate-50/80 transition-colors group ${
                    isSelected ? 'bg-sky-50/70' : ''
                  }`}
                  data-status={m.status}
                  data-zone={m.zoneId}
                >
                  {/* Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect && onToggleSelect(m.id)}
                      className="row-checkbox rounded w-4 h-4 accent-sky-600 cursor-pointer"
                    />
                  </td>

                  {/* PC ID / IP with vertical centering */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-sky-100/90 border border-sky-200 flex items-center justify-center text-sky-900 font-mono text-xs font-extrabold shadow-2xs shrink-0">
                        {m.numericId || m.id.split('-')[1] || '00'}
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-extrabold text-slate-900 leading-tight" title={m.id}>
                          {m.id}
                        </span>
                        <span className="font-mono text-[11px] text-slate-600 flex items-center gap-1 mt-0.5 font-medium">
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              m.status === 'online'
                                ? 'bg-emerald-500'
                                : m.status === 'in-use'
                                ? 'bg-sky-500'
                                : m.status === 'maintenance'
                                ? 'bg-rose-500'
                                : 'bg-slate-400'
                            }`}
                          ></span>
                          {m.ip} • {m.port}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Zone */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-900 border border-slate-300/80 text-xs font-bold rounded-md">
                      <span className="material-symbols-outlined text-[15px] text-sky-700">
                        {m.zoneIcon || 'grid_view'}
                      </span>
                      {m.zoneName}
                    </span>
                  </td>

                  {/* Hardware & BootROM with max-width and high contrast tags */}
                  <td className="py-4 px-4 max-w-[320px]">
                    <div className="flex flex-col gap-1.5 max-w-[300px]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* CPU Badge - High contrast */}
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 bg-slate-200 text-slate-900 border border-slate-300 rounded-md shadow-2xs shrink-0">
                          <Cpu className="w-3 h-3 text-slate-700" />
                          {m.cpu}
                        </span>

                        {/* GPU Badge - High contrast */}
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-extrabold px-2 py-0.5 bg-sky-100 text-sky-950 border border-sky-300 rounded-md shadow-2xs shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                          {m.gpu}
                        </span>

                        {/* RAM Badge - High contrast */}
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 bg-indigo-100 text-indigo-950 border border-indigo-300 rounded-md shadow-2xs shrink-0">
                          {m.ram}
                        </span>
                      </div>

                      {/* BootROM Image Status */}
                      <div className={`text-[11px] font-mono flex items-center gap-1.5 ${m.isWarningImage ? 'text-rose-700 font-bold' : 'text-slate-600'}`}>
                        {m.isWarningImage ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        ) : (
                          <HardDrive className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        )}
                        <span className="truncate max-w-[260px]" title={m.bootImage}>
                          BootROM: {m.bootImage}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* User / Session Info */}
                  <td className="py-4 px-4">
                    {m.userName ? (
                      <div className="flex items-center gap-2.5">
                        {m.userInitials && (
                          <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                            {m.userInitials}
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 truncate" title={m.userName}>
                              {m.userName}
                            </span>
                            {m.userRank && (
                              <span className="bg-amber-100 text-amber-950 border border-amber-300 text-[10px] px-1.5 py-0.2 rounded font-extrabold shrink-0">
                                {m.userRank}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium truncate mt-0.5" title={m.currentGame || m.cleanStatus}>
                            {m.currentGame || m.cleanStatus}
                          </div>
                        </div>
                      </div>
                    ) : m.status === 'online' ? (
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900">Sẵn sàng nạp khách</span>
                          <span className="text-[11px] text-slate-600">{m.cleanStatus}</span>
                        </div>
                      </div>
                    ) : m.status === 'offline' ? (
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <PowerOff className="w-4 h-4 text-slate-400 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800">Tắt nguồn</span>
                          <span className="text-[11px] text-slate-600">{m.cleanStatus}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-rose-700">
                        <Wrench className="w-4 h-4 text-rose-600 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900">Đang bảo trì</span>
                          <span className="text-[11px] text-slate-600">{m.cleanStatus}</span>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 text-center min-w-[170px] whitespace-nowrap">
                    <StatusBadge status={m.status} statusLabel={m.statusLabel} />
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right pr-6 min-w-[150px] whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onLiveMirror && onLiveMirror(m.id)}
                        className="w-8 h-8 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                        title="Xem màn hình từ xa (Live Mirror)"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit && onEdit(m.id)}
                        className="w-8 h-8 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                        title="Chỉnh sửa thông số / Cấu hình"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete && onDelete(m.id)}
                        className="w-8 h-8 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors"
                        title="Hủy đăng ký / Xóa máy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                        title="Tác vụ nâng cao"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
