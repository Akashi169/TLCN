import React from 'react';
import { Eye, Edit, Trash2, Percent, Banknote, Moon, Utensils, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Render badge cho loại chiết khấu
 */
function DiscountTypeBadge({ type }) {
  if (type === 'PERCENTAGE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200/80 text-xs font-bold whitespace-nowrap">
        <Percent className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span>Giờ Chơi</span>
      </span>
    );
  }
  if (type === 'FIXED_AMOUNT') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200/80 text-xs font-bold whitespace-nowrap">
        <Banknote className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
        <span>Tiền Cố Định</span>
      </span>
    );
  }
  if (type === 'COMBO') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200/80 text-xs font-bold whitespace-nowrap">
        <Moon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
        <span>Combo Đêm</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold whitespace-nowrap">
      <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      <span>Giảm Giá F&amp;B</span>
    </span>
  );
}

/**
 * Render badge trạng thái chiến dịch
 */
function PromotionStatusBadge({ status, isActive }) {
  if (!isActive || status === 'SUSPENDED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
        <span>Tạm Ngưng</span>
      </span>
    );
  }
  if (status === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Đang Hoạt Động</span>
      </span>
    );
  }
  if (status === 'UPCOMING') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200/80 text-xs font-bold whitespace-nowrap">
        <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
        <span>Sắp Diễn Ra</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200/80 text-xs font-bold whitespace-nowrap">
      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
      <span>Đã Kết Thúc</span>
    </span>
  );
}

/**
 * PromotionTable Component
 */
export default function PromotionTable({
  promotions = [],
  onViewDetail,
  onEdit,
  onToggleActive,
  onDelete
}) {
  return (
    <div className="w-full bg-white rounded-xl shadow-xs border border-slate-200/90 flex flex-col overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1050px]">
          <thead>
            <tr className="bg-slate-100/90 text-slate-800 text-[11px] uppercase tracking-wider border-b border-slate-200 font-extrabold select-none">
              <th className="py-3.5 px-4 min-w-[280px]">Tên Chiến Dịch</th>
              <th className="py-3.5 px-4 min-w-[150px]">Loại Chiết Khấu</th>
              <th className="py-3.5 px-4 min-w-[175px]">Giá Trị</th>
              <th className="py-3.5 px-4 min-w-[180px]">Thời Hạn Áp Dụng</th>
              <th className="py-3.5 px-4 min-w-[125px]">Đối Tượng</th>
              <th className="py-3.5 px-4 min-w-[145px]">Trạng Thái</th>
              <th className="py-3.5 px-4 text-right pr-6 min-w-[155px]">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
            {promotions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">Không tìm thấy chiến dịch khuyến mãi nào</p>
                  <p className="text-xs text-slate-400 mt-1">Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm</p>
                </td>
              </tr>
            ) : (
              promotions.map((p) => (
              <tr
                key={p.id}
                className={`hover:bg-slate-50/80 transition-colors group ${
                  !p.isActive ? 'opacity-70 bg-slate-50/40' : ''
                }`}
              >
                {/* Tên Chiến Dịch & Mã Voucher */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-extrabold text-sm text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                      {p.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-sky-800 bg-sky-50 border border-sky-200/90 px-2 py-0.5 rounded whitespace-nowrap shrink-0 shadow-2xs">
                        {p.code}
                      </span>
                      {p.description && (
                        <span className="text-xs text-slate-700 font-semibold leading-relaxed line-clamp-1">
                          {p.description}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Loại Chiết Khấu */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <DiscountTypeBadge type={p.discountType} />
                </td>

                {/* Giá Trị */}
                <td className="py-4 px-4 whitespace-nowrap font-mono">
                  <div className="flex flex-col">
                    <span className="font-black text-sm text-sky-800">
                      {p.discountType === 'PERCENTAGE'
                        ? `${p.discountValue}% Off`
                        : `${p.discountValue.toLocaleString()} đ`}
                    </span>
                    {p.maxDiscountAmount && (
                      <span className="text-[10px] text-slate-600 font-bold">
                        Tối đa {p.maxDiscountAmount.toLocaleString()}đ/lượt
                      </span>
                    )}
                    {p.minDepositAmount && (
                      <span className="text-[10px] text-slate-600 font-bold">
                        Đơn nạp ≥ {p.minDepositAmount.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                </td>

                {/* Thời Hạn Áp Dụng */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-slate-800 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      {p.startDate ? `${p.startDate} - ${p.endDate || 'Vô hạn'}` : 'Vô thời hạn'}
                    </span>
                    {p.scheduleNote && (
                      <span className="text-[11px] text-sky-700 font-extrabold mt-0.5">
                        {p.scheduleNote}
                      </span>
                    )}
                  </div>
                </td>

                {/* Đối Tượng Áp Dụng */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 font-bold text-xs text-slate-700">
                    {p.targetAudience === 'VIP'
                      ? 'VIP Only'
                      : p.targetAudience === 'NEWBIE'
                      ? 'Tân Thủ'
                      : p.targetAudience === 'NORMAL'
                      ? 'Hội Viên Thường'
                      : 'Tất Cả'}
                  </span>
                </td>

                {/* Trạng Thái */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <PromotionStatusBadge status={p.status} isActive={p.isActive} />
                </td>

                {/* Thao Tác */}
                <td className="py-4 px-4 text-right pr-6 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-3">
                    {/* Xem chi tiết */}
                    <button
                      type="button"
                      onClick={() => onViewDetail && onViewDetail(p)}
                      className="w-8.5 h-8.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50 flex items-center justify-center transition-colors border border-transparent hover:border-sky-200/60"
                      title="Xem chi tiết chiến dịch"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Sửa */}
                    <button
                      type="button"
                      onClick={() => onEdit && onEdit(p)}
                      className="w-8.5 h-8.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors border border-transparent hover:border-indigo-200/60"
                      title="Chỉnh sửa chiến dịch"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {/* Switch On/Off Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                      <input
                        type="checkbox"
                        checked={p.isActive}
                        onChange={(e) => onToggleActive && onToggleActive(p.id, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600 shadow-2xs"></div>
                    </label>
                  </div>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
