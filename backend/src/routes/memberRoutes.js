const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMemberById);
router.put('/:id/info', memberController.updateMemberInfo);
router.put('/:id/status', memberController.updateAccountStatus);

module.exports = router;
