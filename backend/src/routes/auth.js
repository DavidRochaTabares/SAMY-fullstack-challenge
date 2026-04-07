const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const asyncHandler = require('../middleware/asyncHandler');

router.post('/request-code', asyncHandler(authController.requestMagicCode));
router.post('/verify-code', asyncHandler(authController.verifyMagicCode));
router.post('/login', asyncHandler(authController.login)); 

module.exports = router;
