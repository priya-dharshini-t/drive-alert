const express = require("express");
const router = express.Router();
const MessageHistory = require("../models/Message");

// Fetch message sending history
router.get("/messages", async (req, res) => {
    try {
        const history = await MessageHistory.find().sort({ timestamp: -1 }); // Show latest first
        if (history.length === 0) {
            return res.status(404).json({ message: "⚠️ No message history available." });
        }
        res.json(history);
    } catch (error) {
        console.error("Error fetching message history:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
