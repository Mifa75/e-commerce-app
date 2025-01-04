const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Create a new cart for the user (POST /cart)
router.post('/', cartController.createCart);

// Add an item to the user's cart (POST /cart/{cartId})
router.post('/:cartId', cartController.addItemToCart);

// Get items in the user's cart (GET /cart/{cartId})
router.get('/:cartId', cartController.getCartItems);

module.exports = router;
