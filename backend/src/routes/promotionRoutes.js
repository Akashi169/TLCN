const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.get('/', promotionController.getPromotions);
router.get('/:id', promotionController.getPromotionById);
router.post('/', promotionController.createPromotion);
router.put('/:id', promotionController.updatePromotion);
router.patch('/:id/toggle', promotionController.togglePromotionStatus);
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;
