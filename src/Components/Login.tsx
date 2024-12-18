import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setError('');
  
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }
  
    try {
      console.log('Attempting login with:', { email, password });
      const response = await axiosInstance.post('/api/auth/login', { email, password });
  
      console.log('Login response:', response.data);
  
      const userId = response?.data?.user?.id; 
      const role = response?.data?.user?.role;
      const token = response?.data?.token; // Assuming token is sent back from backend
  
      console.log('User ID received:', userId);
      console.log('Role received:', role);
      console.log('Token received:', token);
  
      // Save token and userId to localStorage
      if (token) {
        localStorage.setItem('token', token);
      }
      if (userId) {
        localStorage.setItem('userId', userId);
      }
  
      // Redirect based on role
      if (role === 'admin') {
        console.log('Navigating to admin dashboard');
        navigate('/admindashboard');
      } else if (role === 'user') {
        console.log('Navigating to user dashboard');
        navigate('/dashboard');
      } else {
        console.warn('Unhandled role:', role);
      }
  
      alert('Login successful!');
    } catch (err: any) {
      console.error('Login error:', error || error);
      setError(err.response?.data?.error || 'An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 flex justify-center items-center">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-yellow-400 hover:text-yellow-500 transition duration-300">Sign up</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;