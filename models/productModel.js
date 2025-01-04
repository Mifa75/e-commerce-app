const db = require('../db/db');

// Create a new product
exports.createProduct = async (name, description, price, categoryId) => {
  const query = 'INSERT INTO products (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [name, description, price, categoryId];
  const result = await db.pool.query(query, values);
  return result.rows[0]; // Return the created product
};

// Get products by category
exports.getProductsByCategory = async (categoryId) => {
  const query = categoryId
    ? 'SELECT * FROM products WHERE category_id = $1'
    : 'SELECT * FROM products';
  const values = categoryId ? [categoryId] : [];
  const result = await db.pool.query(query, values);
  return result.rows; // Return all matching products
};

// Get a single product by ID
exports.getProductById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = $1';
  const values = [productId];
  const result = await db.pool.query(query, values);
  return result.rows[0]; // Return the product
};

// Update a product by ID
exports.updateProduct = async (productId, name, description, price, categoryId) => {
  const query = `
    UPDATE products
    SET name = $1, description = $2, price = $3, category_id = $4
    WHERE id = $5
    RETURNING *`;
  const values = [name, description, price, categoryId, productId];
  const result = await db.pool.query(query, values);
  return result.rows[0]; // Return the updated product
};

// Delete a product by ID
exports.deleteProduct = async (productId) => {
  const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
  const values = [productId];
  const result = await db.pool.query(query, values);
  return result.rows[0]; // Return the deleted product
};
