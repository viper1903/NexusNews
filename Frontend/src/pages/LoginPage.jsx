import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import { useAuth } from '../hooks/useAuth';
import PasswordInput from '../components/PasswordInput'; // Import new component
import './Form.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login({ username, password });
      if (response.data && response.data.token) {
        login(response.data.token, { id: response.data.userId, username: response.data.username });
        navigate('/'); // **CHANGE 2: Redirect to home page**
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text" id="username" value={username}
            onChange={(e) => setUsername(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          {/* **CHANGE 1: Use the PasswordInput component** */}
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;