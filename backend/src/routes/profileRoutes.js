const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

/**
 * Customer Profile Routes
 * Supports /me, /, and /:id endpoints safely without path-to-regexp ? syntax errors.
 */
router.get('/me', (req, res, next) => profileController.getProfile(req, res, next));
router.get('/', (req, res, next) => profileController.getProfile(req, res, next));
router.get('/:id', (req, res, next) => profileController.getProfile(req, res, next));

router.put('/', (req, res, next) => profileController.updateProfile(req, res, next));
router.put('/:id', (req, res, next) => profileController.updateProfile(req, res, next));

router.post('/:id/avatar', (req, res, next) => profileController.updateAvatar(req, res, next));

module.exports = router;

