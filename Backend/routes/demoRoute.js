const express = require('express');
const Product = require('../models/productSchema');
const Category = require('../models/categorySchema');
const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Import fs module to create directories
const router = express.Router();

// Category image storage setup
const catStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = path.join(__dirname, '..', 'public', 'images', 'categories');
    
    // Ensure the directory exists, if not, create it
    fs.mkdirSync(destination, { recursive: true }); // Synchronously ensure the directory exists
    cb(null, destination);  // Proceed to store the file in the directory
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;  // Unique filename
    cb(null, fileName);
  }
});

// Product image storage setup
const prodStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const {category,name} = req.body;
    const destination = path.join(__dirname, '..', 'public', 'images', category,name);

    // Ensure the directory exists, if not, create it
    fs.mkdirSync(destination, { recursive: true }); // Synchronously ensure the directory exists
    cb(null, destination);  // Proceed to store the file in the directory
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;  // Unique filename
    cb(null, fileName);
  }
});

// Initialize multer with storage configuration for products
const uploadProductImages = multer({
  storage: prodStorage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Only image files are allowed!');
  }
});

// Initialize multer with storage configuration for categories
const uploadCategoryImage = multer({
  storage: catStorage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Only image files are allowed!');
  }
});

// POST route to add a new product with images
router.post('/addProduct', uploadProductImages.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const images = req.files.map(file => file.filename);  // Get the filenames of uploaded images

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      images
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// POST route to add a new category with image
router.post('/addCategory', uploadCategoryImage.single('image'), async (req, res) => {

 try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null; // Get image filename
  

    // Check if category name is provided
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name, description ,image});
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }

});

module.exports = router;
