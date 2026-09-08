import React, { useState } from 'react';

/**
 * CreateMemberModal component for adding new members
 */
export default function CreateMemberModal({ isOpen = false, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '123456',
    phone: '',
    tier: 'normal',
    deposit: 50000,
    smsActive: true
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      id="modal-create-member"
    >
      <div className="bg-surface-container-lowest rounded-xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface block">
                Tạo Tài Khoản Hội Viên Mới
              </span>
              <span className="block font-label-xs text-label-xs text-on-surface-variant">
                Hệ thống đồng bộ BootROM và Cloud Gaming
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
            id="modal-close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-space-lg flex flex-col gap-space-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-semibold">
                  Tên đăng nhập (Username) *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="px-space-md py-2 bg-surface-container-low text-body-sm font-body-sm rounded-lg text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="VD: cyber_gamer01"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-semibold">
                  Họ và Tên Hội Viên *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="px-space-md py-2 bg-surface-container-low text-body-sm font-body-sm rounded-lg text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="VD: Trần Anh Dũng"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-semibold">
                  Mật khẩu ban đầu *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="px-space-md py-2 bg-surface-container-low text-body-sm font-body-sm rounded-lg text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-semibold">
                  Số điện thoại liên kết
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-space-md py-2 bg-surface-container-low text-body-sm font-body-sm rounded-lg text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="VD: 0912 xxx xxx"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-semibold">
                  Hạng Thành Viên
                </label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleChange}
                  className="px-space-md py-2 bg-surface-container-low text-body-sm font-body-sm rounded-lg text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  <option value="normal">🎮 Normal Standard (Mặc định)</option>
                  <option value="gold">⭐ VIP Gold (+10% Bonus nạp)</option>
                  <option value="diamond">💎 VIP Diamond (Ghế riêng & Free F&B)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-semibold">
                  Nạp ban đầu (VNĐ)
                </label>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleChange}
                  className="px-space-md py-2 bg-surface-container-low text-body-sm font-body-sm rounded-lg text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="p-space-md bg-surface-container-low rounded-lg flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-space-xs font-label-xs text-label-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  notifications_active
                </span>
                <span>Tự động kích hoạt thông báo qua SMS / Zalo ZNS</span>
              </div>
              <input
                type="checkbox"
                name="smsActive"
                checked={formData.smsActive}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-primary cursor-pointer"
              />
            </div>
          </div>

          <div className="p-space-lg bg-surface-container-low flex items-center justify-end gap-space-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm font-medium rounded-lg transition-colors"
              id="modal-cancel"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="px-space-lg py-2 bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1"
              id="modal-submit"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              Kích Hoạt Tài Khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
