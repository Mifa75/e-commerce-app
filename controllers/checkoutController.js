const db = require('../db/db');
const cartController = require('../controllers/cartController');  
const productModel = require('../models/productModel');  

// Mock payment processing (just for simulation)
const processPayment = async (paymentDetails) => {
  // Here you can add logic to validate payment details (e.g., credit card info)
  // For now, we'll assume the payment always succeeds
  if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
    throw new Error('Invalid payment details');
  }

  // Simulate success or failure of the payment
  return { success: true, message: 'Payment successful' };
};

// Checkout process (POST /cart/{cartId}/checkout)
const checkout = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { paymentDetails } = req.body;  // Payment info should come in the request body

    // Validate cart existence
    const cart = await db.pool.query('SELECT * FROM carts WHERE id = $1', [cartId]);
    if (cart.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Get items in the cart
    const cartItems = await db.pool.query(
      'SELECT ci.product_id, ci.quantity, p.price_at_purchase FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1',
      [cartId]
    );
    
    if (cartItems.rows.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Process the payment
    const paymentResult = await processPayment(paymentDetails);
    if (!paymentResult.success) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    // Calculate total amount for the order
    let totalAmount = 0;
    for (const item of cartItems.rows) {
      totalAmount += item.price_at_purchase * item.quantity;
    }

    // Create the order record
    const orderResult = await db.pool.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
      [req.user.id, totalAmount, 'completed']  // Assuming req.user.id is available for authenticated users
    );

    const orderId = orderResult.rows[0].id;

    // Add items to the order
    for (const item of cartItems.rows) {
      await db.pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // Clear the cart (remove all items from the cart)
    await db.pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);

    // Return success message
    res.status(200).json({ message: 'Checkout successful', orderId });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Server error during checkout' });
  }
};

module.exports = { checkout };
