const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    recipient: String,  // Email or phone number
    messageType: String, // "OTP", "Notification", etc.
    status: String, // "Sent", "Failed"
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
