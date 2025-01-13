const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAddress,
  updateAddress,
  deleteAddress,
  login,
  signup
} = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get all users (Admin only)
router.get('/', getUsers);

//
router.post('/signup', signup);

router.post('/login',login)

// Get a single user by ID
router.get('/:userId', getUserById);

// Update a user
router.put('/:userId', updateUser);

// Delete a user
router.delete('/:userId', deleteUser);

// Add an address to a user
router.post('/:userId/address', addAddress);

// Update an address of a user
router.put('/:userId/address/:addressId', updateAddress);

// Delete an address from a user
router.delete('/:userId/address/:addressId', deleteAddress);

module.exports = router;
