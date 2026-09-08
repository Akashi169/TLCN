import React, { useState, useEffect } from 'react';
import { X, Tag, PlusCircle, AlertCircle } from 'lucide-react';

/**
 * CreatePromotionModal / EditPromotionModal
 * Modal tạo mới hoặc chỉnh sửa chiến dịch khuyến mãi
 */
export default function CreatePromotionModal({ isOpen, onClose, promo, onSubmit }) {
  const isEdit = !!promo;

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState(10);
  const [maxDiscountAmount, setMaxDiscountAmount] = useState('');
  const [minDepositAmount, setMinDepositAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [scheduleNote, setScheduleNote] = useState('');
  const [targetAudience, setTargetAudience] = useState('ALL');
  const [status, setStatus] = useState('ACTIVE');

  useEffect(() => {
    if (promo) {
      setCode(promo.code || '');
      setName(promo.name || '');
      setDescription(promo.description || '');
      setDiscountType(promo.discountType || 'PERCENTAGE');
      setDiscountValue(promo.discountValue || 0);
      setMaxDiscountAmount(promo.maxDiscountAmount || '');
      setMinDepositAmount(promo.minDepositAmount || '');
      setStartDate(promo.startDate || '');
      setEndDate(promo.endDate || '');
      setScheduleNote(promo.scheduleNote || '');
      setTargetAudience(promo.targetAudience || 'ALL');
      setStatus(promo.status || 'ACTIVE');
    } else {
      setCode(`#PROMO-${Math.floor(1000 + Math.random() * 9000)}`);
      setName('');
      setDescription('');
      setDiscountType('PERCENTAGE');
      setDiscountValue(10);
      setMaxDiscountAmount('');
      setMinDepositAmount('');
      setStartDate('');
      setEndDate('');
      setScheduleNote('');
      setTargetAudience('ALL');
      setStatus('ACTIVE');
    }
  }, [promo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Vui lòng nhập tên chiến dịch khuyến mãi');
      return;
    }

    const payload = {
      code: code.trim(),
      name: name.trim(),
      description: description.trim(),
      discount_type: discountType,
      discount_value: Number(discountValue) || 0,
      max_discount_amount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
      min_deposit_amount: minDepositAmount ? Number(minDepositAmount) : null,
      start_date: startDate || null,
      end_date: endDate || null,
      schedule_note: scheduleNote.trim() || null,
      target_audience: targetAudience,
      status: status,
      is_active: status === 'ACTIVE' || status === 'UPCOMING'
    };

    if (onSubmit) {
      onSubmit(payload, promo?.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {isEdit ? 'Chỉnh Sửa Chiến Dịch Khuyến Mãi' : 'Tạo Chiến Dịch Khuyến Mãi Mới'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">NEXUS Promotion Engine v4.2</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-1">
              <label className="block font-bold text-slate-700 mb-1">Mã Voucher / Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-sky-800 outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/30"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Tên Chiến Dịch *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: HAPPY HOUR - THỨ 4 BÙNG NỔ"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/30"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mô Tả Chiến Dịch</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="VD: Giảm giá giờ chơi khung giờ vàng 12h - 17h hàng tuần..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Loại Chiết Khấu</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 outline-none focus:bg-white"
              >
                <option value="PERCENTAGE">% Giờ Chơi</option>
                <option value="FIXED_AMOUNT">Tiền Cố Định (VNĐ)</option>
                <option value="COMBO">Combo Đêm</option>
                <option value="FOOD_BEVERAGE">Giảm Giá F&amp;B</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Giá Trị Giảm {discountType === 'PERCENTAGE' ? '(%)' : '(VNĐ)'}
              </label>
              <input
                type="number"
                min="0"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Giảm Tối Đa (VNĐ)</label>
              <input
                type="number"
                value={maxDiscountAmount}
                onChange={(e) => setMaxDiscountAmount(e.target.value)}
                placeholder="VD: 50000 (để trống nếu không giới hạn)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Đơn Nạp Tối Thiểu (VNĐ)</label>
              <input
                type="number"
                value={minDepositAmount}
                onChange={(e) => setMinDepositAmount(e.target.value)}
                placeholder="VD: 100000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ngày Bắt Đầu</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ngày Kết Thúc</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ghi Chú Lịch</label>
              <input
                type="text"
                value={scheduleNote}
                onChange={(e) => setScheduleNote(e.target.value)}
                placeholder="VD: Thứ 4 Hàng Tuần"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Đối Tượng Áp Dụng</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 outline-none focus:bg-white"
              >
                <option value="ALL">Tất cả hội viên</option>
                <option value="VIP">VIP Only</option>
                <option value="NEWBIE">Tân thủ (Newbie)</option>
                <option value="NORMAL">Hội viên Thường</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Trạng Thái</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 outline-none focus:bg-white"
              >
                <option value="ACTIVE">Đang Hoạt Động</option>
                <option value="UPCOMING">Sắp Diễn Ra</option>
                <option value="ENDED">Đã Kết Thúc</option>
                <option value="SUSPENDED">Tạm Ngưng</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs transition"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg text-xs shadow-xs transition"
            >
              {isEdit ? 'Lưu Thay Đổi' : '+ Lưu Chiến Dịch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
