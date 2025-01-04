const express = require('express');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

// Checkout route (POST /cart/{cartId}/checkout)
router.post('/:cartId/checkout', checkoutController.checkout);

module.exports = router;
