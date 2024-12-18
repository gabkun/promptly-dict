import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosConfig';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const name = `${firstName} ${lastName}`.trim();
    if (!name || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/register', { name, email, password });
      setSuccessMessage(response.data.message);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
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
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-lg text-gray-600">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-lg text-gray-600">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter your last name"
            />
          </div>
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-yellow-400 hover:text-yellow-500 transition duration-300">Login</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
