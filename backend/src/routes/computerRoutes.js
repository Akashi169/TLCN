const express = require('express');
const router = express.Router();
const computerController = require('../controllers/computerController');
router.post(
    '/commands/broadcast',
    computerController.broadcastCommand
);
router.get('/specs', computerController.getHardwareSpecs);
router.post('/specs', computerController.createHardwareSpec);
router.get('/', computerController.getComputers);
router.get('/:id', computerController.getComputerById);
router.post('/', computerController.createComputer);
router.put('/:id', computerController.updateComputer);
router.delete('/:id', computerController.deleteComputer);



router.post(
    "/:machineId/login",
    computerController.login
);

router.post(
    "/:machineId/logout",
    computerController.logout
);

router.post(
    "/:machineId/command",
    computerController.sendCommand
);

router.post(
    "/:machineId/notification",
    computerController.sendNotification
);


module.exports = router;
