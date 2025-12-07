import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Stethoscope, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Activity,
  Heart,
  AlertCircle
} from 'lucide-react';

// Mock Components - Replace these with your actual components
const BookAppointment = ({ doctors, onBookAppointment }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">Book Appointment</h3>
    <p className="text-gray-600">Book appointment component content here</p>
  </div>
);

const MyAppointments = ({ appointments, getDoctorName }) => (
  <div className="space-y-4">
    {appointments.map((apt) => (
      <div key={apt.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-800">Dr. {getDoctorName(apt.doctorId)}</h4>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {apt.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {apt.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {apt.time}
          </span>
        </div>
        {apt.reason && (
          <p className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
            <span className="font-medium">Reason:</span> {apt.reason}
          </p>
        )}
      </div>
    ))}
  </div>
);

const MedicalRecords = ({ records }) => (
  <div className="space-y-4">
    {records.map((record) => (
      <div key={record.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Medical Record #{record.id}
          </h4>
          <span className="text-sm text-gray-500">{record.date}</span>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">Diagnosis</p>
            <p className="text-sm text-blue-800">{record.diagnosis}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-900 mb-1">Treatment</p>
            <p className="text-sm text-gray-700">{record.treatment}</p>
          </div>
          {record.notes && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-1">Notes</p>
              <p className="text-sm text-gray-700">{record.notes}</p>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

const DoctorAppointments = ({ appointments, getPatientName, onUpdateAppointmentStatus }) => (
  <div className="space-y-4">
    {appointments.map((apt) => (
      <div key={apt.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" />
            {getPatientName(apt.patientId)}
          </h4>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {apt.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {apt.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {apt.time}
          </span>
        </div>
        {apt.reason && (
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mb-4">
            <span className="font-medium">Reason:</span> {apt.reason}
          </p>
        )}
        {apt.status === 'pending' && (
          <div className="flex gap-3">
            <button
              onClick={() => onUpdateAppointmentStatus(apt.id, 'confirmed')}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Confirm
            </button>
            <button
              onClick={() => onUpdateAppointmentStatus(apt.id, 'cancelled')}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
);

const AddRecord = ({ patients, onAddRecord }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Patient Record</h3>
    <p className="text-gray-600">Add record component content here</p>
  </div>
);

const ViewRecords = ({ records, getPatientName }) => (
  <div className="space-y-4">
    {records.map((record) => (
      <div key={record.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            {getPatientName(record.patientId)}
          </h4>
          <span className="text-sm text-gray-500">{record.date}</span>
        </div>
        <div className="space-y-3">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-1">Diagnosis</p>
            <p className="text-sm text-purple-800">{record.diagnosis}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-900 mb-1">Treatment</p>
            <p className="text-sm text-gray-700">{record.treatment}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Main Dashboard Component
const Dashboard = ({
  activeTab,
  currentUser,
  users,
  appointments,
  patientRecords,
  onBookAppointment,
  onAddRecord,
  onUpdateAppointmentStatus,
}) => {
  const getPatientName = (id) => users?.find(u => u.id === id)?.name || 'Unknown';
  const getDoctorName = (id) => users?.find(u => u.id === id)?.name || 'Unknown';

  // Get dashboard stats
  const getStats = () => {
    if (currentUser.role === 'patient') {
      const myAppointments = appointments?.filter(apt => apt.patientId === currentUser.id) || [];
      const myRecords = patientRecords?.filter(rec => rec.patientId === currentUser.id) || [];
      return {
        totalAppointments: myAppointments.length,
        upcomingAppointments: myAppointments.filter(apt => apt.status === 'confirmed').length,
        medicalRecords: myRecords.length,
      };
    } else if (currentUser.role === 'doctor') {
      const myAppointments = appointments?.filter(apt => apt.doctorId === currentUser.id) || [];
      return {
        totalAppointments: myAppointments.length,
        pendingAppointments: myAppointments.filter(apt => apt.status === 'pending').length,
        confirmedAppointments: myAppointments.filter(apt => apt.status === 'confirmed').length,
      };
    }
    return {};
  };

  const stats = getStats();

  const renderContent = () => {
    switch (activeTab) {
      case 'book-appointment':
        return (
          <BookAppointment
            doctors={users?.filter(u => u.role === 'doctor') || []}
            onBookAppointment={onBookAppointment}
          />
        );
      case 'my-appointments':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <Calendar className="w-7 h-7 text-blue-600" />
                My Appointments
              </h2>
              <p className="text-gray-600">View and manage your scheduled appointments</p>
            </div>
            {appointments?.filter(apt => apt.patientId === currentUser.id).length > 0 ? (
              <MyAppointments
                appointments={appointments.filter(apt => apt.patientId === currentUser.id)}
                getDoctorName={getDoctorName}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Yet</h3>
                <p className="text-gray-600 mb-6">You haven't booked any appointments yet.</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        );
      case 'my-records':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <FileText className="w-7 h-7 text-blue-600" />
                Medical Records
              </h2>
              <p className="text-gray-600">Your complete medical history and records</p>
            </div>
            {patientRecords?.filter(rec => rec.patientId === currentUser.id).length > 0 ? (
              <MedicalRecords
                records={patientRecords.filter(rec => rec.patientId === currentUser.id)}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Medical Records</h3>
                <p className="text-gray-600">You don't have any medical records yet.</p>
              </div>
            )}
          </div>
        );
      case 'doctor-appointments':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <Stethoscope className="w-7 h-7 text-green-600" />
                Patient Appointments
              </h2>
              <p className="text-gray-600">Manage your patient consultations</p>
            </div>
            {appointments?.filter(apt => apt.doctorId === currentUser.id).length > 0 ? (
              <DoctorAppointments
                appointments={appointments.filter(apt => apt.doctorId === currentUser.id)}
                getPatientName={getPatientName}
                onUpdateAppointmentStatus={onUpdateAppointmentStatus}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments</h3>
                <p className="text-gray-600">You don't have any patient appointments scheduled.</p>
              </div>
            )}
          </div>
        );
      case 'add-record':
        return (
          <AddRecord
            patients={users?.filter(u => u.role === 'patient') || []}
            onAddRecord={onAddRecord}
          />
        );
      case 'view-records':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <FileText className="w-7 h-7 text-purple-600" />
                All Patient Records
              </h2>
              <p className="text-gray-600">View all medical records in the system</p>
            </div>
            {patientRecords?.length > 0 ? (
              <ViewRecords
                records={patientRecords}
                getPatientName={getPatientName}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Records Available</h3>
                <p className="text-gray-600">There are no medical records in the system yet.</p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Dashboard</h3>
            <p className="text-gray-600">Select an option from the sidebar to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header with Stats */}
      {activeTab === 'book-appointment' || activeTab === 'my-appointments' || activeTab === 'doctor-appointments' ? (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 mb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-3 rounded-full">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="text-blue-100">
                  {currentUser.role === 'patient' ? 'Manage your health appointments and records' : 
                   currentUser.role === 'doctor' ? 'Your patient consultations dashboard' : 
                   'System administration panel'}
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {currentUser.role === 'patient' && (
                <>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Appointments</p>
                        <p className="text-3xl font-bold text-white">{stats.totalAppointments}</p>
                      </div>
                      <Calendar className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Upcoming</p>
                        <p className="text-3xl font-bold text-white">{stats.upcomingAppointments}</p>
                      </div>
                      <Clock className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Medical Records</p>
                        <p className="text-3xl font-bold text-white">{stats.medicalRecords}</p>
                      </div>
                      <FileText className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                </>
              )}
              {currentUser.role === 'doctor' && (
                <>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Appointments</p>
                        <p className="text-3xl font-bold text-white">{stats.totalAppointments}</p>
                      </div>
                      <Calendar className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Pending</p>
                        <p className="text-3xl font-bold text-white">{stats.pendingAppointments}</p>
                      </div>
                      <AlertCircle className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Confirmed</p>
                        <p className="text-3xl font-bold text-white">{stats.confirmedAppointments}</p>
                      </div>
                      <CheckCircle className="w-10 h-10 text-white opacity-80" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {renderContent()}
      </div>
    </div>
  );
};

// Demo Component
const DashboardDemo = () => {
  const [activeTab, setActiveTab] = useState('my-appointments');
  
  const mockCurrentUser = {
    id: 1,
    name: 'John Smith',
    role: 'patient',
    email: 'john@example.com'
  };

  const mockUsers = [
    { id: 1, name: 'John Smith', role: 'patient' },
    { id: 2, name: 'Dr. Sarah Johnson', role: 'doctor' },
    { id: 3, name: 'Dr. Michael Chen', role: 'doctor' },
  ];

  const mockAppointments = [
    {
      id: 1,
      patientId: 1,
      doctorId: 2,
      date: '2025-11-25',
      time: '10:00 AM',
      reason: 'Regular checkup',
      status: 'confirmed'
    },
    {
      id: 2,
      patientId: 1,
      doctorId: 3,
      date: '2025-11-28',
      time: '2:00 PM',
      reason: 'Follow-up consultation',
      status: 'pending'
    },
  ];

  const mockRecords = [
    {
      id: 1,
      patientId: 1,
      diagnosis: 'Seasonal allergies',
      treatment: 'Antihistamines prescribed',
      notes: 'Patient advised to avoid outdoor activities during high pollen count',
      date: '2025-11-15'
    },
  ];

  return (
    <div>
      <Dashboard
        activeTab={activeTab}
        currentUser={mockCurrentUser}
        users={mockUsers}
        appointments={mockAppointments}
        patientRecords={mockRecords}
        onBookAppointment={(data) => console.log('Book:', data)}
        onAddRecord={(data) => console.log('Add Record:', data)}
        onUpdateAppointmentStatus={(id, status) => console.log('Update:', id, status)}
      />
    </div>
  );
};

export default DashboardDemo;