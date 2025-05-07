const express = require("express");
const router = express.Router();
const MessageHistory = require("../models/Message");
const sendEmail = require("../utils/sendEmail");  // Ensure you have this utility function

router.post("/send-otp", async (req, res) => {
    const { recipient, messageType } = req.body; // recipient: phone/email, messageType: OTP, etc.

    try {
        // Simulate OTP sending (replace this with actual logic)
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(`Sending OTP ${otp} to ${recipient}`);

        // Save history in MongoDB
        const newMessage = new MessageHistory({
            recipient,
            messageType,
            status: "Sent"
        });
        await newMessage.save();

        res.json({ message: "OTP sent successfully", otp });
    } catch (error) {
        console.error("Error sending OTP:", error);

        // Save failure attempt
        await new MessageHistory({
            recipient,
            messageType,
            status: "Failed"
        }).save();

        res.status(500).json({ message: "Failed to send OTP" });
    }
});

module.exports = router;
