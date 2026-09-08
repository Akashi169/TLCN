import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../widgets/header/Header';
import Sidebar from '../../widgets/sidebar/Sidebar';
import Footer from '../../widgets/footer/Footer';

// FSD Modules for Promotions
import promotionService from '../../shared/api/promotion.service';
import PromotionKpiCards from '../../features/promotions/ui/PromotionKpiCards';
import PromotionFilterBar from '../../features/promotions/ui/PromotionFilterBar';
import PromotionTable from '../../features/promotions/ui/PromotionTable';
import CreatePromotionModal from '../../features/promotions/ui/CreatePromotionModal';
import PromotionDetailModal from '../../features/promotions/ui/PromotionDetailModal';
import { Tag, FileText, Download } from 'lucide-react';

/**
 * PromotionManagementPage (Quản Lý Khuyến Mãi & Ưu Đãi Cyber)
 * Built with FSD Architecture, Clean Code & DRY Principles
 */
export default function PromotionManagementPage({ user, onLogout }) {
  const [promotions, setPromotions] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [audienceFilter, setAudienceFilter] = useState('all');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [viewingPromo, setViewingPromo] = useState(null);

  // Fetch Promotions from Backend Service
  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const data = await promotionService.getPromotions();
      if (data) {
        setPromotions(data.promotions || []);
        setMetrics(data.metrics || null);
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách khuyến mãi:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Filtered Promotions Memoization
  const filteredPromotions = useMemo(() => {
    if (!Array.isArray(promotions)) return [];
    return promotions.filter((p) => {
      if (!p) return false;
      // Search match
      const query = searchQuery ? searchQuery.toLowerCase().trim() : '';
      const matchSearch =
        !query ||
        (p.name && String(p.name).toLowerCase().includes(query)) ||
        (p.code && String(p.code).toLowerCase().includes(query)) ||
        (p.description && String(p.description).toLowerCase().includes(query));

      // Status match
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;

      // Type match
      const matchType = typeFilter === 'all' || p.discountType === typeFilter;

      // Audience match
      const matchAudience = audienceFilter === 'all' || p.targetAudience === audienceFilter;

      return matchSearch && matchStatus && matchType && matchAudience;
    });
  }, [promotions, searchQuery, statusFilter, typeFilter, audienceFilter]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setAudienceFilter('all');
  };

  // Handlers for Actions
  const handleSavePromo = async (payload, promoId) => {
    try {
      if (promoId) {
        await promotionService.updatePromotion(promoId, payload);
      } else {
        await promotionService.createPromotion(payload);
      }
      await fetchPromotions();
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu khuyến mãi');
    }
  };

  const handleToggleActive = async (promoId, isActive) => {
    try {
      await promotionService.togglePromotionStatus(promoId, isActive);
      await fetchPromotions();
    } catch (err) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái khuyến mãi');
    }
  };

  const handleDeletePromo = async (promoId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chiến dịch khuyến mãi này?')) {
      try {
        await promotionService.deletePromotion(promoId);
        await fetchPromotions();
      } catch (err) {
        alert('Có lỗi xảy ra khi xóa khuyến mãi');
      }
    }
  };

  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen">
      {/* Shared Header */}
      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={onLogout}
      />

      {/* Shared Sidebar with activeNav set to 'promotions' */}
      <Sidebar activeNav="promotions" bootromStatus="ONLINE" role="ADMIN" />

      {/* Main Content */}
      <div className="pl-[240px]">
        <main className="relative pt-16 min-h-screen bg-background w-full px-space-lg py-space-lg flex flex-col justify-between">
          <div className="flex flex-col w-full gap-space-lg">
            {/* Page Title & Action CTA Strip */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-[11px] uppercase text-sky-700 font-extrabold tracking-wider bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    Promotion Engine v4.2
                  </span>
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="text-slate-500 font-semibold">Chiến Dịch &amp; Voucher</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Quản Lý Khuyến Mãi &amp; Ưu Đãi
                </h1>
                <p className="text-xs text-slate-500 font-medium max-w-2xl mt-0.5">
                  Thiết lập, theo dõi và quản lý các chiến dịch chiết khấu, nạp tiền giờ chơi và quà tặng thành viên trên toàn hệ thống phòng máy.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start lg:self-center">
                <button
                  onClick={() => alert('Xuất báo cáo khuyến mãi xuất thành công!')}
                  className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-lg border border-slate-200/90 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Xuất Báo Cáo</span>
                </button>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <PromotionKpiCards metrics={metrics} />

            {/* Advanced Filters Bar */}
            <PromotionFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              typeFilter={typeFilter}
              onTypeChange={setTypeFilter}
              audienceFilter={audienceFilter}
              onAudienceChange={setAudienceFilter}
              onResetFilters={handleResetFilters}
              onRefresh={fetchPromotions}
              onOpenCreateModal={() => {
                setEditingPromo(null);
                setIsCreateModalOpen(true);
              }}
            />

            {/* Data Table */}
            {loading ? (
              <div className="w-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                <div className="inline-block w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-xs font-bold">Đang tải dữ liệu chiến dịch khuyến mãi từ cơ sở dữ liệu...</p>
              </div>
            ) : (
              <PromotionTable
                promotions={filteredPromotions}
                onViewDetail={(p) => setViewingPromo(p)}
                onEdit={(p) => {
                  setEditingPromo(p);
                  setIsCreateModalOpen(true);
                }}
                onToggleActive={handleToggleActive}
                onDelete={handleDeletePromo}
              />
            )}
          </div>

          {/* Shared Footer */}
          <Footer />
        </main>
      </div>

      {/* Create / Edit Promotion Modal */}
      <CreatePromotionModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPromo(null);
        }}
        promo={editingPromo}
        onSubmit={handleSavePromo}
      />

      {/* View Promotion Detail Modal */}
      <PromotionDetailModal
        isOpen={!!viewingPromo}
        onClose={() => setViewingPromo(null)}
        promo={viewingPromo}
      />
    </div>
  );
}
