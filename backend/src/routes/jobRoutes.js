const express = require("express");
const router = express.Router();

const jobService = require("../services/JobService");
const authMiddleware = require("../middleware/authMiddleware");
// Protect routes below this line
router.use(authMiddleware);
// Post job
router.post("/", authMiddleware, async (req, res) => {
  try {
    const jobData = req.body;
    const user = req.user; // set by authMiddleware

    const job = await jobService.postJob(jobData, user);
    res.status(202).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all jobs
router.get("/", authMiddleware, async (req, res) => {
  const result = await jobService.getAllJobs(req.query);
  res.send(result);
});

// Get single job details
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id;
    const user = req.user; // set by authMiddleware

    const job = await jobService.getSingleJob(jobId, user);
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//Apply to jobs
router.post("/:id/apply", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id; // get job id from route
    const user = req.user; // set by authMiddleware

    const result = await jobService.applyJob(jobId, user);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
router.post("/:id/assign", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id; // get job id from route
    const user = req.user; // set by authMiddleware

    const result = await jobService.assignWork(jobId, user);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
