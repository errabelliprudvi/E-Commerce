const Product = require('../models/productSchema'); // Import the Product model

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, images } = req.body;

    // Check if all required fields are provided
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Retrieve all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get all products by Category 
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({category:category}); // Retrieve all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId); // Find product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product); // Return the product
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, stock, category, images } = req.body;

    const product = await Product.findById(productId); // Find the product to update
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product details
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (images) product.images = images;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId); // Find the product to delete
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};


// Controller function to add multiple products
exports.addMultipleProducts = async (req, res) => {
  try {
    // Extract products array from request body
    const products = req.body.products;

    // Check if products array exists and is an array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required and must not be empty.' });
    }

    // Create multiple products using Mongoose's insertMany
    const createdProducts = await Product.insertMany(products);

    res.status(201).json({
      message: 'Products added successfully.',
      data: createdProducts,
    });
  } catch (error) {
    console.error('Error adding multiple products:', error);
    res.status(500).json({
      message: 'An error occurred while adding products.',
      error: error.message,
    });
  }
};
