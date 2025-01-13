const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

// Get cart for a user
router.get('/:userId', getCart);

// Add or update an item in the cart
router.post('/', addToCart);

// Update quantity of a cart item
router.put('/', updateCartItem);

// Remove an item from the cart
router.delete('/item', removeFromCart);

// Clear the cart
router.delete('/:userId', clearCart);

module.exports = router;
