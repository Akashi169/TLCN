// src/shared/data/mockData.js
export const STATION_TYPES = {
    local: { id: 'local', label: 'Tại Quán', color: 'amber', icon: 'User', bg: 'bg-amber-100', text: 'text-amber-950', border: 'border-amber-300' },
    cloud: { id: 'cloud', label: 'Cloud Remote', color: 'sky', icon: 'Cloud', bg: 'bg-sky-100', text: 'text-sky-950', border: 'border-sky-300' },
    ready: { id: 'ready', label: 'Sẵn Sàng', color: 'emerald', icon: 'Power', bg: 'bg-emerald-100', text: 'text-emerald-950', border: 'border-emerald-300' },
    maint: { id: 'maint', label: 'Bảo Trì', color: 'rose', icon: 'Wrench', bg: 'bg-rose-100', text: 'text-rose-950', border: 'border-rose-300' }
};

export const ZONES = [
    {
        id: 'zone-1',
        name: 'ZONE 1: ESPORTS PRO ARENA',
        totalCount: 20,
        pricingPlan: 'GÓI PRO',
        pricePerHour: 15000,
        config: 'Intel Core i9-14900K • RTX 4080 Super • 360Hz',
        stations: [
            { id: 'ESP-01', user: 'NamViper', game: 'Valorant', time: '3h 45m', telemetry: '42°C • 65W', type: 'local' },
            { id: 'ESP-02', user: 'G_Cloud912', game: 'Apex Legends', time: '2h 20m', telemetry: '52°C • 120W', type: 'cloud', latency: '12ms' },
            { id: 'ESP-03', user: 'HoangLong99', game: 'CS2', time: '1h 10m', telemetry: '48°C • 90W', type: 'local' },
            { id: 'ESP-04', user: 'Sẵn sàng', game: 'Chờ kết nối', time: '00:00', telemetry: '28°C • 12W', type: 'ready' },
            { id: 'ESP-05', user: 'Bảo trì', game: 'Thay VGA', time: '00:00', telemetry: 'OFFLINE', type: 'maint' },
            { id: 'ESP-06', user: 'MinhPro', game: 'League of Legends', time: '4h 05m', telemetry: '40°C • 70W', type: 'local' },
            { id: 'ESP-07', user: 'CloudUser_01', game: 'Cyberpunk 2077', time: '0h 50m', telemetry: '55°C • 140W', type: 'cloud', latency: '15ms' },
            { id: 'ESP-08', user: 'Sẵn sàng', game: 'Chờ kết nối', time: '00:00', telemetry: '28°C • 12W', type: 'ready' },
            { id: 'ESP-09', user: 'AnhTuan', game: 'Dota 2', time: '2h 15m', telemetry: '44°C • 80W', type: 'local' },
            { id: 'ESP-10', user: 'CloudUser_02', game: 'Elden Ring', time: '1h 40m', telemetry: '50°C • 110W', type: 'cloud', latency: '18ms' },
        ]
    },
    {
        id: 'zone-2',
        name: 'ZONE 2: STREAMER & VIP ROOMS',
        totalCount: 10,
        pricingPlan: 'GÓI STREAMER VIP',
        pricePerHour: 25000,
        config: 'AMD Ryzen 9 7950X3D • RTX 4090 • Dual Monitor',
        stations: [
            { id: 'VIP-01', user: 'MixiGamer', game: 'Stream / GTA V', time: '5h 12m', telemetry: '58°C • 200W', type: 'local' },
            { id: 'VIP-02', user: 'PewPew', game: 'Dota 2 Stream', time: '3h 30m', telemetry: '54°C • 180W', type: 'local' },
            { id: 'VIP-03', user: 'Sẵn sàng', game: 'Chờ kết nối', time: '00:00', telemetry: '28°C • 15W', type: 'ready' },
            { id: 'VIP-04', user: 'CloudStream_05', game: 'Overwatch 2', time: '2h 05m', telemetry: '50°C • 130W', type: 'cloud', latency: '9ms' },
            { id: 'VIP-05', user: 'Sẵn sàng', game: 'Chờ kết nối', time: '00:00', telemetry: '28°C • 15W', type: 'ready' },
        ]
    },
    {
        id: 'zone-3',
        name: 'ZONE 3: STANDARD CYBER FLOOR',
        totalCount: 30,
        pricingPlan: 'GÓI TIÊU CHUẨN',
        pricePerHour: 10000,
        config: 'Intel Core i5-13400F • RTX 3060 • 180Hz',
        stations: [
            { id: 'STD-01', user: 'QuangBao', game: 'FIFA Online 4', time: '1h 00m', telemetry: '40°C • 50W', type: 'local' },
            { id: 'STD-02', user: 'Sẵn sàng', game: 'Chờ kết nối', time: '00:00', telemetry: '26°C • 10W', type: 'ready' },
            { id: 'STD-03', user: 'Cloud_Std03', game: 'Genshin Impact', time: '2h 40m', telemetry: '46°C • 95W', type: 'cloud', latency: '22ms' },
            { id: 'STD-04', user: 'TuấnAnh88', game: 'PUBG PC', time: '0h 45m', telemetry: '48°C • 105W', type: 'local' },
            { id: 'STD-05', user: 'Bảo trì', game: 'Vệ sinh bàn phím', time: '00:00', telemetry: 'OFFLINE', type: 'maint' },
        ]
    }
];
