const db = require('../db/db');

// Get all orders for a user (GET /orders)
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains the logged-in user's information

    // Fetch orders for the logged-in user
    const result = await db.pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Return a list of orders with basic details (orderId, totalAmount, status)
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

// Get details of a specific order (GET /orders/{orderId})
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id; // Assuming req.user contains the logged-in user's information

    // Fetch the specific order
    const orderResult = await db.pool.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [orderId, userId]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found or you are not authorized to view it' });
    }

    const order = orderResult.rows[0];

    // Fetch the items for the specific order
    const itemsResult = await db.pool.query(
      'SELECT oi.product_id, oi.quantity, oi.price, p.name AS product_name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1',
      [orderId]
    );

    // Add the order items to the order details
    order.items = itemsResult.rows;

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Server error fetching order details' });
  }
};

module.exports = { getUserOrders, getOrderDetails };
