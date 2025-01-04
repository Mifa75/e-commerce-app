const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product (POST /products)
router.post('/', productController.createProduct);

// Get all products or filter by category (GET /products?category={categoryId})
router.get('/', productController.getProductsByCategory);

// Get a single product (GET /products/{productId})
router.get('/:productId', productController.getProductById);

// Update a product (PUT /products/{productId})
router.put('/:productId', productController.updateProduct);

// Delete a product (DELETE /products/{productId})
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
