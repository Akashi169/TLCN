import React from 'react';
import { UserCheck, Phone } from 'lucide-react';

/**
 * ProfileAccountForm Component
 * Form fields for basic customer account specifications.
 * Allows customer to update full_name and phone cleanly without 'Chỉ đọc' badges.
 */
export default function ProfileAccountForm({ formData, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (onChange) {
      onChange(name, value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-cyan-600" />
          HỌ VÀ TÊN (FULL NAME)
        </label>
        <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-slate-200 transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-100 shadow-xs">
          <input
            name="full_name"
            onChange={handleInputChange}
            className="w-full bg-transparent text-sm md:text-base font-bold text-slate-900 outline-none placeholder:text-slate-400"
            type="text"
            value={formData?.full_name || ''}
            placeholder="vd: Nguyễn Văn A"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Phone className="w-4 h-4 text-cyan-600" />
          SỐ ĐIỆN THOẠI (PHONE)
        </label>
        <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-slate-200 transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-100 shadow-xs">
          <input
            name="phone"
            onChange={handleInputChange}
            className="w-full bg-transparent text-sm md:text-base font-bold text-slate-900 outline-none placeholder:text-slate-400"
            type="tel"
            value={formData?.phone || ''}
            placeholder="vd: +84 900 000 000"
          />
        </div>
      </div>
    </div>
  );
}
