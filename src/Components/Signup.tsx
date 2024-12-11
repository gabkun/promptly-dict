import React, { useState } from 'react';
import AxiosInstance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default role
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.post('/api/auth/register', formData);
      // If signup is successful, redirect to login page or dashboard
      navigate('/login');
      alert(response.data.message); // You can replace this with a success message display
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Create an Account</h2>
        {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-blue-900">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-blue-900">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-blue-900">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-blue-900">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="user">User</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 bg-blue-900 text-white rounded mt-4 ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-800">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
