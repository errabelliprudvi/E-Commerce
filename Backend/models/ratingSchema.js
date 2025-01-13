const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  ratings: {
    average: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String },
      },
    ],
  },
});

// Custom method to update the average rating
ratingSchema.methods.updateAverageRating = function () {
  const totalReviews = this.ratings.reviews.length;
  console.log(totalReviews)
  if (totalReviews === 0) {
    this.ratings.average = 0;
  } else {
    const totalScore = this.ratings.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.ratings.average = totalScore / totalReviews;
  }
};

// Export the Rating model
module.exports = mongoose.model('Rating', ratingSchema);
