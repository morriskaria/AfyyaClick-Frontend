// src/components/Dashboard.jsx
import BookAppointment from './BookAppointment';
import MyAppointments from './MyAppointments';
import MedicalRecords from './MedicalRecords';
import DoctorAppointments from './DoctorAppointments';
import AddRecord from './AddRecord';
import ViewRecords from './ViewRecords';

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
  const getPatientName = (id) => users.find(u => u.id === id)?.name || 'Unknown';
  const getDoctorName = (id) => users.find(u => u.id === id)?.name || 'Unknown';

  const renderContent = () => {
    switch (activeTab) {
      case 'book-appointment':
        return (
          <BookAppointment
            doctors={users.filter(u => u.role === 'doctor')}
            onBookAppointment={onBookAppointment}
          />
        );
      case 'my-appointments':
        return (
          <MyAppointments
            appointments={appointments.filter(apt => apt.patientId === currentUser.id)}
            getDoctorName={getDoctorName}
          />
        );
      case 'my-records':
        return (
          <MedicalRecords
            records={patientRecords.filter(rec => rec.patientId === currentUser.id)}
          />
        );
      case 'doctor-appointments':
        return (
          <DoctorAppointments
            appointments={appointments.filter(apt => apt.doctorId === currentUser.id)}
            getPatientName={getPatientName}
            onUpdateAppointmentStatus={onUpdateAppointmentStatus}
          />
        );
      case 'add-record':
        return (
          <AddRecord
            patients={users.filter(u => u.role === 'patient')}
            onAddRecord={onAddRecord}
          />
        );
      case 'view-records':
        return (
          <ViewRecords
            records={patientRecords}
            getPatientName={getPatientName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      {renderContent()}
    </div>
  );
};

export default Dashboard;