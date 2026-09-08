const db = require('../models');

/**
 * ComputerService
 * Enforces Single Responsibility Principle (SRP) for Computer & Zone Business Logic
 */
class ComputerService {
  /**
   * Fetch all computers with ComputerZone & RentalSession details
   */
  async getAllComputers() {
    try {
      const computers = await db.Computer.findAll({
        include: [
          {
            model: db.ComputerZone,
            include: [{ model: db.PricingPlan }]
          },
          {
            model: db.RentalSession,
            where: { status: 'ACTIVE' },
            required: false,
            include: [
              {
                model: db.Member,
                include: [{ model: db.User, as: 'userInfo', attributes: ['username', 'full_name'] }]
              }
            ]
          }
        ],
        order: [['computer_id', 'ASC']]
      });

      return computers;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách máy trạm:', error);
      throw error;
    }
  }

  /**
   * Fetch computer by ID
   */
  async getComputerById(computerId) {
    try {
      return await db.Computer.findByPk(computerId, {
        include: [
          { model: db.ComputerZone },
          { model: db.RentalSession, where: { status: 'ACTIVE' }, required: false }
        ]
      });
    } catch (error) {
      console.error('Lỗi khi lấy máy trạm theo ID:', error);
      throw error;
    }
  }

  /**
   * Create a new computer station
   */
  async createComputer(computerData) {
    try {
      const { computer_name, zone_id, status } = computerData;
      const newComputer = await db.Computer.create({
        computer_name,
        zone_id: zone_id || 1,
        status: status || 'ONLINE'
      });
      return newComputer;
    } catch (error) {
      console.error('Lỗi khi tạo máy trạm mới:', error);
      throw error;
    }
  }

  /**
   * Update computer status or zone
   */
  async updateComputer(computerId, updateData) {
    try {
      const computer = await db.Computer.findByPk(computerId);
      if (!computer) return null;

      if (updateData.status) computer.status = updateData.status;
      if (updateData.zone_id) computer.zone_id = updateData.zone_id;
      if (updateData.computer_name) computer.computer_name = updateData.computer_name;

      await computer.save();
      return computer;
    } catch (error) {
      console.error('Lỗi khi cập nhật máy trạm:', error);
      throw error;
    }
  }

