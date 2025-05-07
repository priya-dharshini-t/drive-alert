const LoginHistory = require("../models/LoginHistory");

const saveLoginHistory = async (message, emailSent) => {
  try {
    await LoginHistory.create({ message, emailSent });
    console.log("Login history saved");
  } catch (error) {
    console.error("Error saving login history:", error);
  }
};

// Example usage when login is successful
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Assume password verification is successful
    const emailSent = true; // Assume an email was sent

    // Save login history
    await saveLoginHistory("Login Successful", emailSent);

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
