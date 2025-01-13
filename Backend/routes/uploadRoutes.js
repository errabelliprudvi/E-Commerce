// uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadImage } = require('../controllers/uploadController');
const router = express.Router();

// Set up multer storage to save images to the public directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/uploads/categories'; // Save images under public/uploads/categories
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid file name conflicts
  }
});

const upload = multer({ storage: storage });

// POST route to upload an image
router.post('/image', upload.single('image'), uploadImage);

module.exports = router;
