import React from 'react';
import { X, Tag, Calendar, Users, Percent, Wallet, Clock, CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react';

/**
 * PromotionDetailModal
 * Component xem chi tiết chiến dịch khuyến mãi
 */
export default function PromotionDetailModal({ isOpen, onClose, promo }) {
  if (!isOpen || !promo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-black text-base shadow-md">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">{promo.name}</h3>
                <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  {promo.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{promo.description || 'Không có mô tả phụ'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Details */}
        <div className="my-4 space-y-4 text-xs">
          {/* Status & Budget Bar */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Trạng thái</span>
              <span className={`text-xs font-extrabold ${promo.isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                {promo.isActive ? `● ${promo.status}` : '● Tạm Ngưng (Inactive)'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Ngân sách đã dùng</span>
              <span className="text-xs font-mono font-bold text-slate-900">
                {(promo.budgetSpent || 0).toLocaleString()} / {(promo.totalBudget || 60000000).toLocaleString()} đ
              </span>
            </div>
          </div>

          {/* Section 1: Chiết Khấu */}
          <div className="p-3 bg-sky-50/40 border border-sky-200/80 rounded-xl space-y-2">
            <h4 className="font-extrabold text-sky-900 uppercase text-[11px] flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-sky-600" /> Giá trị chiết khấu
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-800">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Loại chiết khấu:</span>
                <span className="font-bold">{promo.discountType}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Giá trị giảm:</span>
                <span className="font-mono font-black text-sky-900 text-sm">
                  {promo.discountType === 'PERCENTAGE' ? `${promo.discountValue}% Off` : `${promo.discountValue.toLocaleString()} đ`}
                </span>
              </div>
              {promo.maxDiscountAmount && (
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Giảm tối đa:</span>
                  <span className="font-mono font-bold text-slate-900">{promo.maxDiscountAmount.toLocaleString()} đ/lượt</span>
                </div>
              )}
              {promo.minDepositAmount && (
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Đơn nạp tối thiểu:</span>
                  <span className="font-mono font-bold text-slate-900">{promo.minDepositAmount.toLocaleString()} đ</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Thời gian & Đối tượng */}
          <div className="p-3 bg-indigo-50/40 border border-indigo-200/80 rounded-xl space-y-2">
            <h4 className="font-extrabold text-indigo-900 uppercase text-[11px] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Thời gian &amp; Phạm vi áp dụng
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-800">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Thời gian áp dụng:</span>
                <span className="font-mono font-bold text-slate-900">
                  {promo.startDate ? `${promo.startDate} - ${promo.endDate || 'Chưa hết hạn'}` : 'Vô thời hạn'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Ghi chú lịch:</span>
                <span className="font-bold text-indigo-700">{promo.scheduleNote || 'Áp dụng toàn thời gian'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Đối tượng áp dụng:</span>
                <span className="font-bold text-slate-900">
                  {promo.targetAudience === 'VIP' ? 'Hội viên VIP' : promo.targetAudience === 'NEWBIE' ? 'Tân thủ' : 'Tất cả hội viên'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition shadow-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
