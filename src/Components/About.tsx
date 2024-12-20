import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AboutPage: React.FC = () => {
  const particleInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 text-white">
      {/* Particles Effect */}
      <Particles
        init={particleInit}
        options={{
          fullScreen: false,
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: true, speed: 0.2, opacity_min: 0.1, sync: false },
            },
            size: {
              value: { min: 1, max: 3 },
              anim: { enable: true, speed: 1, size_min: 0.1, sync: false },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
        }}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
      />

      {/* About Page Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-semibold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          About <span className="text-yellow-400">Promptly</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-2xl text-gray-300 m-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        >
          Simplify your life by securely storing and accessing all your Memories and notes.
        </motion.p>

        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
        >
          {/* First Column */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }}
          >
            <motion.p
              className="text-lg text-gray-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 2 }}
            >
              Promptly is here to simplify your life by securely storing your thoughts, reminders, and memories.
              Whether it’s a quick text note, an audio recording, or even images, we ensure your data remains private
              and accessible whenever you need it.
            </motion.p>
          </motion.div>

          {/* Second Column */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 2 }}
          >
            <motion.p
              className="text-lg text-gray-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 2 }}
            >
              With Promptly, you can securely back up your text and audio notes, all stored safely in one easy-to-use
              platform. Forget about losing your important reminders — Promptly ensures everything stays accessible
              whenever you need it.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scrollable Highlight Section */}
        <motion.div
          className="mt-16 bg-gray-800 p-10 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-500"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 2.5 }}
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-6">
            All Your Reminders, Safely Stored
          </h3>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 3 }}
          >
            Organize your thoughts and memories by storing them securely with Promptly. From text notes to audio
            recordings, everything is in one place — easy to find, easy to use, and always available.
          </motion.p>
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 3 }}
        >
          <a
            href="/signup"
            className="px-6 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg transition-all duration-300"
          >
            Start Using Promptly Now
          </a>
        </motion.div>
        
      </div>
      <footer className="py-8 mt-24 bg-gray-800 text-center text-gray-400">
        <p>&copy; 2024 Promptly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
