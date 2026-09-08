import React, { useState } from 'react';
import { X, Cpu, MemoryStick, Gamepad2, HardDrive, PlusCircle } from 'lucide-react';

export default function CreateHardwareModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    zoneId: 'z1',
    cpuModel: '',
    cpuSpecs: '',
    ramCapacity: '',
    ramSpecs: '',
    gpuModel: '',
    gpuEdition: '',
    storageType: '',
    storageSpecs: '',
    status: 'online'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id.trim()) {
      alert('Vui lòng nhập mã máy (Ví dụ: ESP-05, VIP-03)');
      return;
    }

    const zoneMap = {
      z1: 'Zone 1 - Thi Đấu Esports',
      z2: 'Zone 2 - VIP Gaming Pro',
      z3: 'Zone 3 - Standard Combat',
      z4: 'Zone 4 - Stream Studio',
      z5: 'Zone 5 - Cloud Host'
    };

    const newHardware = {
      id: formData.id.toUpperCase(),
      numericId: formData.id.replace(/\D/g, '') || '99',
      status: formData.status,
      statusLabel: formData.status === 'online' ? 'Online' : formData.status === 'ready' ? 'Sẵn sàng (Standby)' : 'Bảo trì',
      zoneId: formData.zoneId,
      zoneName: zoneMap[formData.zoneId] || 'Zone 1',
      zoneColor: 'sky',
      cpu: {
        model: formData.cpuModel,
        specs: formData.cpuSpecs
      },
      ram: {
        capacity: formData.ramCapacity,
        specs: formData.ramSpecs
      },
      gpu: {
        model: formData.gpuModel,
        edition: formData.gpuEdition
      },
      storage: {
        type: formData.storageType,
        specs: formData.storageSpecs
      },
      telemetry: {
        cpuTemp: 48,
        gpuTemp: 45,
        fanSpeed: '50%',
        sanPing: '0.20ms'
      }
    };

    if (onSubmit) onSubmit(newHardware);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Thêm Cấu Hình Máy Mới
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Đăng ký thông số CPU, RAM, GPU &amp; BootROM SAN vào Fleet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mã Trạm Máy *</label>
              <input
                type="text"
                required
                placeholder="VD: ESP-09, VIP-05..."
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phân Khu (Zone) *</label>
              <select
                value={formData.zoneId}
                onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 outline-none"
              >
                <option value="z1">Zone 1 - Thi Đấu Esports</option>
                <option value="z2">Zone 2 - VIP Gaming Pro</option>
                <option value="z3">Zone 3 - Standard Combat</option>
                <option value="z4">Zone 4 - Stream Studio</option>
                <option value="z5">Zone 5 - Cloud Host</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-sky-600" /> Tên Model CPU
              </label>
              <input
                type="text"
                placeholder="VD: Intel Core i7-14700K"
                value={formData.cpuModel}
                onChange={(e) => setFormData({ ...formData, cpuModel: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Gamepad2 className="w-3.5 h-3.5 text-indigo-600" /> Card GPU
              </label>
              <input
                type="text"
                placeholder="VD: RTX 4070 Ti Super 16GB"
                value={formData.gpuModel}
                onChange={(e) => setFormData({ ...formData, gpuModel: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MemoryStick className="w-3.5 h-3.5 text-purple-600" /> Dung Lượng RAM
              </label>
              <input
                type="text"
                placeholder="VD: 32GB DDR5"
                value={formData.ramCapacity}
                onChange={(e) => setFormData({ ...formData, ramCapacity: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-600" /> Loại Lưu Trữ / SAN Boot
              </label>
              <input
                type="text"
                placeholder="VD: SAN NVMe 10Gbps"
                value={formData.storageType}
                onChange={(e) => setFormData({ ...formData, storageType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500/30 outline-none"
              />
            </div>
          </div>

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
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-lg text-xs shadow-xs transition"
            >
              + Tạo Cấu Hình
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
