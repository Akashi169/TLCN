import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function CreateTopUpModal({ isOpen, onClose, onSubmit }) {
    const [customerInput, setCustomerInput] = useState('');
    const [amount, setAmount] = useState(50000);
    const [category, setCategory] = useState('Nạp Giờ Chơi');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    if (!isOpen) return null;

    const handleQuickAmount = (val) => {
        setAmount((prev) => prev + val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        if (!customerInput.trim()) {
            setErrorMsg('Vui lòng nhập số điện thoại, tên tài khoản hoặc tên máy trạm!');
            return;
        }
        if (amount < 10000) {
            setErrorMsg('Số tiền nạp tối thiểu là 10,000 ₫!');
            return;
        }

        try {
            setSubmitting(true);
            await onSubmit({
                customer_identifier: customerInput,
                amount: Number(amount),
                category,
                payment_method: paymentMethod,
                notes
            });
            // Reset form
            setCustomerInput('');
            setAmount(50000);
            setNotes('');
            onClose();
        } catch (err) {
            setErrorMsg(err?.response?.data?.message || err?.message || 'Lỗi khi ghi nhận nạp tiền tại quầy.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 border border-slate-100 animate-in fade-in zoom-in-95">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg text-slate-900">Nạp Tiền Giờ & Dịch Vụ</span>
                            <span className="text-xs text-slate-500">Quầy Thu Ngân Trung Tâm - Giao Dịch Trực Tiếp</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Customer Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                            Tài Khoản Khách Hàng / Số Điện Thoại / Máy Trạm <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={customerInput}
                            onChange={(e) => setCustomerInput(e.target.value)}
                            placeholder="Nhập SĐT hoặc tên tài khoản (VD: 0912345678, PC-VIP-04)"
                            required
                            className="w-full px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 border border-slate-200 font-mono"
                        />
                    </div>

                    {/* Amount Input & Presets */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                            Số Tiền Nạp (₫) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="10000"
                                step="5000"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                required
                                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-lg text-slate-900 font-mono text-xl font-bold focus:bg-white focus:outline-none border border-slate-200"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 mt-1">
                            <button
                                type="button"
                                onClick={() => handleQuickAmount(30000)}
                                className="py-1.5 rounded bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 text-xs font-mono font-semibold transition-colors border border-slate-200"
                            >
                                +30,000
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickAmount(50000)}
                                className="py-1.5 rounded bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 text-xs font-mono font-semibold transition-colors border border-slate-200"
                            >
                                +50,000
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickAmount(100000)}
                                className="py-1.5 rounded bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 text-xs font-mono font-semibold transition-colors border border-slate-200"
                            >
                                +100,000
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickAmount(200000)}
                                className="py-1.5 rounded bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 text-xs font-mono font-semibold transition-colors border border-slate-200"
                            >
                                +200,000
                            </button>
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Khoản Mục</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-900 focus:outline-none border border-slate-200 font-medium"
                        >
                            <option value="Nạp Giờ Chơi">Nạp Giờ Chơi (PC Time)</option>
                            <option value="Dịch Vụ F&B">Dịch Vụ F&B (Đồ Ăn & Nước)</option>
                            <option value="Combo Đêm">Combo Đêm (Overnight Pack)</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">Phương Thức Thanh Toán</label>
                        <div className="grid grid-cols-3 gap-2">
                            <label className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                                paymentMethod === 'cash' ? 'bg-sky-50 border-sky-500 text-sky-700 font-semibold shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}>
                                <input
                                    type="radio"
                                    name="pm"
                                    value="cash"
                                    checked={paymentMethod === 'cash'}
                                    onChange={() => setPaymentMethod('cash')}
                                    className="hidden"
                                />
                                <Banknote className="w-4 h-4 text-amber-600" />
                                <span className="text-xs">Tiền Mặt</span>
                            </label>

                            <label className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                                paymentMethod === 'vietqr' ? 'bg-sky-50 border-sky-500 text-sky-700 font-semibold shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}>
                                <input
                                    type="radio"
                                    name="pm"
                                    value="vietqr"
                                    checked={paymentMethod === 'vietqr'}
                                    onChange={() => setPaymentMethod('vietqr')}
                                    className="hidden"
                                />
                                <QrCode className="w-4 h-4 text-sky-600" />
                                <span className="text-xs">VietQR Pro</span>
                            </label>

                            <label className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                                paymentMethod === 'pos' ? 'bg-sky-50 border-sky-500 text-sky-700 font-semibold shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}>
                                <input
                                    type="radio"
                                    name="pm"
                                    value="pos"
                                    checked={paymentMethod === 'pos'}
                                    onChange={() => setPaymentMethod('pos')}
                                    className="hidden"
                                />
                                <CreditCard className="w-4 h-4 text-indigo-600" />
                                <span className="text-xs">Thẻ POS</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-200 transition-colors"
                        >
                            Hủy Bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 rounded-lg bg-sky-600 text-white font-semibold text-sm shadow-md hover:bg-sky-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Xác Nhận Thu Tiền</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
