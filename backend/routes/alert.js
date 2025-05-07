const express = require('express');
const { createAlert, getUserAlerts, deleteAlert } = require('../controllers/alertController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new alert (protected route)
router.post('/', protect, createAlert);

// Get all alerts for the logged-in user (protected route)
router.get('/', protect, getUserAlerts);

// Delete a specific alert by ID (protected route)
router.delete('/:id', protect, deleteAlert);

module.exports = router;
