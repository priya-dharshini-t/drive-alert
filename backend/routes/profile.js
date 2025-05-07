const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get Profile
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update Profile
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
