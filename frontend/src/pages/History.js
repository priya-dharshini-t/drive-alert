import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const API_URL = "http://192.168.29.147:5001/api/login-history"; // Use your actual server IP & port

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching login history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>📜 Login History</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {history.length > 0 ? (
          history.map((entry) => (
            <li key={entry._id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              <strong>📅 Date & Time:</strong> {new Date(entry.timestamp).toLocaleString()} <br />
              <strong>📢 Message:</strong> {entry.message} <br />
              <strong>📧 Email Sent:</strong> {entry.emailSent ? "✅ Yes" : "❌ No"}
            </li>
          ))
        ) : (
          <p>⚠️ No history available.</p>
        )}
      </ul>
    </div>
  );
};

export default HistoryPage;
