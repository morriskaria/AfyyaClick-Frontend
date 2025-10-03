// src/App.jsx
import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import { api } from './services/api';
import './app.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load initial data from backend
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load doctors and patients from backend
      const [doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
        api.getDoctors(),
        api.getPatients(),
        api.getAppointments()
      ]);

      if (doctorsRes.success) {
        const backendDoctors = doctorsRes.doctors.map(doc => ({
          id: doc.doctor_id,
          email: doc.email || `${doc.name.toLowerCase().replace(' ', '.')}@hospital.com`,
          password: 'doc123',
          role: 'doctor',
          name: doc.name,
          specialty: doc.specialization
        }));
        
        // Use demo users as fallback, combine with backend data
        const demoUsers = [
          { id: 1, email: 'doctor@hospital.com', password: 'doc123', role: 'doctor', name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
          { id: 2, email: 'patient@hospital.com', password: 'pat123', role: 'patient', name: 'John Doe', dob: '1990-05-15' }
        ];
        
        setUsers([...demoUsers, ...backendDoctors]);
      }

      if (appointmentsRes.success) {
        const backendAppointments = appointmentsRes.appointments.map(apt => ({
          id: apt.id,
          patientId: apt.patient_id,
          doctorId: apt.doctor_id,
          date: apt.appointment_date,
          time: apt.appointment_time,
          reason: 'Medical Consultation', // You might want to add this field to your backend
          status: apt.status.toLowerCase()
        }));
        
        // Combine with demo appointments
        const demoAppointments = [
          { id: 1, patientId: 2, doctorId: 1, date: '2025-10-05', time: '10:00', reason: 'Regular Checkup', status: 'confirmed' },
          { id: 2, patientId: 2, doctorId: 1, date: '2025-10-10', time: '14:00', reason: 'Follow-up', status: 'pending' }
        ];
        
        setAppointments([...demoAppointments, ...backendAppointments]);
      }

    } catch (error) {
      console.error('Error loading initial data:', error);
      // Fallback to demo data if backend is not available
      setUsers([
        { id: 1, email: 'doctor@hospital.com', password: 'doc123', role: 'doctor', name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
        { id: 2, email: 'patient@hospital.com', password: 'pat123', role: 'patient', name: 'John Doe', dob: '1990-05-15' }
      ]);
      setAppointments([
        { id: 1, patientId: 2, doctorId: 1, date: '2025-10-05', time: '10:00', reason: 'Regular Checkup', status: 'confirmed' },
        { id: 2, patientId: 2, doctorId: 1, date: '2025-10-10', time: '14:00', reason: 'Follow-up', status: 'pending' }
      ]);
    }

    // Patient records remain as demo data for now
    setPatientRecords([
      { id: 1, patientId: 2, date: '2025-09-15', diagnosis: 'Hypertension', treatment: 'Prescribed medication', notes: 'Monitor blood pressure weekly' }
    ]);
  };

  const handleLogin = async (loginData) => {
    try {
      setLoading(true);
      
      // Try backend login first
      const backendResponse = await api.login(loginData.email);
      
      if (backendResponse.success) {
        const backendUser = backendResponse.user;
        setCurrentUser(backendUser);
        setActiveTab(backendUser.role === 'doctor' ? 'doctor-appointments' : 'book-appointment');
        return;
      }
      
      // Fallback to demo login if backend fails
      const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
      
      if (user) {
        setCurrentUser(user);
        setActiveTab(user.role === 'doctor' ? 'doctor-appointments' : 'book-appointment');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to demo login
      const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
      
      if (user) {
        setCurrentUser(user);
        setActiveTab(user.role === 'doctor' ? 'doctor-appointments' : 'book-appointment');
      } else {
        alert('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (registerData) => {
    try {
      setLoading(true);
      
      if (users.find(u => u.email === registerData.email)) {
        alert('Email already exists');
        return;
      }
      
      // Register in backend based on role
      if (registerData.role === 'patient') {
        const patientData = {
          first_name: registerData.name,
          email: registerData.email,
          gender: 'Unknown', // You might want to add this to your form
          phone: '' // You might want to add this to your form
        };
        
        const result = await api.registerPatient(patientData);
        if (result.success) {
          const newUser = {
            id: result.patient.id,
            ...registerData
          };
          setUsers([...users, newUser]);
          alert('Registration successful! Please login.');
          setActiveTab('login');
        } else {
          alert('Registration failed: ' + result.error);
        }
      } else if (registerData.role === 'doctor') {
        const doctorData = {
          doctor_id: `DOC${Date.now()}`,
          name: registerData.name,
          specialization: registerData.specialty,
          email: registerData.email,
          phone: ''
        };
        
        const result = await api.registerDoctor(doctorData);
        if (result.success) {
          const newUser = {
            id: result.doctor.doctor_id,
            ...registerData
          };
          setUsers([...users, newUser]);
          alert('Registration successful! Please login.');
          setActiveTab('login');
        } else {
          alert('Registration failed: ' + result.error);
        }
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (appointmentData) => {
    try {
      // Send to backend
      const backendAppointment = {
        patient_id: currentUser.id,
        doctor_id: appointmentData.doctorId.toString(),
        appointment_date: appointmentData.date,
        appointment_time: appointmentData.time,
        status: 'Scheduled'
      };
      
      const result = await api.createAppointment(backendAppointment);
      
      if (result.success) {
        // Also update local state
        const newAppointment = {
          id: result.appointment.id,
          patientId: currentUser.id,
          ...appointmentData,
          doctorId: parseInt(appointmentData.doctorId),
          status: 'pending'
        };
        setAppointments([...appointments, newAppointment]);
        alert('Appointment booked successfully!');
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Fallback to local state
      const newAppointment = {
        id: appointments.length + 1,
        patientId: currentUser.id,
        ...appointmentData,
        doctorId: parseInt(appointmentData.doctorId),
        status: 'pending'
      };
      setAppointments([...appointments, newAppointment]);
      alert('Appointment booked successfully! (Local storage)');
      return true;
    }
  };

  const handleAddRecord = async (recordData) => {
    try {
      const newRecord = {
        id: patientRecords.length + 1,
        ...recordData,
        patientId: parseInt(recordData.patientId),
        date: new Date().toISOString().split('T')[0]
      };
      setPatientRecords([...patientRecords, newRecord]);
      alert('Patient record added successfully!');
      return true;
    } catch (error) {
      alert('Failed to add record: ' + error.message);
      return false;
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status } : apt
      ));
      return true;
    } catch (error) {
      alert('Failed to update appointment: ' + error.message);
      return false;
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('login');
  };

  if (!currentUser) {
    return <Auth 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogin={handleLogin}
      onRegister={handleRegister}
      loading={loading}
    />;
  }

  return (
    <div className="app-container">
      <div className="app-content">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <Navigation 
          currentUser={currentUser} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <Dashboard
          activeTab={activeTab}
          currentUser={currentUser}
          users={users}
          appointments={appointments}
          patientRecords={patientRecords}
          onBookAppointment={handleBookAppointment}
          onAddRecord={handleAddRecord}
          onUpdateAppointmentStatus={updateAppointmentStatus}
        />
      </div>
    </div>
  );
};

export default App;