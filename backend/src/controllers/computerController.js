const computerService = require('../services/computerService');
const stationControlService = require('../services/stationControlService');

/**
 * ComputerController
 * Handles HTTP requests and delegates logic to specialized Services (SRP & Clean Code)
 */
class ComputerController {
  async getRoomLayoutGrid(req, res, next) {
    try {
      const gridData = await computerService.getRoomLayoutGrid();
      return res.json({
        status: 'success',
        data: gridData,
        message: 'Lấy dữ liệu sơ đồ phòng máy thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, member_id, notes } = req.body;
      const updatedStation = await stationControlService.changeStatus(id, status, member_id, notes);
      return res.json({
        status: 'success',
        data: updatedStation,
        message: `Đổi trạng thái trạm máy thành ${status} thành công`
      });
    } catch (error) {
      next(error);
    }
  }

  async switchStation(req, res, next) {
    try {
      const { id } = req.params;
      const { target_computer_id, member_id } = req.body;
      const result = await stationControlService.switchStation(id, target_computer_id, member_id);
      return res.json({
        status: 'success',
        data: result,
        message: 'Chuyển trạm máy thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async wakeOnLan(req, res, next) {
    try {
      const { zone_id } = req.body;
      const result = await stationControlService.wakeOnLan(zone_id);
      return res.json({
        status: 'success',
        data: result,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  async getBootromLogs(req, res, next) {
    try {
      const { computer_id } = req.query;
      const logs = await stationControlService.getBootromLogs(computer_id);
      return res.json({
        status: 'success',
        data: logs,
        message: 'Lấy nhật ký kết nối Bootrom thành công'
      });
    } catch (error) {
      next(error);
    }
  }


  async getComputers(req, res, next) {
    try {
      const computers = await computerService.getAllComputers();
      return res.json({
        status: 'success',
        data: computers,
        message: 'Lấy danh sách máy trạm thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async getComputerById(req, res, next) {
    try {
      const { id } = req.params;
      const computer = await computerService.getComputerById(id);
      if (!computer) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy máy trạm'
        });
      }
      return res.json({
        status: 'success',
        data: computer
      });
    } catch (error) {
      next(error);
    }
  }

  async createComputer(req, res, next) {
    try {
      const newComputer = await computerService.createComputer(req.body);
      return res.status(201).json({
        status: 'success',
        data: newComputer,
        message: 'Tạo máy trạm mới thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateComputer(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await computerService.updateComputer(id, req.body);
      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy máy trạm để cập nhật'
        });
      }
      return res.json({
        status: 'success',
        data: updated,
        message: 'Cập nhật máy trạm thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteComputer(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await computerService.deleteComputer(id);
      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: 'Không tìm thấy máy trạm để xóa'
        });
      }
      return res.json({
        status: 'success',
        message: 'Xóa máy trạm thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async getHardwareSpecs(req, res, next) {
    try {
      const data = await computerService.getHardwareSpecs();
      return res.json({
        status: 'success',
        data,
        message: 'Lấy thông số cấu hình phần cứng thành công'
      });
    } catch (error) {
      next(error);
    }
  }

  async createHardwareSpec(req, res, next) {
    try {
      const newSpec = await computerService.createHardwareSpec(req.body);
      return res.status(201).json({
        status: 'success',
        data: newSpec,
        message: 'Thêm cấu hình máy mới thành công'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ComputerController();

