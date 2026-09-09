import React, { useState } from 'react';
import { Search, Download, RefreshCw, PlusCircle, LayoutList, LayoutGrid } from 'lucide-react';

/**
 * MachineFilterBar component for search, filters, actions, and view switcher
 * Built with clean flexbox alignment and responsive layout
 */
export default function MachineFilterBar({
  searchQuery = '',
  onSearchChange,
  zoneFilter = 'all',
  onZoneChange,
  statusFilter = 'all',
  onStatusChange,
  hardwareFilter = 'all',
  onHardwareChange,
  viewMode = 'table',
  onViewModeChange,
  onOpenCreateModal,
  onSyncBootrom
}) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncClick = () => {
    setIsSyncing(true);
    if (onSyncBootrom) onSyncBootrom();
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-slate-200/90">
      {/* Left Group: Search Input & Filter Dropdowns */}
      <div className="flex items-center gap-3 flex-wrap flex-1">
        {/* Search Box */}
        <div className="relative min-w-[240px] flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Tìm PC ID, MAC, IP, tên khách hoặc game..."
            className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/30 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold text-slate-500 px-1.5 py-0.5 bg-slate-200/70 rounded pointer-events-none">
            ⌘K
          </span>
        </div>

        {/* Zone Dropdown */}
        <div className="relative">
          <select
            value={zoneFilter}
            onChange={(e) => onZoneChange && onZoneChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 text-slate-900 text-xs font-extrabold rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/30 cursor-pointer transition-all"
          >
            <option value="all">Tất cả phân khu (All Zones)</option>
            <option value="zone-1">Zone 1: Esports Pro Arena</option>
            <option value="zone-2">Zone 2: VIP Gaming Suite</option>
            <option value="zone-3">Zone 3: Tiêu Chuẩn Combat</option>
            <option value="zone-4">Zone 4: Stream Studio</option>
            <option value="zone-5">Zone 5: Cloud Remote Nodes</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 text-slate-900 text-xs font-extrabold rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/30 cursor-pointer transition-all"
          >
            <option value="all">Tất cả trạng thái (All Statuses)</option>
            <option value="online">🟢 Online (Sẵn sàng)</option>
            <option value="in-use">🔵 Đang sử dụng (In Use)</option>
            <option value="reserved">🟣 Đặt trước (Reserved)</option>
            <option value="maintenance">🔴 Bảo trì (Maintenance)</option>
            <option value="offline">⚪ Offline (Tắt nguồn)</option>
          </select>
        </div>

        {/* Hardware Filter */}
        <div className="relative">
          <select
            value={hardwareFilter}
            onChange={(e) => onHardwareChange && onHardwareChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 text-slate-900 text-xs font-extrabold rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/30 cursor-pointer transition-all"
          >
            <option value="all">Cấu hình: Tất cả GPU</option>
            <option value="rtx-4090">GeForce RTX 4090 (24GB)</option>
            <option value="rtx-4080">GeForce RTX 4080 (16GB)</option>
            <option value="rtx-4070ti">RTX 4070 Ti Super (16GB)</option>
            <option value="rtx-4060">GeForce RTX 4060 (8GB)</option>
          </select>
        </div>
      </div>

      {/* Right Group: Action Buttons & View Switcher */}
      <div className="flex items-center gap-2.5 shrink-0 flex-wrap self-start xl:self-center">
        <button
          type="button"
          onClick={() => alert('Xuất báo cáo danh sách máy xuất thành công!')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200/70 text-slate-800 font-extrabold rounded-lg text-xs transition-all border border-slate-200/90 shadow-2xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-600" />
          <span className="hidden sm:inline">Xuất Báo Cáo</span>
        </button>

        <button
          type="button"
          onClick={handleSyncClick}
          className={`flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200/70 text-slate-800 font-extrabold rounded-lg text-xs transition-all border border-slate-200/90 shadow-2xs cursor-pointer ${
            isSyncing ? 'opacity-75' : ''
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 text-sky-600 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Đồng Bộ BootROM</span>
        </button>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-lg text-xs shadow-xs transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>+ Thêm Máy Mới</span>
        </button>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => onViewModeChange && onViewModeChange('table')}
            className={`px-3 py-1 rounded-md flex items-center gap-1 text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Xem dạng bảng chi tiết"
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Bảng</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange && onViewModeChange('grid')}
            className={`px-3 py-1 rounded-md flex items-center gap-1 text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Xem dạng lưới phòng"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Lưới</span>
          </button>
        </div>
      </div>
    </div>
  );
}
