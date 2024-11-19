const Cart = require('../models/cartSchema');
const mongoose = require('mongoose');

// Get the cart for a user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
   // const userId = req.session.userId
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price images');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Add or update an item in the cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, product, quantity } = req.body;

    // Validate required fields
    if (!userId || !product || quantity === undefined) {
      return res.status(400).json({ message: 'User ID, product, and quantity are required' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === product);
    if (existingItem) {
      // Update quantity if the product already exists in the cart
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ product, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Update the quantity of an item in the cart
exports.updateCartItem = async (req, res) => {
  try {
    const { userId, product, quantity } = req.body;

    if (!userId || !product || quantity === undefined) {
      return res.status(400).json({ message: 'User ID, product, and quantity are required' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === product);
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: 'Cart item updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, product } = req.body;

    // Validate input
    if (!userId || !product) {
      return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Check if the product exists in the cart
    const productExists = cart.items.some(item => item.product.toString() === product);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(item => item.product.toString() !== product);
    cart.updatedAt = Date.now(); // Update timestamp
    await cart.save();

    return res.status(200).json({
      message: 'Product removed from the cart successfully',
      cart,
    });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({
      message: 'Internal server error while removing item from cart',
      error: error.message,
    });
  }
};


// Clear the cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};
