import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig'; 
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      console.log('Attempting login with:', { email, password });
      const response = await axiosInstance.post('/api/auth/login', { email, password });
  
      console.log('Login response:', response.data);
      const userId = response?.data?.user?.id; 
      const role = response?.data?.user?.role; 
  
      console.log('User ID received:', userId);
      console.log('Role received:', role);
  
      if (userId) {
        localStorage.setItem('userId', userId);
      }
  
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
      console.error('Login error:', err.response || err.message);
      setError(err.response?.data?.error || 'An error occurred during login.');
    }
  };
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <a href="https://amethgalarcio.web.app/" target="_blank" rel="noopener noreferrer">
                <img src="https://amethgalarcio.web.app/assets/logo-42fde28c.svg" className="w-8" alt="App Logo" />
              </a>
              <p className="m-0 text-[16px] font-semibold dark:text-white">Login to your Account</p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy the experience.
              </span>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Show error message */}

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Email</label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="font-semibold text-xs text-gray-400">Password</label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="mt-5">
                <button
                  type="submit"
                  className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;