const express = require("express");
const router = express.Router();

let userSettings = {
    language: "English",
    notifications: true,
    theme: "light"
};

// GET settings
router.get("/", (req, res) => {
    res.json(userSettings);
});

// POST (Update) settings
router.post("/", (req, res) => {
    userSettings = { ...userSettings, ...req.body };
    res.json(userSettings);
});

module.exports = router;
