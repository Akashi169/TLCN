import React from 'react';

/**
 * MemberPagination component for navigating tables
 */
export default function MemberPagination({
  currentPage = 1,
  totalPages = 342,
  pageSize = 10,
  totalItems = 3420,
  onPageChange,
  onPageSizeChange
}) {
  return (
    <div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-sm font-label-xs text-label-xs text-on-surface-variant">
        <span>Hiển thị</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
          className="px-2 py-1 bg-surface-container-lowest text-on-surface rounded font-label-xs text-label-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>
          trên tổng số <strong className="text-on-surface font-semibold">{totalItems.toLocaleString()}</strong> hội viên Cyber
        </span>
      </div>

      {/* Page Numbers Navigator */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => currentPage > 1 && onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange && onPageChange(page)}
            className={`w-8 h-8 rounded-lg font-label-xs text-label-xs font-bold transition-colors ${
              currentPage === page
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold'
            }`}
          >
            {page}
          </button>
        ))}

        <span className="px-1 text-on-surface-variant font-label-xs text-label-xs">...</span>

        <button
          onClick={() => onPageChange && onPageChange(totalPages)}
          className={`w-8 h-8 rounded-lg font-label-xs text-label-xs font-semibold transition-colors ${
            currentPage === totalPages
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
          }`}
        >
          {totalPages}
        </button>

        <button
          onClick={() => currentPage < totalPages && onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
