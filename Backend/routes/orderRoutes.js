const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,getAllOrders
} = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders for a user
router.get('/user/:userId', getUserOrders);

// Get a specific order by ID
router.get('/:orderId', getOrderById);

// Update order status and payment status
router.put('/:orderId', updateOrderStatus);
router.get('/',getAllOrders);

module.exports = router;
