const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const historyRoutes = require("./routes/history");
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alert");
const historyRoutes = require("./routes/history");

const settingsRoutes = require("./routes/settings");
// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api", historyRoutes);
app.use("/api/settings", settingsRoutes);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Load SSL certificate and key (Ensure you moved them correctly)
const options = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

// Start HTTPS server
const PORT = process.env.PORT || 5002; // Using 5001 to avoid conflict with Flask
https.createServer(options, app).listen(PORT, () => {
  console.log(`Secure Express API running at https://localhost:${PORT}`);
});

