const express = require('express');
const router = express.Router();

const ratingController = require('../controllers/ratingController');

// Route to add or update a review for a product
router.post('/product/:productId/review', ratingController.addReview);

// Route to get all reviews for a product
router.get('/product/:productId/reviews', ratingController.getReviews);

// Route to get the average rating of a product
router.get('/product/:productId/average', ratingController.getAverageRating);

module.exports = router;
