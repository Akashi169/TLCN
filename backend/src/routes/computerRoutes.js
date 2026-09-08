const express = require('express');
const router = express.Router();
const computerController = require('../controllers/computerController');

router.get('/specs', computerController.getHardwareSpecs);
router.post('/specs', computerController.createHardwareSpec);
router.get('/', computerController.getComputers);
router.get('/:id', computerController.getComputerById);
router.post('/', computerController.createComputer);
router.put('/:id', computerController.updateComputer);
router.delete('/:id', computerController.deleteComputer);

module.exports = router;
