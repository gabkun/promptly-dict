import React from "react";
import { motion } from "framer-motion";

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Heading Section */}
        <motion.h2
          className="text-4xl font-bold text-yellow-400 mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Our <span className="text-yellow-300">Services</span>
        </motion.h2>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Service Card 1 */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Text Memos</h3>
            <p className="text-lg text-gray-300">
              Capture your thoughts with quick and secure text-based reminders. Store and retrieve them anytime, on any device.
            </p>
          </motion.div>

          {/* Service Card 2 */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Audio Memos</h3>
            <p className="text-lg text-gray-300">
              Record and save voice memos for your important thoughts, reminders, and notes on the go.
            </p>
          </motion.div>

          {/* Service Card 3 */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Photo Memos</h3>
            <p className="text-lg text-gray-300">
              Enhance your reminders by attaching images to your text and audio notes for a richer experience.
            </p>
          </motion.div>

          {/* Service Card 4 */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Secure Storage</h3>
            <p className="text-lg text-gray-300">
              Your data is securely stored with encryption, giving you peace of mind that your important memories are safe.
            </p>
          </motion.div>

          {/* Service Card 5 */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Cross-Platform Sync</h3>
            <p className="text-lg text-gray-300">
              Seamlessly access your notes, reminders, and memories from any device, anytime, anywhere.
            </p>
          </motion.div>

          {/* Service Card 6 */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Smart Search</h3>
            <p className="text-lg text-gray-300">
              Quickly find your notes and reminders with an intelligent search system that helps you locate exactly what you need.
            </p>
          </motion.div>
        </motion.div>
      </div>
      <footer className="py-8 mt-64 bg-gray-800 text-center text-gray-400">
        <p>&copy; 2024 Promptly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;