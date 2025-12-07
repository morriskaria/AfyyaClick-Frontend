import React, { useState } from 'react';
import { Mail, Lock, User, Phone, UserPlus, LogIn, Stethoscope, Heart } from 'lucide-react';

// LoginForm Component
const LoginForm = ({ onLogin, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <Mail className="w-4 h-4 text-blue-600" />
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={loading}
          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <Lock className="w-4 h-4 text-blue-600" />
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          disabled={loading}
          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">Remember me</span>
        </label>
        <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            Sign In
          </>
        )}
      </button>
    </div>
  );
};

// RegisterForm Component
const RegisterForm = ({ onRegister, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'patient'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onRegister(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <User className="w-4 h-4 text-blue-600" />
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          disabled={loading}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <Mail className="w-4 h-4 text-blue-600" />
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={loading}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <Phone className="w-4 h-4 text-blue-600" />
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          disabled={loading}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <Stethoscope className="w-4 h-4 text-blue-600" />
          Register As
        </label>
        <div className="relative">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 appearance-none cursor-pointer disabled:opacity-60"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <Lock className="w-4 h-4 text-blue-600" />
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          disabled={loading}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <Lock className="w-4 h-4 text-blue-600" />
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          disabled={loading}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 disabled:opacity-60"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Creating account...
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            Create Account
          </>
        )}
      </button>
    </div>
  );
};

// Main Auth Component
const Auth = ({ activeTab, setActiveTab, onLogin, onRegister, loading }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">AfyyaClick</h1>
              <p className="text-blue-100 text-lg font-medium">We actually care!</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                activeTab === 'login'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                Login
              </div>
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                activeTab === 'register'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" />
                Register
              </div>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {activeTab === 'login' ? (
              <LoginForm onLogin={onLogin} loading={loading} />
            ) : (
              <RegisterForm onRegister={onRegister} loading={loading} />
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact us at{' '}
            <a href="mailto:support@afyyaclick.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@afyyaclick.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Demo Component
const AuthDemo = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);

  const handleLogin = (formData) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Login:', formData);
      alert('Login successful!');
      setLoading(false);
    }, 2000);
  };

  const handleRegister = (formData) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Register:', formData);
      alert('Registration successful!');
      setLoading(false);
    }, 2000);
  };

  return (
    <Auth
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogin={handleLogin}
      onRegister={handleRegister}
      loading={loading}
    />
  );
};

export default AuthDemo;