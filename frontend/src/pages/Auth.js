import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

axios.defaults.withCredentials = true;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const url = `http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`;
    try {
      const res = await axios.post(url, form);
      alert(res.data.message);

      // Redirect after successful login
      if (isLogin && res.data.user) {
        // Optionally store user session
        localStorage.setItem('user', JSON.stringify(res.data.user));
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
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
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
