// src/api/api.js
const API_BASE = "http://localhost:5001/api";

const api = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    let data;
    try {
      data = await res.json();
    } catch {
      return { success: false, error: 'Invalid response' };
    }

    return res.ok
      ? { success: true, data }
      : { success: false, error: data.error || 'Request failed' };
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, error: 'Network error' };
  }
};

export const bookingAPI = {
  create: (data) => api('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getAvailability: (date) => api(`/bookings/availability?date=${date}`),
};