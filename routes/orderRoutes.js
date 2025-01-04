const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

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

// Route to get all orders for the user (GET /orders)
router.get('/', orderController.getUserOrders);
/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details by order ID
 *     description: Retrieves detailed information about a specific order.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

// Route to get details of a specific order (GET /orders/{orderId})
router.get('/:orderId', orderController.getOrderDetails);

module.exports = router;
