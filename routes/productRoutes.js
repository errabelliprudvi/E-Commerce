const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Import the product controller

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get all products by category
router.get('/category/:category', productController.getProductsByCategory);

// Get a single product by ID
router.get('/:productId', productController.getProductById);

// Update a product
router.put('/:productId', productController.updateProduct);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

// POST route to add multiple products
router.post('/addMulti', productController.addMultipleProducts);

module.exports = router;
