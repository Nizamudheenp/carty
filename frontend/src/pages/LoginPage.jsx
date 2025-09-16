import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import { showToast } from '../utils/toast';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData);
      const token = response.data.token;
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token);
      showToast('success', 'login successful');
      setTimeout(() => {
        navigate('/');
      }, 500);

    } catch (err) {
      showToast('error', 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div className="auth-footer">
        Don’t have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;
