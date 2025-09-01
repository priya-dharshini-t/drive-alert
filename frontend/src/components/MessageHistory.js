import { useEffect, useState } from "react";
import axios from "axios";

const MessageHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/messages") // Adjust API URL if needed
            .then(response => {
                setHistory(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching message history:", err);
                setError("⚠️ No message history available.");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>📜 Message Sending History</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : history.length === 0 ? (
                <p>⚠️ No message history available.</p>
            ) : (
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            <strong>{new Date(item.timestamp).toLocaleString()}</strong> - 
                            Message Type: {item.messageType} to {item.recipient} ({item.status})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MessageHistory;
