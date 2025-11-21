const express = require("express");
const router = express.Router();

const userService = require("../services/UserService");
const authMiddleware = require("../middleware/authMiddleware");

// Signup
router.post("/signup", (req, res) => {
  userService.signUpUser(req, res);
});

// Login
router.post("/login", async (req, res) => {
  const result = await userService.loginUser(req);
  res.send(result);
});

// Protect routes below this line
router.use(authMiddleware);

// Public profile (no auth needed)
router.get("/user/public/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getPublicProfile(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Private profile (auth required)
router.get("/private-profile", async (req, res) => {
  try {
    const userId = req.user._id; // authenticated user's ID
    const user = await userService.getPrivateProfile(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
