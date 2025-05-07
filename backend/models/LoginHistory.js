const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true },
  emailSent: { type: Boolean, required: true },
});

module.exports = mongoose.model("LoginHistory", loginHistorySchema);