  /**
   * Delete computer station
   */
  async deleteComputer(computerId) {
    try {
      const computer = await db.Computer.findByPk(computerId);
      if (!computer) return false;
      await computer.destroy();
      return true;
    } catch (error) {
      console.error('Lỗi khi xóa máy trạm:', error);
      throw error;
    }
  }
  /**
   * Fetch formatted Hardware & BootROM Specs for ManageConfig page
   */
  async getHardwareSpecs() {
    try {
      const computers = await db.Computer.findAll({
        include: [
          {
            model: db.ComputerZone,
            attributes: ['zone_id', 'zone_name']
          }
        ],
        order: [['computer_id', 'ASC']]
      });

      const zoneMapColor = {
        1: 'sky',
        2: 'indigo',
        3: 'amber',
        4: 'purple',
        5: 'emerald'
      };

      const zoneMapId = {
        1: 'z1',
        2: 'z2',
        3: 'z3',
        4: 'z4',
        5: 'z5'
      };

      const formattedSpecs = computers.map((c) => ({
        id: c.computer_name,
        numericId: String(c.computer_id).padStart(2, '0'),
        status: c.status.toLowerCase(),
        statusLabel: c.status === 'ONLINE' ? 'Online' : c.status === 'IN_USE' ? 'Đang sử dụng' : c.status === 'MAINTENANCE' ? 'Bảo trì' : 'Offline',
        zoneId: zoneMapId[c.zone_id] || `z${c.zone_id}`,
        zoneName: c.ComputerZone ? c.ComputerZone.zone_name : `Zone ${c.zone_id}`,
        zoneColor: zoneMapColor[c.zone_id] || 'sky',
        cpu: {
          model: c.cpu || 'Chưa cấu hình',
          specs: c.cpu_specs || '—'
        },
        ram: {
          capacity: c.ram || 'Chưa cấu hình',
          specs: c.ram_specs || '—'
        },
        gpu: {
          model: c.gpu || 'Chưa cấu hình',
          edition: c.gpu_edition || '—'
        },
        storage: {
          type: c.storage_type || 'Chưa cấu hình',
          specs: c.storage_specs || '—'
        },
        bootImage: c.boot_image || 'Chưa thiết lập',
        telemetry: {
          cpuTemp: c.cpu_temp !== null && c.cpu_temp !== undefined ? c.cpu_temp : null,
          gpuTemp: c.gpu_temp !== null && c.gpu_temp !== undefined ? c.gpu_temp : null,
          fanSpeed: c.fan_speed || '—',
          sanPing: c.san_ping || '—'
        }
      }));

      const metrics = {
        totalMachines: computers.length,
        activeZones: 4,
        availability: '100%',
        topGpuRatio: 'RTX 4090 / 4080S',
        topGpuCount: computers.filter(c => (c.gpu || '').includes('4090') || (c.gpu || '').includes('4080')).length,
        topGpuPercent: `${Math.round((computers.filter(c => (c.gpu || '').includes('4090') || (c.gpu || '').includes('4080')).length / (computers.length || 1)) * 100)}%`,
        avgRamRange: '32GB - 64GB',
        ramSpeed: 'DDR5 6000MHz Low-CL',
        totalRamCapacity: '4.8 TB Total',
        bootromHealth: '100% Đồng Bộ',
        sanNetwork: 'Dual SAN NVMe 40Gbps Fiber',
        ioErrors: 0
      };

      const diagnostics = {
        zonesTemp: [
          { name: 'Zone 1 (Thi Đấu - i9/RTX 4080S)', temp: '54°C', fan: 'Fan 62%', percentage: 58, color: 'bg-sky-500' },
          { name: 'Zone 2 (VIP Pro - i7/RTX 4070Ti)', temp: '49°C', fan: 'Fan 50%', percentage: 49, color: 'bg-indigo-500' },
          { name: 'Zone 4 (Stream Studio - Ryzen 9/RTX 4090)', temp: '58°C', fan: 'Fan 68%', percentage: 65, color: 'bg-purple-500' }
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

      return { specs: formattedSpecs, metrics, diagnostics };
    } catch (error) {
      console.error('Lỗi khi lấy danh sách cấu hình phần cứng:', error);
      throw error;
    }
  }

  /**
   * Create new hardware station record
   */
  async createHardwareSpec(hardwareData) {
    try {
      const zoneIdNumber = parseInt((hardwareData.zoneId || 'z1').replace('z', ''), 10) || 1;
      const newComp = await db.Computer.create({
        computer_name: hardwareData.id || `PC-${Math.floor(100 + Math.random() * 900)}`,
        status: (hardwareData.status || 'ONLINE').toUpperCase(),
        zone_id: zoneIdNumber,
        cpu: hardwareData.cpu?.model || null,
        cpu_specs: hardwareData.cpu?.specs || null,
        ram: hardwareData.ram?.capacity || null,
        ram_specs: hardwareData.ram?.specs || null,
        gpu: hardwareData.gpu?.model || null,
        gpu_edition: hardwareData.gpu?.edition || null,
        storage_type: hardwareData.storage?.type || null,
        storage_specs: hardwareData.storage?.specs || null,
        boot_image: hardwareData.bootImage || null,
        cpu_temp: hardwareData.telemetry?.cpuTemp || null,
        gpu_temp: hardwareData.telemetry?.gpuTemp || null,
        fan_speed: hardwareData.telemetry?.fanSpeed || null,
        san_ping: hardwareData.telemetry?.sanPing || null
      });

      return newComp;
    } catch (error) {
      console.error('Lỗi khi tạo cấu hình phần cứng mới:', error);
      throw error;
    }
  }
}

module.exports = new ComputerService();
