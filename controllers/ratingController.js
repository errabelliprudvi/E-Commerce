const Rating = require('../models/ratingSchema');
const Product = require('../models/productSchema');
const User = require('../models/userSchema');

// Add a review for a product
exports.addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, rating, comment } = req.body;

    // Validate if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create a rating document for the product
    let ratingDoc = await Rating.findOne({ product: productId });
    if (!ratingDoc) {
      ratingDoc = new Rating({ product: productId, ratings: { reviews: [] } });
    }

    // Add or update the review for the product
    const existingReview = ratingDoc.ratings.reviews.find(
      (review) => review.user.toString() === userId
    );

    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      // Add a new review
      ratingDoc.ratings.reviews.push({ user: userId, rating, comment });
    }

    // Recalculate average rating
    ratingDoc.updateAverageRating();
    await ratingDoc.save();

    res.status(200).json({ message: 'Review added/updated successfully', ratingDoc });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};

// Get all reviews for a product
exports.getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratingDoc = await Rating.findOne({ product: productId })
    
    if (!ratingDoc) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    res.status(200).json(ratingDoc.ratings.reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Get the average rating for a product
exports.getAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratingDoc = await Rating.findOne({ product: productId });
    
    if (!ratingDoc) {
      return res.status(404).json({ message: 'No ratings found for this product' });
    }

    res.status(200).json({ averageRating: ratingDoc.ratings.average });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching average rating', error });
  }
};
