import React from 'react';
import { Search, Calendar, Filter, RefreshCw, RotateCcw, PlusCircle } from 'lucide-react';

export default function TransactionFilterBar({
    filters,
    onFilterChange,
    onResetFilters,
    onRefresh,
    onOpenCreateModal,
    loading
}) {
    return (
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-outline-variant/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1 relative flex items-center">
                <Search className="w-5 h-5 absolute left-3 text-on-surface-variant pointer-events-none" />
                <input
                    type="text"
                    value={filters.search || ''}
                    onChange={(e) => onFilterChange('search', e.target.value)}
                    placeholder="Tìm kiếm mã TXN-..., tên khách hàng, SĐT, số máy trạm..."
                    className="w-full pl-10 pr-10 py-2 bg-surface-container-low rounded-lg text-on-surface font-body-md text-sm placeholder-on-surface-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-outline-variant/20"
                />
                <span className="absolute right-3 text-[11px] font-mono bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant">
                    ⌘K
                </span>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Date Range Selector */}
                <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-1.5 border border-outline-variant/20">
                    <Calendar className="w-4 h-4 text-primary mr-1.5" />
                    <select
                        value={filters.dateRange || 'all'}
                        onChange={(e) => onFilterChange('dateRange', e.target.value)}
                        className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer pr-1"
                    >
                        <option value="today">Hôm nay</option>
                        <option value="7days">7 ngày qua</option>
                        <option value="30days">Tháng này</option>
                        <option value="all">Tất cả thời gian</option>
                    </select>
                </div>

                {/* Transaction Category */}
                <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-1.5 border border-outline-variant/20">
                    <span className="text-xs text-on-surface-variant mr-1.5">Khoản mục:</span>
                    <select
                        value={filters.category || 'all'}
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer pr-1"
                    >
                        <option value="all">Tất cả</option>
                        <option value="Nạp Giờ Chơi">Nạp Giờ Chơi</option>
                        <option value="Dịch Vụ F&B">Dịch Vụ F&B</option>
                        <option value="Combo Đêm">Combo Đêm</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                {/* Payment Method */}
                <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-1.5 border border-outline-variant/20">
                    <span className="text-xs text-on-surface-variant mr-1.5">Phương thức:</span>
                    <select
                        value={filters.paymentMethod || 'all'}
                        onChange={(e) => onFilterChange('paymentMethod', e.target.value)}
                        className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer pr-1"
                    >
                        <option value="all">Tất cả</option>
                        <option value="cash">Tiền mặt (Cash)</option>
                        <option value="vietqr">VietQR Pro</option>
                        <option value="pos">Thẻ POS / Card</option>
                        <option value="momo">Ví MoMo</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-1.5 border border-outline-variant/20">
                    <span className="text-xs text-on-surface-variant mr-1.5">Trạng thái:</span>
                    <select
                        value={filters.status || 'all'}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer pr-1"
                    >
                        <option value="all">Tất cả</option>
                        <option value="completed">Thành công</option>
                        <option value="pending">Đang xử lý</option>
                        <option value="failed">Thất bại</option>
                        <option value="refunded">Hoàn tiền</option>
                    </select>
                </div>

                {/* Refresh & Reset Buttons */}
                <div className="flex items-center gap-1.5 ml-auto lg:ml-0">
                    <button
                        onClick={onRefresh}
                        disabled={loading}
                        className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors border border-outline-variant/20 disabled:opacity-50"
                        title="Làm mới dữ liệu"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-primary' : ''}`} />
                    </button>
                    <button
                        onClick={onResetFilters}
                        className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors border border-outline-variant/20"
                        title="Xóa bộ lọc"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
