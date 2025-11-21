const Review = require("../models/ReviewSchema");

class ReviewServices {
  // Create a review
  static async createReview({
    jobId,
    reviewerId,
    reviewedId,
    rating,
    comment,
  }) {
    if (!jobId || !reviewerId || !reviewedId || !rating) {
      throw new Error("Missing required fields");
    }

    const review = new Review({
      jobId,
      reviewerId,
      reviewedId,
      rating,
      comment,
    });

    await review.save();
    return review.toObject(); // safe for JSON
  }

  // Get all reviews for a user
  static async getUserReviews(userId) {
    if (!userId) throw new Error("User ID is required");

    const reviews = await Review.find({ reviewedId: userId })
      .sort({ createdAt: -1 }) // latest first
      .populate("reviewerId", "firstName lastName profilePhotoUrl");

    return reviews.map((r) => r.toObject());
  }

  // Get all reviews for a job
  static async getJobReviews(jobId) {
    if (!jobId) throw new Error("Job ID is required");

    const reviews = await Review.find({ jobId })
      .sort({ createdAt: -1 })
      .populate("reviewerId", "firstName lastName profilePhotoUrl");

    return reviews.map((r) => r.toObject());
  }
}

module.exports = ReviewServices;
