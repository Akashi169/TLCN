import React, { useState } from 'react';
import { Monitor, X, Check } from 'lucide-react';

/**
 * CreateMachineModal component for adding new computers/stations to the fleet
 */
export default function CreateMachineModal({ isOpen = false, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    zoneId: 'zone-1',
    cpu: 'i7-14700KF',
    gpu: 'RTX 4070 Ti Super 16GB',
    ram: '32GB DDR5',
    bootImage: 'Win11-Pro-Cyber-v25.02'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-slate-200">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Khai Báo Máy Trạm Mới (Add PC)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Tự động đồng bộ PXE BootROM & Cấu hình vGPU
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-5 flex flex-col gap-4 text-xs font-semibold text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase font-bold text-slate-600">
                  Tên Máy Trạm (PC ID) *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="VD: VIP-15 hoặc ESP-08"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase font-bold text-slate-600">
                  Tĩnh IP Tĩnh (LAN) *
                </label>
                <input
                  type="text"
                  name="ip"
                  value={formData.ip}
                  onChange={handleChange}
                  required
                  placeholder="VD: 192.168.1.115"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-bold text-slate-600">
                Phân Khu Máy (Zone)
              </label>
              <select
                name="zoneId"
                value={formData.zoneId}
                onChange={handleChange}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 focus:outline-none cursor-pointer"
              >
                <option value="zone-1">Zone 1: Esports Pro Arena</option>
                <option value="zone-2">Zone 2: VIP Gaming Suite</option>
                <option value="zone-3">Zone 3: Tiêu Chuẩn Combat</option>
                <option value="zone-4">Zone 4: Stream Studio</option>
                <option value="zone-5">Zone 5: Cloud Remote Nodes</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase font-bold text-slate-600">
                  Card Đồ Họa (GPU)
                </label>
                <input
                  type="text"
                  name="gpu"
                  value={formData.gpu}
                  onChange={handleChange}
                  placeholder="RTX 4070 Ti Super 16GB"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase font-bold text-slate-600">
                  Bộ Vi Xử Lý (CPU)
                </label>
                <input
                  type="text"
                  name="cpu"
                  value={formData.cpu}
                  onChange={handleChange}
                  placeholder="Intel i7-14700KF"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-bold text-slate-600">
                Bản Mẫu BootImage (Diskless OS)
              </label>
              <input
                type="text"
                name="bootImage"
                value={formData.bootImage}
                onChange={handleChange}
                placeholder="Win11-Pro-Cyber-v25.02"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300/80 text-slate-800 font-bold rounded-lg text-xs transition-colors"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-lg text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Xác Nhận Tạo Máy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
