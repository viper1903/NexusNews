import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import { useAuth } from '../hooks/useAuth'; // Import useAuth
import PasswordInput from '../components/PasswordInput'; // Import new component
import './Form.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      // Step 1: Register the user
      await authService.register(formData);

      // **CHANGE 3: Automatically log in the user after successful registration**
      const loginResponse = await authService.login({
        username: formData.username,
        password: formData.password,
      });
      
      if (loginResponse.data && loginResponse.data.token) {
        login(loginResponse.data.token, { 
          id: loginResponse.data.userId, 
          username: loginResponse.data.username 
        });
        navigate('/'); // Redirect to home page
      }

    } catch (err) {
      setError('Registration failed. Username or email may already be taken.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          {/* **CHANGE 1: Use the PasswordInput component** */}
          <PasswordInput
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;