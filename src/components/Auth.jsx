// src/components/Auth.jsx

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = ({ activeTab, setActiveTab, onLogin, onRegister, loading }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          
          <h1 className="auth-title">AfyyaClick</h1>
          <p className="auth-subtitle">We actually care!</p>
        </div>

        <div className="auth-tabs">
          <button
            onClick={() => setActiveTab('login')}
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' ? (
          <LoginForm onLogin={onLogin} loading={loading} />
        ) : (
          <RegisterForm onRegister={onRegister} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Auth;