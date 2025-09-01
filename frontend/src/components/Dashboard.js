import React, { useEffect, useState } from 'react';
import { getAlerts, createAlert, deleteAlert } from '../api/alert';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchAlerts = async () => {
    const data = await getAlerts(token);
    setAlerts(data);
  };

  const handleCreateAlert = async () => {
    await createAlert(alertMessage, token);
    setAlertMessage('');
    fetchAlerts();
  };

  const handleDeleteAlert = async (id) => {
    await deleteAlert(id, token);
    fetchAlerts();
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Enter alert message"
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
      />
      <button onClick={handleCreateAlert}>Create Alert</button>
      <ul>
        {alerts.map((alert) => (
          <li key={alert._id}>
            {alert.alertMessage} 
            <button onClick={() => handleDeleteAlert(alert._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
