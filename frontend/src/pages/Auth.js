import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../AuthContext';

axios.defaults.withCredentials = true;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
        if (/^\d{0,10}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!isLogin) {
      if (!form.name.trim()) {
        alert("Please enter your name");
        return;
      }
      if (form.phone.length !== 10) {
        alert("Phone number must be exactly 10 digits");
        return;
      }
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    const url = `http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`;

    try {
      const res = await axios.post(url, form);
      alert(res.data.message);

      if (isLogin && res.data.user) {
        login(res.data.user);
        navigate('/Home');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-wrapper">
      <h2>{isLogin ? 'Login to Savory Cart' : 'Create Your Savory Account'}</h2>

      {!isLogin && (
        <>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            maxLength="10"
          />
        </>
      )}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      {!isLogin && (
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      )}

      <button onClick={handleSubmit}>
        {isLogin ? 'Login' : 'Register'}
      </button>

      <div
        className="toggle"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'New user? Register here' : 'Already have an account? Login'}
      </div>
    </div>
  );
};

export default Login;
