// src/services/api.js
const BASE_URL = 'http://127.0.0.1:5000';

export const api = {
  // Auth endpoints
  async login(email) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  async registerPatient(patientData) {
    const response = await fetch(`${BASE_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    return response.json();
  },

  async registerDoctor(doctorData) {
    const response = await fetch(`${BASE_URL}/createdoctors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    return response.json();
  },

  // Data fetching endpoints
  async getPatients() {
    const response = await fetch(`${BASE_URL}/patients`);
    return response.json();
  },

  async getDoctors() {
    try {
      const response = await fetch(`${BASE_URL}/doctors`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  async getAppointments() {
    const response = await fetch(`${BASE_URL}/appointments`);
    return response.json();
  },

  // Creation endpoints
  async createAppointment(appointmentData) {
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    return response.json();
  },
};