import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../../widgets/header/Header';
import Sidebar from '../../widgets/sidebar/Sidebar';
import Footer from '../../widgets/footer/Footer';

// Hardware Config Service, Components & Models
import hardwareService from '../../shared/api/hardwareService';
import {
  MOCK_HARDWARE_METRICS,
  MOCK_HARDWARE_SPECS,
  MOCK_HARDWARE_DIAGNOSTICS
} from '../../features/hardware-config/model/mockHardwareData';
import HardwareKpiBento from '../../features/hardware-config/ui/HardwareKpiBento';
import HardwareFilterBar from '../../features/hardware-config/ui/HardwareFilterBar';
import HardwareSpecsTable from '../../features/hardware-config/ui/HardwareSpecsTable';
import HardwareDiagnostics from '../../features/hardware-config/ui/HardwareDiagnostics';
import HardwareTelemetryModal from '../../features/hardware-config/ui/HardwareTelemetryModal';
import CreateHardwareModal from '../../features/hardware-config/ui/CreateHardwareModal';
import EditHardwareModal from '../../features/hardware-config/ui/EditHardwareModal';

/**
 * ManageConfigPage (Quản Lý Cấu Hình Máy & BootROM SAN Telemetry)
 * Built with FSD Architecture, Clean Code & DRY Principles
 */
