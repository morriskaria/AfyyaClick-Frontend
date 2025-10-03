// src/components/Navigation.jsx
const Navigation = ({ currentUser, activeTab, setActiveTab }) => {
  const patientTabs = [
    { id: 'book-appointment', label: 'Book Appointment' },
    { id: 'my-appointments', label: 'My Appointments' },
    { id: 'my-records', label: 'Medical Records' },
  ];

  const doctorTabs = [
    { id: 'doctor-appointments', label: 'Appointments' },
    { id: 'add-record', label: 'Add Record' },
    { id: 'view-records', label: 'Patient Records' },
  ];

  const tabs = currentUser.role === 'patient' ? patientTabs : doctorTabs;

  return (
    <div className="nav-container">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;