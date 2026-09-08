import React from 'react';

/**
 * MemberBulkActionBar component for handling multi-selection actions on members
 */
export default function MemberBulkActionBar({
  selectedCount = 0,
  onAddHours,
  onLock,
  onDelete
}) {
  if (selectedCount === 0) return null;

  return (
    <div
      className="flex items-center justify-between bg-inverse-surface text-inverse-on-surface px-space-lg py-space-sm rounded-xl shadow-lg transition-all animate-fade-in"
      id="bulk-actions"
    >
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-inverse-primary text-[18px]">
            check_circle
          </span>
          <span>
            Đã chọn <strong className="text-inverse-primary" id="selected-count">{selectedCount}</strong> hội viên
          </span>
        </div>
        <div className="h-4 w-px bg-outline"></div>
        <span className="font-label-xs text-label-xs text-outline-variant hidden sm:inline">
          Hành động hàng loạt trên node máy trạm
        </span>
      </div>
      <div className="flex items-center gap-space-xs">
        <button
          onClick={onAddHours}
          className="flex items-center gap-1 px-space-md py-1.5 bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add_card</span>
          <span>Cộng Giờ / Bonus</span>
        </button>
        <button
          onClick={onLock}
          className="flex items-center gap-1 px-space-md py-1.5 bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-inverse-on-surface font-label-sm text-label-sm font-medium rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span>Khóa tạm thời</span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-space-md py-1.5 bg-error hover:bg-on-error-container text-on-error font-label-sm text-label-sm font-semibold rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
          <span>Xóa hội viên</span>
        </button>
      </div>
    </div>
  );
}