export default function ManageConfigPage({ user, onLogout }) {
  const [specs, setSpecs] = useState(MOCK_HARDWARE_SPECS);
  const [metrics, setMetrics] = useState(MOCK_HARDWARE_METRICS);
  const [diagnostics, setDiagnostics] = useState(MOCK_HARDWARE_DIAGNOSTICS);
  const [zones, setZones] = useState([]);
  const [computers, setComputers] = useState([]);
  const [hardwarePresets, setHardwarePresets] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedTelemetry, setSelectedTelemetry] = useState(null);
  const [selectedHardwareForEdit, setSelectedHardwareForEdit] = useState(null);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch real specs & zone & computer & presets data from Backend API on mount
  const fetchHardwareData = useCallback(async () => {
    const result = await hardwareService.getHardwareSpecs();
    if (result) {
      if (result.specs && result.specs.length > 0) setSpecs(result.specs);
      if (result.metrics) setMetrics(result.metrics);
      if (result.diagnostics) setDiagnostics(result.diagnostics);
      if (result.zones) setZones(result.zones);
      if (result.computers) setComputers(result.computers);
      if (result.hardwarePresets) setHardwarePresets(result.hardwarePresets);
    }
  }, []);

  useEffect(() => {
    fetchHardwareData();
  }, [fetchHardwareData]);

  // Global keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="⌘K"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered Specs Calculation
  const filteredSpecs = useMemo(() => {
    return specs.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        (item.profileName && item.profileName.toLowerCase().includes(query)) ||
        (item.cpu?.model && item.cpu.model.toLowerCase().includes(query)) ||
        (item.gpu?.model && item.gpu.model.toLowerCase().includes(query)) ||
        (item.ram?.capacity && item.ram.capacity.toLowerCase().includes(query)) ||
        (item.storage?.type && item.storage.type.toLowerCase().includes(query));

      const matchZone = zoneFilter === 'all' || String(item.zoneId) === String(zoneFilter);
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchSearch && matchZone && matchStatus;
    });
  }, [specs, searchQuery, zoneFilter, statusFilter]);

  // Handlers
  const handleOpenTelemetry = (hardwareItem) => {
    setSelectedTelemetry(hardwareItem);
    setIsTelemetryModalOpen(true);
  };

  const handleEdit = (hardwareItem) => {
    setSelectedHardwareForEdit(hardwareItem);
    setIsEditModalOpen(true);
  };

  const handleSaveEditHardware = async (updatedItem) => {
    try {
      await hardwareService.updateHardwareSpec(updatedItem.id, updatedItem);
      setSpecs((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      await fetchHardwareData();
    } catch (err) {
      console.error('Lỗi khi cập nhật mẫu cấu hình máy:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa mẫu cấu hình phần cứng ${id}?`)) {
      try {
        await hardwareService.deleteHardwareSpec(id);
        setSpecs((prev) => prev.filter((item) => item.id !== id));
        await fetchHardwareData();
      } catch (err) {
        console.error('Lỗi khi xóa mẫu cấu hình máy:', err);
      }
    }
  };

  const handleCreateHardware = async (newHardware) => {
    try {
      await hardwareService.createHardwareSpec(newHardware);
      setSpecs((prev) => [newHardware, ...prev]);
      await fetchHardwareData();
    } catch (err) {
      console.error('Lỗi khi tạo mẫu cấu hình máy:', err);
    }
  };

  const handleExportReport = () => {
    const headers = ['Tên Cấu Hình / Mã Máy', 'Phân Khu', 'Status', 'CPU Model', 'RAM', 'GPU', 'Storage', 'Màn hình', 'Peripherals'];
    const csvRows = [
      headers.join(','),
      ...filteredSpecs.map((item) =>
        [
          `"${item.profileName || item.id}"`,
          `"${item.zoneName}"`,
          `"${item.statusLabel || item.status}"`,
          `"${item.cpu?.model || ''}"`,
          `"${item.ram?.capacity || ''}"`,
          `"${item.gpu?.model || ''}"`,
          `"${item.storage?.type || ''}"`,
          `"${item.monitor || ''}"`,
          `"${item.gear || ''}"`
        ].join(',')
      )
    ];

    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hardware_fleet_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50/50 font-sans text-slate-900 antialiased min-h-screen">
      {/* Shared Header Widget */}
      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={onLogout}
      />

      {/* Shared Sidebar Widget with activeNav='config' */}
      <Sidebar activeNav="config" bootromStatus="ONLINE" role="ADMIN" />

      {/* Main Content Area */}
      <div className="pl-[240px]">
        <main className="relative pt-16 min-h-screen bg-slate-50/50 w-full px-6 py-6 pb-24 flex flex-col justify-between">
          <div className="flex flex-col w-full gap-6">
            {/* Page Header & Breadcrumbs */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <span className="flex items-center gap-1 hover:text-sky-600 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[16px] text-slate-500">home</span>
                    Cơ Sở Hạ Tầng
                  </span>
                  <span className="text-slate-400 font-bold">/</span>
                  <span>Phòng Máy &amp; Thiết Bị</span>
                  <span className="text-slate-400 font-bold">/</span>
                  <span className="text-slate-900 font-extrabold">Cấu Hình Máy</span>
                </div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-1">
                  Quản Lý Cấu Hình Phần Cứng &amp; BootROM
                  <span className="bg-sky-100 text-sky-900 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Hardware OS v4.6
                  </span>
                </h1>
                <p className="text-xs text-slate-600 max-w-3xl font-medium">
                  Giám sát chi tiết thông số chip CPU, card GPU, bộ nhớ RAM và điều phối hạ tầng BootROM SAN 10Gbps thời gian thực.
                </p>
              </div>
            </div>

            {/* Telemetry Summary Bento Grid */}
            <HardwareKpiBento metrics={metrics} />

            {/* Filter Matrix & CTA Toolbar */}
            <HardwareFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              zoneFilter={zoneFilter}
              onZoneChange={setZoneFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onExportReport={handleExportReport}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              zones={zones}
            />

            {/* High-Density Hardware Inventory Table */}
            <HardwareSpecsTable
              specs={filteredSpecs}
              onOpenTelemetry={handleOpenTelemetry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Telemetry Diagnostics Peek Section */}
            <HardwareDiagnostics diagnostics={diagnostics} />
          </div>

          {/* Shared Footer Widget */}
          <Footer />
        </main>
      </div>

      {/* Modals */}
      <HardwareTelemetryModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
        hardware={selectedTelemetry}
      />

      <CreateHardwareModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateHardware}
        zones={zones}
        computers={computers}
        hardwarePresets={hardwarePresets}
      />

      <EditHardwareModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveEditHardware}
        hardware={selectedHardwareForEdit}
        zones={zones}
        computers={computers}
        hardwarePresets={hardwarePresets}
      />
    </div>
  );
}
