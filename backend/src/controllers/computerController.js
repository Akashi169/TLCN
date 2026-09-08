const computerService = require('../services/computerService');

/**
 * ComputerController
 * Handles HTTP requests and delegates logic to ComputerService (SRP & Clean Code)
 */
class ComputerController {
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
