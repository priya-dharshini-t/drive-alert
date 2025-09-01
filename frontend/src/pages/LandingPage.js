// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa"; // Import icons
import "../styles/landingPage.css"; // Ensure CSS is linked

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Title with Car and Alert Icons */}
      <h1 className="landing-title">
         Drive Alert <FaExclamationTriangle className="icon" />
      </h1>
      <p className="landing-subtitle">Stay alert, Stay safe !</p>
      
      {/* Welcome Button */}
      <button
        onClick={() => navigate("/login")}
        className="landing-button"
      >
        Welcome to Drive Alert
      </button>
    </div>
  );
};

export default LandingPage;
