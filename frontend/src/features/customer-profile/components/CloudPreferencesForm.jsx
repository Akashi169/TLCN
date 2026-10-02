import React from 'react';
import { Sliders } from 'lucide-react';

/**
 * CloudPreferencesForm Component
 * Single Responsibility: Manages Cloud Gaming Preferences form controls (Resolution, Bitrate, HDR, Ray Tracing, Audio)
 */
export default function CloudPreferencesForm({ cloudPreferences, onChange }) {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (onChange) {
      onChange(name, value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (onChange) {
      onChange(name, checked);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-50/60 rounded-xl mt-2 border border-slate-200/60">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-cyan-600" />
          Cài Đặt Cloud Gaming
        </span>
        <span className="text-[11px] text-cyan-700 font-semibold font-mono uppercase tracking-wider">
          Cloud Gaming Preferences
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Resolution & Refresh Rate */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Độ phân giải &amp; Tần số quét
          </span>
          <div className="relative flex items-center bg-white rounded-lg px-3.5 py-2 shadow-xs border border-slate-200/80">
            <select
              name="preferred_resolution"
              value={cloudPreferences?.preferred_resolution || '4K UHD • 144 FPS (Ultra Low Latency)'}
              onChange={handleSelectChange}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="4K UHD • 144 FPS (Ultra Low Latency)">4K UHD • 144 FPS (Ultra Low Latency)</option>
              <option value="2K QHD • 165 FPS (Competitive)">2K QHD • 165 FPS (Competitive)</option>
              <option value="1080p FHD • 240 FPS (Esports Max)">1080p FHD • 240 FPS (Esports Max)</option>
            </select>
          </div>
        </div>

        {/* Target Bitrate */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Băng thông truyền tải (Target Bitrate)
          </span>
          <div className="relative flex items-center bg-white rounded-lg px-3.5 py-2 shadow-xs border border-slate-200/80">
            <select
              name="target_bitrate"
              value={cloudPreferences?.target_bitrate || '50 Mbps - Cực cao (Khuyến nghị 4K)'}
              onChange={handleSelectChange}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="50 Mbps - Cực cao (Khuyến nghị 4K)">50 Mbps - Cực cao (Khuyến nghị 4K)</option>
              <option value="35 Mbps - Chuẩn cao cấp">35 Mbps - Chuẩn cao cấp</option>
              <option value="20 Mbps - Tiết kiệm băng thông">20 Mbps - Tiết kiệm băng thông</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer border border-slate-200/80 hover:border-cyan-400 hover:shadow-xs transition-all">
          <input
            name="hdr_enabled"
            checked={Boolean(cloudPreferences?.hdr_enabled)}
            onChange={handleCheckboxChange}
            className="w-4 h-4 rounded text-cyan-600 accent-cyan-600 cursor-pointer"
            type="checkbox"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">HDR10 Pro</span>
            <span className="text-[11px] text-slate-500">10-bit Color Profile</span>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer border border-slate-200/80 hover:border-cyan-400 hover:shadow-xs transition-all">
          <input
            name="ray_tracing_enabled"
            checked={Boolean(cloudPreferences?.ray_tracing_enabled)}
            onChange={handleCheckboxChange}
            className="w-4 h-4 rounded text-cyan-600 accent-cyan-600 cursor-pointer"
            type="checkbox"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">Ray Tracing</span>
            <span className="text-[11px] text-slate-500">DLSS 3.5 Frame Gen</span>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer border border-slate-200/80 hover:border-cyan-400 hover:shadow-xs transition-all">
          <input
            name="direct_audio_enabled"
            checked={Boolean(cloudPreferences?.direct_audio_enabled)}
            onChange={handleCheckboxChange}
            className="w-4 h-4 rounded text-cyan-600 accent-cyan-600 cursor-pointer"
            type="checkbox"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">Direct Audio</span>
            <span className="text-[11px] text-slate-500">Dolby Atmos 7.1</span>
          </div>
        </label>
      </div>
    </div>
  );
}
