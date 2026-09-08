import React from 'react';

/**
 * Helper to render Member Tier Badge
 */
function TierBadge({ tier }) {
  if (tier === 'diamond') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 via-sky-50 to-cyan-50 text-indigo-950 border border-cyan-300/90 shadow-xs text-xs font-extrabold tracking-wide">
        <span className="material-symbols-outlined text-[15px] text-cyan-600">diamond</span>
        VIP DIAMOND
      </span>
    );
  }
  if (tier === 'gold') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-950 border border-amber-300/90 shadow-xs text-xs font-bold tracking-wide">
        <span className="material-symbols-outlined text-[15px] text-amber-600">military_tech</span>
        VIP GOLD
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300/90 text-xs font-bold">
      <span className="material-symbols-outlined text-[15px] text-slate-600">shield</span>
      NORMAL
    </span>
  );
}

/**
 * MemberTable component displaying Cyber Member list
 */
export default function MemberTable({
  members = [],
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onQuickDeposit,
  onEdit,
  onLock,
  onDelete,
  onUnlock
}) {
  const isAllSelected = members.length > 0 && selectedIds.length === members.length;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-800 text-[11px] uppercase tracking-wider border-b border-slate-200 font-bold">
              <th className="py-3.5 px-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 rounded accent-sky-600 cursor-pointer"
                  id="check-all"
                />
              </th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800">UID &amp; Hội Viên</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800">Hạng Thành Viên</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 text-right pr-6">Số Dư Tài Khoản</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 text-right pr-6">Điểm Pts</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800">Trạm &amp; Trạng Thái Hoạt Động</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800">Lần Đăng Nhập Cuối</th>
              <th className="py-3.5 px-4 font-extrabold text-slate-800 text-right pr-6">Thao Tác Nhanh</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700" id="member-table-body">
            {members.map((m) => {
              const isSelected = selectedIds.includes(m.id);
              const isLocked = m.status === 'locked';

              return (
                <tr
                  key={m.id}
                  className={`group transition-colors border-b ${
                    isSelected
                      ? 'bg-sky-50/70 hover:bg-sky-50'
                      : isLocked
                      ? 'hover:bg-rose-50/50 bg-rose-50/20 border-rose-100'
                      : m.tier === 'diamond'
                      ? 'hover:bg-indigo-50/30 bg-white border-slate-100'
                      : 'hover:bg-slate-50/80 bg-white border-slate-100'
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect && onToggleSelect(m.id)}
                      className="row-checkbox w-4 h-4 rounded accent-sky-600 cursor-pointer"
                    />
                  </td>

                  {/* Member Info & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <div className="relative flex-shrink-0">
                        {m.avatar ? (
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className={`w-10 h-10 rounded-full object-cover shadow-xs ring-2 ${
                              m.tier === 'diamond'
                                ? 'ring-cyan-400 shadow-cyan-200/50'
                                : m.tier === 'gold'
                                ? 'ring-amber-300/70'
                                : 'ring-slate-200'
                            }`}
                          />
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-xs shadow-xs ${
                              isLocked
                                ? 'bg-red-100 border-red-300 text-red-800'
                                : 'bg-slate-100 border-slate-300 text-slate-800'
                            }`}
                          >
                            {m.initials}
                          </div>
                        )}
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                            isLocked
                              ? 'bg-rose-600'
                              : m.status === 'offline'
                              ? 'bg-slate-400'
                              : 'bg-emerald-500'
                          }`}
                        ></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[14px] font-bold tracking-tight truncate ${
                              isLocked ? 'text-slate-800 line-through' : 'text-slate-900'
                            }`}
                          >
                            {m.name}
                          </span>
                          {m.badge === 'verified' && (
                            <span className="material-symbols-outlined text-[15px] text-amber-500" title="Hội viên thân thiết">
                              verified
                            </span>
                          )}
                          {m.badge === 'pro' && (
                            <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-900 border border-indigo-200 rounded text-[10px] font-extrabold">
                              PRO
                            </span>
                          )}
                          {m.badge === 'streamer' && (
                            <span className="material-symbols-outlined text-[15px] text-cyan-600" title="Streamer phòng máy">
                              live_tv
                            </span>
                          )}
                          {isLocked && (
                            <span className="material-symbols-outlined text-[16px] text-rose-700">
                              gpp_bad
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <span
                            className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] border ${
                              isLocked
                                ? 'text-rose-800 bg-rose-100 border-rose-300'
                                : 'text-cyan-800 bg-cyan-50 border-cyan-200/80'
                            }`}
                          >
                            {m.uid}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600 font-medium truncate">{m.email || m.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <TierBadge tier={m.tier} />
                  </td>

                  {/* Balance (Strictly Right Aligned) */}
                  <td className="py-3.5 px-4 text-right pr-6 whitespace-nowrap">
                    <div className="flex flex-col items-end justify-center text-right">
                      <div
                        className={`text-[16px] font-black tracking-tight text-right ${
                          isLocked ? 'text-rose-800' : m.balance < 20000 ? 'text-rose-600' : 'text-slate-900'
                        }`}
                      >
                        {m.balance.toLocaleString()} <span className="text-xs font-bold text-slate-700">đ</span>
                      </div>
                      {m.balanceNote && (
                        <div
                          className={`text-[11px] mt-0.5 text-right font-semibold ${
                            isLocked
                              ? 'text-rose-800 bg-rose-100 inline-block px-1.5 py-0.2 rounded'
                              : m.balance < 20000
                              ? 'text-rose-700 font-bold'
                              : 'text-emerald-700'
                          }`}
                        >
                          {m.balanceNote}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Points (Right Aligned) */}
                  <td className="py-3.5 px-4 text-right pr-6 whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      <span className={`text-sm font-extrabold ${m.tier === 'diamond' ? 'text-indigo-800' : 'text-amber-800'}`}>
                        {m.pts.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-500 ml-1 font-semibold">pts</span>
                    </div>
                  </td>

                  {/* Station & Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {isLocked ? (
                        <>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                            <span className="text-xs font-bold text-rose-900 bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
                              Bị Khóa Hệ Thống
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-rose-800 mt-1 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/60">
                            {m.station}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                m.status === 'offline'
                                  ? 'bg-slate-400'
                                  : m.stationCode?.startsWith('VIP')
                                  ? 'bg-cyan-600 animate-pulse'
                                  : m.stationCode?.startsWith('ESP') || m.stationCode?.startsWith('STR')
                                  ? 'bg-indigo-600 animate-pulse'
                                  : 'bg-emerald-500'
                              }`}
                            ></span>
                            {m.stationCode && (
                              <span
                                className={`text-[11px] font-bold px-1.5 py-0.5 rounded border ${
                                  m.stationCode.startsWith('VIP')
                                    ? 'text-cyan-900 bg-cyan-50 border-cyan-200'
                                    : m.stationCode.startsWith('ESP') || m.stationCode.startsWith('STR')
                                    ? 'text-indigo-900 bg-indigo-50 border-indigo-200'
                                    : 'text-slate-800 bg-slate-100 border-slate-200'
                                }`}
                              >
                                {m.stationCode}
                              </span>
                            )}
                            <span className="text-slate-800 text-xs font-semibold">{m.station}</span>
                          </div>
                          {m.stationDetail && (
                            <div className="flex items-center gap-1 text-[11px] text-indigo-800 font-semibold mt-1">
                              <span className="material-symbols-outlined text-[13px]">
                                {m.stationDetail.includes('Cloud') ? 'cloud_sync' : m.stationDetail.includes('Stream') ? 'videocam' : 'desktop_windows'}
                              </span>
                              <span>{m.stationDetail}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-700 text-xs">
                    <div>
                      <strong className="text-slate-900 font-semibold">{m.lastLoginTime}</strong>, {m.lastLoginDetail}
                    </div>
                    {m.ipAddress && <div className="text-slate-500 font-mono text-[11px]">IP: {m.ipAddress}</div>}
                    {m.lockedBy && <div className="text-rose-800 font-bold text-[11px]">{m.lockedBy}</div>}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap pr-6">
                    <div className="flex items-center justify-end gap-1.5">
                      {isLocked ? (
                        <>
                          <button
                            onClick={() => onUnlock && onUnlock(m.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                            title="Mở khóa tài khoản"
                          >
                            <span className="material-symbols-outlined text-[15px]">lock_open</span>
                            Mở Khóa
                          </button>
                          <button
                            onClick={() => onEdit && onEdit(m.id)}
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                            title="Xem nhật ký"
                          >
                            <span className="material-symbols-outlined text-[16px]">history</span>
                          </button>
                          <button
                            onClick={() => onDelete && onDelete(m.id)}
                            className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center transition-colors"
                            title="Xóa vĩnh viễn"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => onQuickDeposit && onQuickDeposit(m.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs ${
                              m.balance < 20000
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white'
                                : 'bg-gradient-to-r from-cyan-50 to-sky-100 hover:from-cyan-100 hover:to-sky-200 text-cyan-900 border border-cyan-300/80'
                            }`}
                            title="Nạp giờ nhanh"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              {m.balance < 20000 ? 'add_circle' : 'bolt'}
                            </span>
                            {m.balance < 20000 ? 'Nạp Thêm' : 'Nạp F2'}
                          </button>

                          <button
                            onClick={() => onEdit && onEdit(m.id)}
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                            title="Chỉnh sửa thông tin"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </button>

                          <button
                            onClick={() => onLock && onLock(m.id)}
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                            title="Khóa máy trạm / Đăng xuất"
                          >
                            <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                          </button>

                          <button
                            onClick={() => onDelete && onDelete(m.id)}
                            className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 flex items-center justify-center transition-colors"
                            title="Xóa tài khoản"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </>
                      )}
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
