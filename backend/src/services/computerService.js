const db = require('../models');
const { formatStationDTO } = require('../utils/stationFormatter');
const { ComputerStatus } = require('../constants/enums');

/**
 * ComputerService
 * Enforces Single Responsibility Principle (SRP) for Computer & Zone Business Logic.
 * Optimized O(N) Summary calculation & top-level imports.
 */
class ComputerService {
  /**
   * Fetch all computers with ComputerZone details & latest status logs
   */
  async getAllComputers() {
    try {
      const computers = await db.Computer.findAll({
        include: [
          {
            model: db.ComputerZone,
            include: [{ model: db.PricingPlan, required: false, attributes: ['pricing_plan_id', 'name', 'price_per_hour', 'plan_type', 'is_active'] }]
          },
          {
            model: db.ComputerStatusLog,
            required: false,
            limit: 1,
            order: [['recorded_at', 'DESC']],
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
          { model: db.ComputerStatusLog, required: false, limit: 1, order: [['recorded_at', 'DESC']] }
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
      const { computer_name, zone_id, status, ip_address, is_remote_enabled } = computerData;
      const newComputer = await db.Computer.create({
        computer_name,
        ip_address: ip_address || null,
        zone_id: zone_id || 1,
        status: status || ComputerStatus.OFFLINE,
        is_remote_enabled: is_remote_enabled || false
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

      if (updateData.status) {
        await computer.updateStatus(updateData.status);
      }

      if (updateData.zone_id) computer.zone_id = updateData.zone_id;
      if (updateData.computer_name) computer.computer_name = updateData.computer_name;
      if (updateData.ip_address !== undefined) computer.ip_address = updateData.ip_address;
      if (updateData.is_remote_enabled !== undefined) computer.is_remote_enabled = updateData.is_remote_enabled;

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
   * Fetch all zones with pricing plans
   */
  async getAllZones() {
    try {
      return await db.ComputerZone.findAll({
        include: [{ model: db.PricingPlan, required: false, attributes: ['pricing_plan_id', 'name', 'price_per_hour', 'plan_type', 'is_active'] }]
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khu vực máy:', error);
      throw error;
    }
  }

  /**
   * Fetch full Room Layout Grid grouped by Computer Zones with standardized Station DTOs
   * Optimized: Top-level imports, O(N) Summary calculation, ComputerStatus Enums
   */
  async getRoomLayoutGrid() {
    try {
      const zones = await db.ComputerZone.findAll({
        include: [{ model: db.PricingPlan, required: false, attributes: ['pricing_plan_id', 'name', 'price_per_hour', 'plan_type', 'is_active'] }],
        order: [['zone_id', 'ASC']]
      });

      const computers = await this.getAllComputers();
      const formattedStations = computers.map((comp) => formatStationDTO(comp));

      // Single-pass O(N) summary calculation instead of 6 filter passes O(6N)
      const summary = {
        total: formattedStations.length,
        online: 0,
        in_use: 0,
        offline: 0,
        locked: 0,
        maintenance: 0,
        remote: 0
      };

      for (const s of formattedStations) {
        switch (s.status) {
          case ComputerStatus.ONLINE:
            summary.online++;
            break;
          case ComputerStatus.IN_USE:
            summary.in_use++;
            break;
          case ComputerStatus.OFFLINE:
            summary.offline++;
            break;
          case ComputerStatus.LOCKED:
          case ComputerStatus.PAUSE:
            summary.locked++;
            break;
          case ComputerStatus.MAINTENANCE:
            summary.maintenance++;
            break;
          case ComputerStatus.REMOTE:
            summary.remote++;
            break;
        }
      }

      // Group stations by zone
      const zoneGrids = zones.map((zone) => {
        const zoneStations = formattedStations.filter((s) => s.zone_id === zone.zone_id);
        const pricingPlan = zone.PricingPlan || {};

        return {
          zone_id: zone.zone_id,
          zone_name: zone.zone_name,
          price_per_hour: pricingPlan.price_per_hour ? Number(pricingPlan.price_per_hour) : 0,
          total_stations: zoneStations.length,
          stations: zoneStations
        };
      });

      return {
        summary,
        zones: zoneGrids,
        all_stations: formattedStations
      };
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sơ đồ phòng máy (Room Layout Grid):', error);
      throw error;
    }
  }
}

module.exports = new ComputerService();
