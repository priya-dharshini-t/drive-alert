import { useState, useEffect } from "react";
import "../styles/SettingsPage.css"; // Import the external CSS file

const SettingsPage = () => {
    const [language, setLanguage] = useState("English");
    const [notifications, setNotifications] = useState(true);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("userSettings"));
        if (savedSettings) {
            setLanguage(savedSettings.language);
            setNotifications(savedSettings.notifications);
            setTheme(savedSettings.theme);
        }
    }, []);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleSave = () => {
        const settings = { language, notifications, theme };
        localStorage.setItem("userSettings", JSON.stringify(settings));
        alert("✅ Settings Saved!");
    };

    return (
        <div className="settings-container">
            <h2 className="settings-title">⚙️ Settings</h2>

            <label className="settings-label">
                🌍 Language:
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="settings-select"
                >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </label>

            <label className="settings-checkbox">
                <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                />
                🔔 Enable Notifications
            </label>

            <label className="settings-label">
                🎨 Theme:
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="settings-select"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>

            <button onClick={handleSave} className="settings-button">
                💾 Save Settings
            </button>
        </div>
    );
};

export default SettingsPage;
