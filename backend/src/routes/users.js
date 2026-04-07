const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const asyncHandler = require('../middleware/asyncHandler');

// ReqRes endpoints
router.get('/reqres', asyncHandler(userController.getReqresUsers));
router.get('/reqres/:id', asyncHandler(userController.getReqresUserById));

// Import user from ReqRes to local DB
router.post('/import/:id', asyncHandler(userController.importUser));

// Local DB endpoints
router.get('/saved', asyncHandler(userController.getSavedUsers));
router.delete('/:id', asyncHandler(userController.deleteUser));

module.exports = router;
