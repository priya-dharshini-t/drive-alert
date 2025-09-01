import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [monitoring, setMonitoring] = useState(false);
  const startMonitoring = async () => {
    if (monitoring) return; // Prevent multiple requests
    setMonitoring(true);
  
    try {
      const response = await fetch("http://localhost:5001/start-monitoring");
      ; // Ensure correct API URL
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      const data = await response.json();
      console.log("Monitoring Response:", data);
      alert(data.message || "Monitoring started!");
    } catch (error) {
      console.error("Error starting monitoring:", error);
      alert("Failed to start monitoring");
      setMonitoring(false); // Reset button state on failure
    }
  };
  

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <h1>Welcome to the Drive Alert's Dashboard</h1>
        

        <button onClick={startMonitoring} disabled={monitoring} className="monitor-button">
          {monitoring ? "Monitoring Started" : "Start Monitoring"}
        </button>

        {/* 🔥 Embed the Video Feed in the Center */}
        {monitoring && (
          <div className="video-container">
            <h2>Live Monitoring</h2>
            <img src="http://localhost:5001/video_feed" alt="Live Camera Feed" className="video-feed" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
