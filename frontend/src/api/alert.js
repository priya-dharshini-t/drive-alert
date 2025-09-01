import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5002/api' });

export const createAlert = (alertMessage, token) => 
  API.post('/alert', { alertMessage }, { headers: { Authorization: `Bearer ${token}` } });

export const getAlerts = (token) => 
  API.get('/alert', { headers: { Authorization: `Bearer ${token}` } });

export const deleteAlert = (id, token) => 
  API.delete(`/alert/${id}`, { headers: { Authorization: `Bearer ${token}` } });
