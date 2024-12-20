import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic (e.g., send email or API request)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.h2
          className="text-4xl font-bold text-yellow-400 mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Get in Touch with Us
        </motion.h2>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl"
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            >
              <label className="block text-lg font-semibold text-yellow-400 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-800 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
                placeholder="Enter your name"
                required
              />
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
            >
              <label className="block text-lg font-semibold text-yellow-400 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-800 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
            >
              <label className="block text-lg font-semibold text-yellow-400 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-800 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
                placeholder="Write your message here..."
                rows={6}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3 mt-4 bg-yellow-500 text-lg font-semibold text-gray-800 rounded-lg hover:bg-yellow-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
      <footer className="py-8 mt-64 bg-gray-800 text-center text-gray-400">
        <p>&copy; 2024 Promptly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;