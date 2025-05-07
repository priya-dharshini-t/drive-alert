const Alert = require('../models/Alert');

// Create a new alert
exports.createAlert = async (req, res) => {
    const { alertMessage } = req.body;

    try {
        const alert = await Alert.create({
            userId: req.user.id, // User ID from the middleware
            alertMessage,
        });

        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create alert', error: error.message });
    }
};

// Get all alerts for a specific user
exports.getUserAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ userId: req.user.id }).sort({ timestamp: -1 });

        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch alerts', error: error.message });
    }
};

// Delete a specific alert by its ID
exports.deleteAlert = async (req, res) => {
    const { id } = req.params;

    try {
        const alert = await Alert.findById(id);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        if (alert.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this alert' });
        }

        await alert.remove();
        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete alert', error: error.message });
    }
};
