// src/data/mockData.js
export const STATION_TYPES = {
    local: { id: 'local', label: 'Tại Quán', color: 'amber', icon: 'person', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    cloud: { id: 'cloud', label: 'Cloud Remote', color: 'sky', icon: 'cloud', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    ready: { id: 'ready', label: 'Sẵn Sàng', color: 'emerald', icon: 'power_settings_new', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    maint: { id: 'maint', label: 'Bảo Trì', color: 'rose', icon: 'build', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' }
};

export const ZONES = [
    {
        id: 'zone-1',
        name: 'ZONE 1: ESPORTS PRO ARENA',
        totalCount: 20,
        config: 'Intel Core i9-14900K • RTX 4080 Super',
        stations: [
            { id: 'ESP-01', user: 'NamViper', game: 'Valorant', time: '3h 45m', telemetry: '42°C • 65W', type: 'local' },
            { id: 'ESP-03', user: 'G_Cloud912', game: 'Apex Legends', time: '2h 20m', telemetry: '52°C • 120W', type: 'cloud', latency: '12ms' },
            { id: 'ESP-06', user: 'Sẵn sàng', game: 'Chờ kết nối', time: 'TRỐNG', telemetry: '28°C • 12W', type: 'ready' },
            // ... Thêm các máy khác vào đây
        ]
    },
    // ... Thêm Zone 2, 3, 4 vào đây
];