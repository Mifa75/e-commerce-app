const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Route to get all orders for the user (GET /orders)
router.get('/', orderController.getUserOrders);

// Route to get details of a specific order (GET /orders/{orderId})
router.get('/:orderId', orderController.getOrderDetails);

module.exports = router;
