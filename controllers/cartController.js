const db = require('../db/db');  
const productModel = require('../models/productModel');  

// Create a new cart for the user
const createCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user is authenticated
    // Check if the user already has a cart
    const existingCart = await db.pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    
    if (existingCart.rows.length > 0) {
      return res.status(400).json({ message: 'User already has a cart' });
    }

    // Create a new cart for the user
    const result = await db.pool.query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
      [userId]
    );
    res.status(201).json({ cartId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add an item to the user's cart
const addItemToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    // Check if the product exists
    const product = await productModel.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart exists
    const cart = await db.pool.query('SELECT * FROM carts WHERE id = $1', [cartId]);
    if (cart.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Add or update the product in the cart
    const existingItem = await db.pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    );

    if (existingItem.rows.length > 0) {
      // If the item already exists in the cart, update the quantity
      await db.pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3',
        [quantity, cartId, productId]
      );
    } else {
      // If it's a new item, insert it into the cart
      await db.pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
        [cartId, productId, quantity]
      );
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get items from the cart
const getCartItems = async (req, res) => {
  try {
    const { cartId } = req.params;

    // Check if the cart exists
    const cart = await db.pool.query('SELECT * FROM carts WHERE id = $1', [cartId]);
    if (cart.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Get the items in the cart
    const cartItems = await db.pool.query(
      'SELECT ci.id, p.name, ci.quantity, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1',
      [cartId]
    );

    res.status(200).json(cartItems.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCart,
  addItemToCart,
  getCartItems,
};
