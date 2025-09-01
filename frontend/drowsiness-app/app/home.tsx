import React, { useState } from "react";
import Sidebar from "../components/Sidebar";


const Home: React.FC = () => {
  const [monitoring, setMonitoring] = useState<boolean>(false);

  const startMonitoring = async () => {
    if (monitoring) return; // Prevent multiple requests
    setMonitoring(true);

    try {
      const response = await fetch("http://127.0.0.1:5001/start-monitoring");
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      const data = await response.json();
      console.log("Monitoring Response:", data);
      alert(data.message || "Monitoring started!");
    } catch (error) {
      console.error("Error starting monitoring:", error);
      alert("Failed to start monitoring");
      setMonitoring(false);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <h1>Welcome to the Dashboard</h1>
        <p>This is the main area after logging in.</p>

        <button onClick={startMonitoring} disabled={monitoring} className="monitor-button">
          {monitoring ? "Monitoring Started" : "Start Monitoring"}
        </button>

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
