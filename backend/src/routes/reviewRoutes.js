const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ReviewServices = require("../services/ReviewService");

// Create a review
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId, reviewedId, rating, comment } = req.body;
    const reviewerId = req.user._id; // from authMiddleware

    const review = await ReviewServices.createReview({
      jobId,
      reviewerId,
      reviewedId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all reviews for a user
router.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const reviews = await ReviewServices.getUserReviews(userId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all reviews for a job
router.get("/job/:id", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id;
    const reviews = await ReviewServices.getJobReviews(jobId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
