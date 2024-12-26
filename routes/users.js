const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User registration endpoint
router.post('/register', userController.registerUser);

module.exports = router;
