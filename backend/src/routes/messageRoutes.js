const express = require("express");
const router = express.Router();

const messageService = require("../services/MessageService");
const authMiddleware = require("../middleware/authMiddleware");
// Protect routes below this line
router.use(authMiddleware);
// Post message
router.post("/:id/messages", authMiddleware, async (req, res) => {
  try {
    const { jobId, toUserId, message } = req.body; // <-- message must exist
    const fromUser = req.user; // set by authMiddleware

    if (!message || !jobId || !toUserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMessage = await messageService.createMessage({
      jobId,
      fromUserId: fromUser._id,
      toUserId,
      message,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get single message details
router.get("/:id/message", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id;

    const messages = await messageService.getSingleMessages(jobId);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
