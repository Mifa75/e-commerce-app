const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User registration endpoint
router.post('/register', userController.registerUser);

// Get all users (admin access only)
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:userId', userController.getUserById);

// Update user by ID
router.put('/:userId', userController.updateUser);

module.exports = router;

