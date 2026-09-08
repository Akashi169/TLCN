/**
 * Mock Data & Metrics for Hardware & BootROM Specs Management
 * Matching manageconfig.html specifications
 */

export const MOCK_HARDWARE_METRICS = {
  totalMachines: 120,
  activeZones: 4,
  availability: '100%',
  topGpuRatio: 'RTX 4090 / 4080S',
  topGpuCount: 30,
  topGpuPercent: '25%',
  avgRamRange: '32GB - 64GB',
  ramSpeed: 'DDR5 6000MHz Low-CL',
  totalRamCapacity: '4.8 TB Total',
  bootromHealth: '100% Đồng Bộ',
  sanNetwork: 'Dual SAN NVMe 40Gbps Fiber',
  ioErrors: 0
};

export const MOCK_HARDWARE_SPECS = [
  {
    id: 'ESP-01',
    numericId: '01',
    status: 'online',
    statusLabel: 'Online',
    zoneId: 'z1',
    zoneName: 'Zone 1 - Thi Đấu Esports',
    zoneColor: 'sky',
    cpu: {
      model: 'Intel Core i9-14900K',
      specs: '24 Cores / 32 Threads @ 5.8GHz'
    },
    ram: {
      capacity: '64GB DDR5',
      specs: '6000MHz CL30 Kingston Beast'
    },
    gpu: {
      model: 'RTX 4080 Super 16GB',
      edition: 'ASUS ROG Strix OC White'
    },
    storage: {
      type: 'SAN NVMe 10Gbps',
      specs: 'iSCSI Boot + 2TB Writeback RAM'
    },
    telemetry: {
      cpuTemp: 54,
      gpuTemp: 52,
      fanSpeed: '62%',
      sanPing: '0.24ms'
    }
  },
  {
    id: 'ESP-02',
    numericId: '02',
    status: 'online',
    statusLabel: 'Online',
    zoneId: 'z1',
    zoneName: 'Zone 1 - Thi Đấu Esports',
    zoneColor: 'sky',
    cpu: {
      model: 'Intel Core i9-14900K',
      specs: '24 Cores / 32 Threads @ 5.8GHz'
    },
    ram: {
      capacity: '64GB DDR5',
      specs: '6000MHz CL30 Kingston Beast'
    },
    gpu: {
      model: 'RTX 4080 Super 16GB',
      edition: 'ASUS ROG Strix OC White'
    },
    storage: {
      type: 'SAN NVMe 10Gbps',
      specs: 'iSCSI Boot + 2TB Writeback RAM'
    },
    telemetry: {
      cpuTemp: 53,
      gpuTemp: 50,
      fanSpeed: '60%',
      sanPing: '0.22ms'
    }
  },
  {
    id: 'VIP-01',
    numericId: '01',
    status: 'online',
    statusLabel: 'Online',
    zoneId: 'z2',
    zoneName: 'Zone 2 - VIP Gaming Pro',
    zoneColor: 'indigo',
    cpu: {
      model: 'Intel Core i7-14700K',
      specs: '20 Cores / 28 Threads @ 5.6GHz'
    },
    ram: {
      capacity: '32GB DDR5',
      specs: '5600MHz Corsair Vengeance'
    },
    gpu: {
      model: 'RTX 4070 Ti Super 16GB',
      edition: 'MSI Gaming X Slim'
    },
    storage: {
      type: 'SAN NVMe 10Gbps',
      specs: 'High Throughput Cache 1TB'
    },
    telemetry: {
      cpuTemp: 49,
      gpuTemp: 47,
      fanSpeed: '50%',
      sanPing: '0.28ms'
    }
  },
  {
    id: 'VIP-02',
    numericId: '02',
    status: 'ready',
    statusLabel: 'Sẵn sàng (Standby)',
    zoneId: 'z2',
    zoneName: 'Zone 2 - VIP Gaming Pro',
    zoneColor: 'indigo',
    cpu: {
      model: 'Intel Core i7-14700K',
      specs: '20 Cores / 28 Threads @ 5.6GHz'
    },
    ram: {
      capacity: '32GB DDR5',
      specs: '5600MHz Corsair Vengeance'
    },
    gpu: {
      model: 'RTX 4070 Ti Super 16GB',
      edition: 'MSI Gaming X Slim'
    },
    storage: {
      type: 'SAN NVMe 10Gbps',
      specs: 'High Throughput Cache 1TB'
    },
    telemetry: {
      cpuTemp: 38,
      gpuTemp: 35,
      fanSpeed: '30%',
      sanPing: '0.25ms'
    }
  },
  {
    id: 'STD-01',
    numericId: '01',
    status: 'online',
    statusLabel: 'Online',
    zoneId: 'z4',
    zoneName: 'Zone 4 - Stream Studio',
    zoneColor: 'purple',
    cpu: {
      model: 'AMD Ryzen 9 7950X',
      specs: '16 Cores / 32 Threads @ 5.7GHz'
    },
    ram: {
      capacity: '64GB DDR5',
      specs: '6000MHz G.Skill Trident Z5 Neo'
    },
    gpu: {
      model: 'RTX 4090 24GB',
      edition: 'Gigabyte AORUS Master Tri-Fan'
    },
    storage: {
      type: 'Dual NVMe 2TB PCIe 4.0',
      specs: 'Direct SSD Capture + SAN Boot'
    },
    telemetry: {
      cpuTemp: 58,
      gpuTemp: 55,
      fanSpeed: '68%',
      sanPing: '0.19ms'
    }
  },
  {
    id: 'ST-01',
    numericId: '01',
    status: 'online',
    statusLabel: 'Online',
    zoneId: 'z3',
    zoneName: 'Zone 3 - Standard Combat',
    zoneColor: 'amber',
    cpu: {
      model: 'Intel Core i5-13400F',
      specs: '10 Cores / 16 Threads @ 4.6GHz'
    },
    ram: {
      capacity: '32GB DDR4',
      specs: '3200MHz Dual Channel TeamGroup'
    },
    gpu: {
      model: 'RTX 4060 8GB',
      edition: 'Zotac Gaming Twin Edge OC'
    },
    storage: {
      type: 'SAN NVMe 10Gbps',
      specs: 'PXE High Speed Cluster Node'
    },
    telemetry: {
      cpuTemp: 44,
      gpuTemp: 42,
      fanSpeed: '45%',
      sanPing: '0.31ms'
    }
  },
  {
    id: 'ST-02',
    numericId: '02',
    status: 'maintenance',
    statusLabel: 'Bảo trì / Thay tản',
    zoneId: 'z3',
    zoneName: 'Zone 3 - Standard Combat',
    zoneColor: 'rose',
    cpu: {
      model: 'Intel Core i5-13400F',
      specs: '10 Cores / 16 Threads @ 4.6GHz'
    },
    ram: {
      capacity: '32GB DDR4',
      specs: '3200MHz Dual Channel TeamGroup'
    },
    gpu: {
      model: 'RTX 4060 8GB',
      edition: 'Zotac Gaming Twin Edge OC'
    },
    storage: {
      type: 'SAN NVMe 10Gbps',
      specs: 'PXE High Speed Cluster Node'
    },
    telemetry: {
      cpuTemp: 79,
      gpuTemp: 72,
      fanSpeed: '95%',
      sanPing: '0.45ms'
    }
  },
  {
    id: 'CLOUD-01',
    numericId: '01',
    status: 'online',
    statusLabel: 'Online Host',
    zoneId: 'z5',
    zoneName: 'Zone 5 - Cloud Host',
    zoneColor: 'emerald',
    cpu: {
      model: 'AMD EPYC 7763',
      specs: '64 Cores / 128 Threads Hypervisor'
    },
    ram: {
      capacity: '128GB ECC Reg',
      specs: 'Quad-Channel Server Grade'
    },
    gpu: {
      model: 'RTX 4090 Headless',
      edition: 'NVENC Cloud Virtual Gaming Grid'
    },
    storage: {
      type: '40Gbps Fiber SAN',
      specs: 'Direct RDMA Ultra-low Latency'
    },
    telemetry: {
      cpuTemp: 48,
      gpuTemp: 45,
      fanSpeed: '55%',
      sanPing: '0.15ms'
    }
  }
];

export const MOCK_HARDWARE_DIAGNOSTICS = {
  zonesTemp: [
    { name: 'Zone 1 (Thi Đấu - i9/RTX 4080S)', temp: '54°C', fan: 'Fan 62%', percentage: 58, color: 'sky' },
    { name: 'Zone 2 (VIP Pro - i7/RTX 4070Ti)', temp: '49°C', fan: 'Fan 50%', percentage: 49, color: 'indigo' },
    { name: 'Zone 4 (Stream Studio - Ryzen 9/RTX 4090)', temp: '58°C', fan: 'Fan 68%', percentage: 65, color: 'purple' }
  ],
  sanThroughput: {
    current: '8.42 Gbps',
    label: 'Tải cao điểm (84 máy đang chơi)',
    gameLoadTime: '2.4 giây'
  },
  alert: {
    machineId: 'ST-02',
    title: 'Máy ST-02: Thay Keo Tản Nhiệt',
    description: 'Cảnh báo nhiệt độ CPU vượt 78°C khi chơi Cyberpunk 2077. Đã tạm tắt nhận khách.',
    schedule: 'Chủ Nhật 02:00'
  }
};
