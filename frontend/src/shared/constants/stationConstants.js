/**
 * Station Centralized UI Config Constants
 * Maps station status & session types to clean UI badges, colors & labels.
 */
export const STATION_TYPES = Object.freeze({
    local: { id: 'local', label: 'Tại Quán', color: 'amber', bg: 'bg-amber-100', text: 'text-amber-950', border: 'border-amber-300' },
    cloud: { id: 'cloud', label: 'Cloud Remote', color: 'sky', bg: 'bg-sky-100', text: 'text-sky-950', border: 'border-sky-300' },
    ready: { id: 'ready', label: 'Sẵn Sàng', color: 'emerald', bg: 'bg-emerald-100', text: 'text-emerald-950', border: 'border-emerald-300' },
    maint: { id: 'maint', label: 'Bảo Trì', color: 'rose', bg: 'bg-rose-100', text: 'text-rose-950', border: 'border-rose-300' },
    off: { id: 'off', label: 'Tắt Nguồn', color: 'slate', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' },
    locked: { id: 'locked', label: 'Tạm Khóa', color: 'amber', bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' }
});
