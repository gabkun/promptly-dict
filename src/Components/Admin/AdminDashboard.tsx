import React, { useEffect, useState } from 'react';
import { FiUsers, FiTrash, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axiosInstance from '../../../api/axiosConfig';
import { Bar } from 'react-chartjs-2';  
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FiMic } from "react-icons/fi";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Memo {
  id: number;
  userId: User;
  title: string;
  content: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [audio, setAudio] = useState<Memo[]>([]);
  const [totalMemos, setTotalMemos] = useState<number>(0);
  const [totalVoice, setTotalVoice] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchUsersAndMemos = async () => {
      try {
        const usersResponse = await axiosInstance.get('/api/admin/all');
        setUsers(usersResponse.data.users);
        console.log(users)
        setTotalUsers(usersResponse.data.users.length);

        const memoResponse = await axiosInstance.get('/api/admin/allmemos');
        setMemos(memoResponse.data.textMemos); 
        setTotalMemos(memoResponse.data.textMemos.length);

        setAudio(memoResponse.data.voiceMemos);
        setTotalVoice(memoResponse.data.voiceMemos.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsersAndMemos();
  }, []);



  const deleteMemo = (id: number) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };
  const chartData = {
    labels: ['Users', 'Memos', 'Voice Memos'],
    datasets: [
      {
        label: 'Total Analytics',
        data: [totalUsers, totalMemos, totalVoice],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
        borderColor: ['#4CAF50', '#FF9800', '#2196F3'],
        borderWidth: 1,
      },
    ],
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await axiosInstance.delete(`/api/admin/deleteUser/${userId}`);
      console.log('User deleted successfully:', response.data);
      alert('User and their associated memos have been deleted successfully');
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user. Please try again.');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="m-10 flex-1 flex flex-col p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FiUsers className="text-4xl text-blue-500 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FiFileText className="text-4xl text-green-500 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Memos</h2>
              <p className="text-3xl font-bold text-gray-900">{totalMemos}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FiMic className="text-4xl text-yellow-500 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Voice Memos</h2>
              <p className="text-3xl font-bold text-gray-900">{totalVoice}</p>
            </div>
          </motion.div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 ">Data Summary</h2>
            <div className="w-100 h-100"> 
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false, 
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 5, 
                    },
                  },
                  x: {
                    ticks: {
                      autoSkip: true, 
                      maxRotation: 0, 
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false, 
                  },
                  tooltip: {
                    bodyFont: {
                      size: 10, 
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-600">
                <th className="border-b py-2 text-left">Name</th>
                <th className="border-b py-2 text-left">Email</th>
                <th className="border-b py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => {
            console.log(user); 
            return (
              <tr key={user._id}>
                <td className="py-2 border-b">{user.name}</td>
                <td className="py-2 border-b">{user.email}</td>
                <td className="py-2 border-b text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            );
          })}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Memos</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-600">
                <th className="border-b py-2 text-left">User</th>
                <th className="border-b py-2 text-left">Title</th>
                <th className="border-b py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {memos.map((memo) => (
                <tr key={memo.id} className="hover:bg-gray-100">
                  <td className="py-2 border-b">{memo.userId?.name}</td>
                  <td className="py-2 border-b">{memo.title}</td>
                  <td className="py-2 border-b text-center">
                    <button
                      onClick={() => deleteMemo(memo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;