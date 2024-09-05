import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      
      if (response.data['0'].Success === 'true' && response.data['0'].Message === 'Valid User') {
        navigate('/dashboard');
      } else {
        setError('Invalid user or wrong credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } 
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h6 className="app-title"><span>Online Project Management</span></h6>
      <div className="login-container">
        <h2>Login to get started</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          <button className='log-btn ' type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
