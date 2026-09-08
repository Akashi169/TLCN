import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../widgets/header/Header';
import Sidebar from '../../widgets/sidebar/Sidebar';
import Footer from '../../widgets/footer/Footer';

// Machine FSD UI Components & Data
import machineService from '../../shared/api/machine.service';
import { MOCK_MACHINES, MOCK_MACHINE_METRICS } from '../../features/machines/model/mockMachinesData';
import MachineKpiCards from '../../features/machines/ui/MachineKpiCards';
import MachineFilterBar from '../../features/machines/ui/MachineFilterBar';
import MachineBulkActionBar from '../../features/machines/ui/MachineBulkActionBar';
import MachineTable from '../../features/machines/ui/MachineTable';
import MachinePagination from '../../features/machines/ui/MachinePagination';
import CreateMachineModal from '../../features/machines/ui/CreateMachineModal';

// Station Card Grid View
import StationCard from '../../entities/station/ui/StationCard';

/**
 * MachineManagementPage (Quản lý Danh Sách Máy Trạm - Fleet Management)
 * Built with FSD Architecture, Clean Code & DRY Principles
 */
export default function MachineManagementPage({ user, onLogout }) {
  const [machines, setMachines] = useState(MOCK_MACHINES);
  const [metrics, setMetrics] = useState(MOCK_MACHINE_METRICS);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hardwareFilter, setHardwareFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Auto-fetch machines from Backend API on mount
  useEffect(() => {
    const fetchMachineData = async () => {
      const data = await machineService.getMachines();
      if (data && data.length > 0) {
        setMachines(data);
      }
    };
    fetchMachineData();
  }, []);

  // Filtered Machines Calculation
  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      // Search
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        m.id.toLowerCase().includes(query) ||
        m.ip.includes(query) ||
        (m.userName && m.userName.toLowerCase().includes(query)) ||
        (m.currentGame && m.currentGame.toLowerCase().includes(query)) ||
        (m.cpu && m.cpu.toLowerCase().includes(query)) ||
        (m.gpu && m.gpu.toLowerCase().includes(query));

      // Zone filter
      const matchZone = zoneFilter === 'all' || m.zoneId === zoneFilter;

      // Status filter
      const matchStatus = statusFilter === 'all' || m.status === statusFilter;

      // Hardware GPU filter
      let matchHardware = true;
      if (hardwareFilter !== 'all') {
        const gpuQuery = hardwareFilter.replace('rtx-', 'rtx ').toLowerCase();
        matchHardware = m.gpu.toLowerCase().includes(gpuQuery);
      }

      return matchSearch && matchZone && matchStatus && matchHardware;
    });
  }, [machines, searchQuery, zoneFilter, statusFilter, hardwareFilter]);

  // Handle Multi-Selection
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredMachines.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMachines.map((m) => m.id));
    }
  };

  // Actions
  const handleRebootSelected = () => {
    alert(`Đã gửi lệnh Reboot khởi động lại cho ${selectedIds.length} máy trạm!`);
    setSelectedIds([]);
  };

  const handleMaintenanceSelected = () => {
    setMachines((prev) =>
      prev.map((m) =>
        selectedIds.includes(m.id)
          ? {
              ...m,
              status: 'maintenance',
              statusLabel: 'Bảo trì',
              cleanStatus: 'Đang kiểm tra bảo trì thủ công'
            }
          : m
      )
    );
    setSelectedIds([]);
  };

  const handleAssignZoneSelected = () => {
    const newZone = window.prompt('Nhập mã Phân khu mới (VD: zone-1, zone-2, zone-3):', 'zone-2');
    if (newZone) {
      setMachines((prev) =>
        prev.map((m) =>
          selectedIds.includes(m.id)
            ? { ...m, zoneId: newZone, zoneName: `Zone ${newZone.replace('zone-', '')}` }
            : m
        )
      );
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Xóa ${selectedIds.length} máy trạm khỏi danh sách quản lý?`)) {
      setMachines((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      setSelectedIds([]);
    }
  };

  const handleCreateMachine = (newMachineData) => {
    const newMachine = {
      id: newMachineData.name || `PC-${Math.floor(10 + Math.random() * 90)}`,
      numericId: String(Math.floor(10 + Math.random() * 90)),
      ip: newMachineData.ip || '192.168.1.150',
      port: 'Port #15',
      zoneId: newMachineData.zoneId || 'zone-1',
      zoneName: `Zone ${newMachineData.zoneId?.replace('zone-', '') || '1'}`,
      zoneIcon: 'grid_view',
      cpu: newMachineData.cpu || 'i7-14700KF',
      gpu: newMachineData.gpu || 'RTX 4070 Ti Super 16GB',
      ram: '32GB DDR5',
      bootImage: newMachineData.bootImage || 'Win11-Pro-Cyber-v25.02',
      userName: null,
      cleanStatus: 'Mới đăng ký thành công',
      status: 'online',
      statusLabel: 'Online (Sẵn sàng)'
    };

    setMachines((prev) => [newMachine, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      totalMachines: prev.totalMachines + 1,
      onlineCount: prev.onlineCount + 1
    }));
  };

  return (
    <div className="bg-background font-sans text-slate-900 antialiased min-h-screen">
      {/* Header */}
      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={onLogout}
      />

      {/* Sidebar with activeNav set to 'hardware' */}
      <Sidebar activeNav="hardware" bootromStatus="ONLINE" role="ADMIN" />

      {/* Main Content */}
      <div className="pl-[240px]">
        <main className="relative pt-16 min-h-screen bg-slate-50/50 w-full px-6 py-6 pb-24 flex flex-col justify-between">
          <div className="flex flex-col w-full gap-6">
            {/* Top Breadcrumb & Page Header */}
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
                  <span className="text-slate-900 font-extrabold">Danh Sách Máy Trạm</span>
                </div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-1">
                  Quản Lý Danh Sách Máy Trạm
                  <span className="bg-sky-100 text-sky-900 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Fleet v4.6
                  </span>
                </h1>
                <p className="text-xs text-slate-600 max-w-3xl font-medium">
                  Hệ thống giám sát, phân bổ phân khu phần cứng và điều phối {metrics.totalMachines} trạm máy BootROM / Cloud vGPU theo thời gian thực.
                </p>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <MachineKpiCards
              metrics={metrics}
              selectedStatus={statusFilter}
              onSelectStatus={setStatusFilter}
            />

            {/* Filter & Control Toolbar */}
            <MachineFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              zoneFilter={zoneFilter}
              onZoneChange={setZoneFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              hardwareFilter={hardwareFilter}
              onHardwareChange={setHardwareFilter}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenCreateModal={() => setIsModalOpen(true)}
              onSyncBootrom={() => alert('Đã đồng bộ lại danh sách đĩa BootROM SAN!')}
            />

            {/* Bulk Action Bar */}
            <MachineBulkActionBar
              selectedCount={selectedIds.length}
              onReboot={handleRebootSelected}
              onMaintenance={handleMaintenanceSelected}
              onAssignZone={handleAssignZoneSelected}
              onDelete={handleDeleteSelected}
              onClearSelection={() => setSelectedIds([])}
            />

            {/* Content: Table View or Grid View */}
            {viewMode === 'table' ? (
              <MachineTable
                machines={filteredMachines}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
                onLiveMirror={(id) => alert(`Đang kết nối Live Mirror xem màn hình máy ${id}...`)}
                onEdit={(id) => alert(`Chỉnh sửa cấu hình máy ${id}`)}
                onDelete={(id) => {
                  if (window.confirm(`Xóa máy ${id} khỏi danh sách?`)) {
                    setMachines((prev) => prev.filter((m) => m.id !== id));
                    setSelectedIds((prev) => prev.filter((item) => item !== id));
                  }
                }}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3.5 bg-white p-4 rounded-xl border border-slate-200">
                {filteredMachines.map((m) => (
                  <StationCard
                    key={m.id}
                    station={{
                      id: m.id,
                      user: m.userName,
                      game: m.currentGame || m.cleanStatus,
                      type: m.status === 'online' ? 'ready' : m.status === 'maintenance' ? 'maint' : m.status === 'in-use' ? 'local' : 'ready',
                      time: m.sessionTime ? m.sessionTime.split('/')[0].trim() : '00:00',
                      latency: m.ip
                    }}
                    onClick={() => alert(`Chi tiết máy ${m.id}`)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <MachinePagination
              currentPage={currentPage}
              totalPages={15}
              pageSize={pageSize}
              totalItems={metrics.totalMachines}
              selectedCount={selectedIds.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Create Machine Modal */}
      <CreateMachineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMachine}
      />
    </div>
  );
}
