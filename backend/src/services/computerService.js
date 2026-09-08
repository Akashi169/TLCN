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
}

module.exports = new ComputerService();
