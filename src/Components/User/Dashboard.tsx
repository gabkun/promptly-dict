import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../../api/axiosConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import Calendar from './Calendar';
import AudioRecorder from './AudioRecorder';


interface MemoData {
  userId: string;
  memoType: number;
  title: string;
  description: string;
  images: File[];
  audio: File | null;
  additionalNotes: string;
}

const Dashboard: React.FC = () => {
  const [memoData, setMemoData] = useState<MemoData>({
    userId: '',
    memoType: 1,
    title: '',
    description: '',
    images: [],
    audio: null,
    additionalNotes: '',
  });
  const [memos, setMemos] = useState<any[]>([]); 
  const [voiceMemos, setVoiceMemos] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleAudioData = (audio: File) => {
    console.log('Received audio file:', audio);
    setAudioFile(audio); 
    setMemoData((prev) => ({
      ...prev,
      audio, 
    }));
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMemoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMemoData((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get(`/api/auth/${storedUserId}`);
          const userId = response.data.user.id;

          setMemoData((prev) => ({ ...prev, userId }));
          fetchMemos(userId);
          fetchVoice(userId); 
        } catch (err) {
          setError('Failed to fetch user data. Please try again later.');
        }
      };
      fetchUserData();
    } else {
      console.error('No user ID found in localStorage.');
      setError('No user ID found. Please log in again.');
    }
  }, []);

  const fetchMemos = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/api/memo/${userId}`);
      setMemos(response.data.memos);
    } catch (err) {
      console.error('Failed to fetch memos:', err);
      setError('Unable to retrieve memos. Please try again later.');
    }
  };

  const fetchVoice = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/api/memo/getvoice/${userId}`);
      setVoiceMemos(response.data.memos);
    } catch (err) {
      console.error('Failed to fetch memos:', err);
      setError('Unable to retrieve memos. Please try again later.');
    }
  };
  const createMemo = async () => {
    try {
      const { userId, memoType, title, description, images, additionalNotes } = memoData;

      if (!userId || !memoType || !title) {
        alert('Please complete all required fields.');
        return;
      }

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('memoType', memoType.toString());
      formData.append('title', title);
      if (memoType === 1) {
        formData.append('description', description);
        images.forEach((image) => formData.append('images', image));
      }
      formData.append('additionalNotes', additionalNotes);

      await axiosInstance.post('/api/memo/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Memo created successfully.');
      setMemoData({
        userId: memoData.userId,
        memoType: 1,
        title: '',
        description: '',
        images: [],
        audio: null,
        additionalNotes: '',
      });
      fetchMemos(memoData.userId); 
    } catch (error) {
      console.error('Error creating memo:', error);
      alert('Failed to create memo.');
    }
  };

  const createVoiceMemo = async () => {
    try {
      if (!memoData.audio) {
        alert('Please record an audio memo.');
        return;
      }

      const formData = new FormData();
      formData.append('userId', memoData.userId);
      formData.append('memoType', '2'); 
      formData.append('title', memoData.title);
      formData.append('audio', memoData.audio);

      await axiosInstance.post('/api/memo/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Voice memo created successfully.');
      setMemoData({
        userId: memoData.userId,
        memoType: 2,
        title: '',
        description: '',
        images: [],
        audio: null,
        additionalNotes: '',
      });
      fetchMemos(memoData.userId);
      setIsVoiceModalOpen(false);
    } catch (error) {
      alert('Failed to create voice memo.');
      console.log(memoData)
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Sidebar Navigation */}
      <motion.nav
        className="w-full md:w-1/4 bg-gray-800 text-white flex flex-col p-4 space-y-6"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center">Memo App</h1>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded-lg text-lg cursor-pointer">Home</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg text-lg cursor-pointer">Create Memo</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg text-lg cursor-pointer">Saved Memos</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg text-lg cursor-pointer">Settings</li>
        </ul>
      </motion.nav>

      <div className="m-10 flex-1 flex flex-col p-6">
        <motion.header
          className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Memo
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        onClick={() => setIsVoiceModalOpen(true)}
      >
        Create Voice Memo
      </button>
          <button className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg font-medium hover:bg-yellow-500 transition">
            Logout
          </button>

        </motion.header>

        <div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Create a New Memo</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={memoData.title}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={memoData.description}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
            />
            <input
              type="file"
              name="images"
              multiple
              className="w-full mb-2"
              onChange={handleFileChange}
            />
            <textarea
              name="additionalNotes"
              placeholder="Additional Notes"
              value={memoData.additionalNotes}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)} 
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={createMemo} 
              >
                Save Memo
              </button>
            </div>
          </motion.div>
        </div>
      )}

              {/* Voice Memo Modal */}
              {isVoiceModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Create a Voice Memo</h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={memoData.title}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
            <AudioRecorder onAudioData={handleAudioData} />
                      {audioFile && (
                  <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-700">Recorded Audio:</h2>
                    <audio src={URL.createObjectURL(audioFile)} controls className="mt-4 w-full rounded border border-gray-300" />
                  </div>
                )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  onClick={() => setIsVoiceModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={createVoiceMemo}
                >
                  Save Voice Memo
                </button>
              </div>
            </motion.div>
          </div>
        )}
    </div>

        <motion.section
  className=" w-full max-w-7xl"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>

  <h3 className="text-4xl font-extrabold mb-10 text-center text-gray-800">Your Memos</h3>
  {error && <p className="text-red-600 text-center mb-6 font-medium">{error}</p>}
  {memos.length === 0 ? (
    <p className="text-gray-600 text-center text-lg font-medium">No memos found.</p>
  ) : (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="my-8"
    >
{memos.map((memo, index) => (
  <SwiperSlide key={memo._id}>
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-gray-50 rounded-xl shadow-lg p-6 border border-gray-300 hover:shadow-2xl transition-all relative flex flex-col h-full"
    >
      {/* Memo Label */}
      <span className="absolute top-3 left-3 bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
        Memo {index + 1}
      </span>

      {/* Title */}
      <h4 className="text-xl font-bold text-gray-800 mt-8 mb-2 leading-tight line-clamp-1">
        {memo.title || 'Untitled Memo'}
      </h4>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-4 font-medium">
        {new Date(memo.createdDate).toLocaleString()}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {memo.description || 'No description provided.'}
      </p>

      {/* Images */}
      {memo.images && memo.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {memo.images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={`http://localhost:4500/${img}`}
              alt={`Memo Image ${idx + 1}`}
              className="w-full h-24 object-cover rounded-lg border border-gray-300"
            />
          ))}
        </div>
      )}

      {/* Additional Notes */}
      {memo.additionalNotes && (
        <p className="text-gray-500 text-xs italic mb-4">
          {memo.additionalNotes}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-auto">
        <button className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold shadow transition-all">
          Update
        </button>
        <button className="px-5 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold shadow transition-all">
          Delete
        </button>
      </div>
    </motion.div>
  </SwiperSlide>
))}
    </Swiper>
  )}

</motion.section>
<h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Calendar</h3>
  <div className="flex justify-center items-center p-4">
    <div className="w-full md:w-4/5 lg:w-3/5 border border-gray-200 rounded-lg shadow-md p-6 bg-gray-50">
      <Calendar />
    </div>
  </div>
<div>
{voiceMemos.map((memo, index) => {
  const filePath = memo.filePath ? memo.filePath.replace(/\\/g, "/") : null; 
  return (
    <div key={index}>
      <p>{memo.title || `Voice Memo ${index + 1}`}</p>
      {filePath ? (
        <audio controls>
          <source src={`http://localhost:4500/${filePath}`} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Audio file unavailable</p>
      )}
    </div>
  );
})}
</div>
      </div>
    </div>
  );
};

export default Dashboard;