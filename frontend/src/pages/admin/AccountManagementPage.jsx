import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../widgets/header/Header';
import Sidebar from '../../widgets/sidebar/Sidebar';
import Footer from '../../widgets/footer/Footer';

// Member Service & FSD UI Components
import memberService from '../../shared/api/member.service';
import { MOCK_MEMBERS, MOCK_MEMBER_METRICS } from '../../features/members/model/mockMembersData';
import MemberKpiCards from '../../features/members/ui/MemberKpiCards';
import MemberFilterBar from '../../features/members/ui/MemberFilterBar';
import MemberBulkActionBar from '../../features/members/ui/MemberBulkActionBar';
import MemberTable from '../../features/members/ui/MemberTable';
import MemberPagination from '../../features/members/ui/MemberPagination';
import CreateMemberModal from '../../features/members/ui/CreateMemberModal';

/**
 * AccountManagementPage (Quản lý Hội viên Cyber)
 * Built with FSD Architecture, Clean Code & DRY Principles
 */
export default function AccountManagementPage({ user, onLogout }) {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [metrics, setMetrics] = useState(MOCK_MEMBER_METRICS);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Auto-fetch members from Backend Service on mount
  useEffect(() => {
    const fetchMemberData = async () => {
      const data = await memberService.getMembers();
      if (data && data.length > 0) {
        setMembers(data);
      }
    };
    fetchMemberData();
  }, []);

  // Filtered members calculation
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        m.name.toLowerCase().includes(query) ||
        m.uid.toLowerCase().includes(query) ||
        (m.email && m.email.toLowerCase().includes(query)) ||
        (m.phone && m.phone.includes(query)) ||
        (m.username && m.username.toLowerCase().includes(query));

      // Tier match
      const matchTier = tierFilter === 'all' || m.tier === tierFilter;

      // Status match
      let matchStatus = true;
      if (statusFilter === 'playing-local') {
        matchStatus = m.status === 'playing' && !m.stationDetail?.includes('Cloud');
      } else if (statusFilter === 'playing-remote') {
        matchStatus = m.status === 'playing' && m.stationDetail?.includes('Cloud');
      } else if (statusFilter === 'idle') {
        matchStatus = m.status === 'idle';
      } else if (statusFilter === 'offline') {
        matchStatus = m.status === 'offline';
      } else if (statusFilter === 'locked') {
        matchStatus = m.status === 'locked';
      }

      return matchSearch && matchTier && matchStatus;
    });
  }, [members, searchQuery, tierFilter, statusFilter]);

  // Handle Multi-Selection
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredMembers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMembers.map((m) => m.id));
    }
  };

  // Quick Action Handlers
  const handleQuickDeposit = (id) => {
    const member = members.find((m) => m.id === id);
    const amountStr = window.prompt(`Nạp tiền cho hội viên ${member?.name} (VNĐ):`, '50000');
    if (amountStr) {
      const amount = parseInt(amountStr, 10);
      if (!isNaN(amount) && amount > 0) {
        setMembers((prev) =>
          prev.map((m) =>
            m.id === id
              ? {
                  ...m,
                  balance: m.balance + amount,
                  balanceNote: `~ ${((m.balance + amount) / 20000).toFixed(1)} giờ chơi`
                }
              : m
          )
        );
        alert(`Đã nạp thành công ${amount.toLocaleString()} VNĐ cho ${member?.name}!`);
      }
    }
  };

  const handleLockMember = (id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'locked',
              station: 'Khóa bởi Admin',
              stationCode: null,
              stationDetail: null,
              balanceNote: 'Tài khoản đóng băng'
            }
          : m
      )
    );
  };

  const handleUnlockMember = (id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'offline',
              station: 'Máy trống',
              balanceNote: `~ ${(m.balance / 20000).toFixed(1)} giờ chơi`
            }
          : m
      )
    );
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hội viên này khỏi hệ thống?')) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleCreateMember = (newMemberData) => {
    const newMember = {
      id: Date.now(),
      uid: `UID-${Math.floor(10000 + Math.random() * 90000)}`,
      name: newMemberData.fullName,
      username: newMemberData.username,
      tier: newMemberData.tier,
      badge: null,
      balance: Number(newMemberData.deposit) || 0,
      balanceNote: `~ ${((Number(newMemberData.deposit) || 0) / 20000).toFixed(1)} giờ chơi`,
      pts: Math.floor((Number(newMemberData.deposit) || 0) / 1000),
      status: 'offline',
      station: 'Máy trống',
      stationCode: null,
      stationDetail: null,
      lastLoginTime: 'Vừa tạo',
      lastLoginDetail: 'Mới đăng ký',
      ipAddress: '192.168.1.100',
      initials: newMemberData.fullName
        ? newMemberData.fullName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : 'NV'
    };

    setMembers((prev) => [newMember, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      totalMembers: prev.totalMembers + 1,
      monthCreated: prev.monthCreated + 1
    }));
  };

  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen">
      {/* Header */}
      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={onLogout}
      />

      {/* Sidebar with activeNav set to 'members' */}
      <Sidebar activeNav="members" bootromStatus="ONLINE" role="ADMIN" />

      {/* Main Content */}
      <div className="pl-[240px]">
        <main className="relative pt-16 min-h-screen bg-background w-full px-space-lg py-space-lg flex flex-col justify-between">
          <div className="flex flex-col w-full gap-space-lg">
            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1 hover:text-sky-600 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[16px] text-slate-500">home</span>
                Tổng Quan
              </span>
              <span className="text-slate-400 font-bold">/</span>
              <span className="text-slate-900 font-extrabold">Quản Lý Hội Viên Cyber</span>
            </div>

            {/* KPI Summary Cards */}
            <MemberKpiCards metrics={metrics} />

            {/* Action Bar & Advanced Filters */}
            <MemberFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              tierFilter={tierFilter}
              onTierChange={setTierFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onOpenCreateModal={() => setIsModalOpen(true)}
            />

            {/* Bulk Action Bar */}
            <MemberBulkActionBar
              selectedCount={selectedIds.length}
              onAddHours={() => alert(`Cộng giờ cho ${selectedIds.length} hội viên`)}
              onLock={() => {
                setMembers((prev) =>
                  prev.map((m) => (selectedIds.includes(m.id) ? { ...m, status: 'locked' } : m))
                );
                setSelectedIds([]);
              }}
              onDelete={() => {
                setMembers((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
                setSelectedIds([]);
              }}
            />

            {/* Data Table */}
            <MemberTable
              members={filteredMembers}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onQuickDeposit={handleQuickDeposit}
              onLock={handleLockMember}
              onUnlock={handleUnlockMember}
              onDelete={handleDeleteMember}
            />

            {/* Pagination */}
            <MemberPagination
              currentPage={currentPage}
              totalPages={342}
              pageSize={pageSize}
              totalItems={metrics.totalMembers}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Create Member Modal */}
      <CreateMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMember}
      />
    </div>
  );
}
