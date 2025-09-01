import { useState } from "react";

const SettingsForm = ({ settings, onSave }) => {
    const [formData, setFormData] = useState(settings);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                🌍 Language:
                <select name="language" value={formData.language} onChange={handleChange}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </label>

            <label>
                🔔 Enable Notifications:
                <input 
                    type="checkbox" 
                    name="notifications" 
                    checked={formData.notifications} 
                    onChange={handleChange} 
                />
            </label>

            <label>
                🎨 Theme:
                <select name="theme" value={formData.theme} onChange={handleChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>

            <button type="submit">💾 Save Settings</button>
        </form>
    );
};

export default SettingsForm;
