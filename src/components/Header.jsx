// src/components/Header.jsx
import { Stethoscope, LogOut } from 'lucide-react';

const Header = ({ currentUser, onLogout }) => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-left">
          <Stethoscope className="header-icon" />
          <div>
            <h1 className="header-title">Afyyaclick</h1>
            <p className="header-subtitle">Welcome, {currentUser.name} ({currentUser.role})</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="btn-danger"
        >
          <LogOut className="btn-icon" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;