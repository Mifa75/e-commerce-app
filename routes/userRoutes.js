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

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Allows users to register by providing username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad Request - Missing required fields or invalid input
 *       500:
 *         description: Server error
 */

module.exports = router;

