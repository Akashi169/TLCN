const db = require('../models');

/**
 * ComputerService
 * Enforces Single Responsibility Principle (SRP) for Computer & Zone Business Logic
 * Aligned 100% with backend/src/config/model.js
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
            include: [{ model: db.PricingPlan }]
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
        status: status || 'OFFLINE',
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
        include: [{ model: db.PricingPlan }]
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khu vực máy:', error);
      throw error;
    }
  }
}

module.exports = new ComputerService();
