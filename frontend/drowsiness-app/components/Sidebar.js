import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfileImage(storedProfile.profileImage || "https://via.placeholder.com/150");
    }
  }, []);

  return (
    <div className="sidebar-container">
      {/* Hamburger Button */}
      <button className="open-btn" onClick={() => setSidebarOpen(true)}>☰</button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Close Button */}
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>&times;</button>

       
        {/* Navigation Links */}
        <nav className="sidebar-links">
          <Link to="/profile" className="sidebar-link" onClick={() => setSidebarOpen(false)}>👤 Profile</Link>
          <Link to="/history" className="sidebar-link" onClick={() => setSidebarOpen(false)}>📜 History</Link>
          <Link to="/settings" className="sidebar-link" onClick={() => setSidebarOpen(false)}>⚙️ Settings</Link>
        </nav>

        {/* Logout Button */}
        <button className="logout-btn" onClick={() => navigate("/login")}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
