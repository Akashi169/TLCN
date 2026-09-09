const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getTransactions);
router.post('/topup', transactionController.createTopUp);
router.post('/:id/refund', transactionController.refundTransaction);

module.exports = router;
