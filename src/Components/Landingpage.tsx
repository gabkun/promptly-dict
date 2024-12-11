import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-semibold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to <span className="text-yellow-400">Promptly</span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-2xl text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          Your online backup for everyday reminders.
        </motion.p>
        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          <a
            href="#features"
            className="px-6 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg transition"
          >
            Get Started
          </a>
          <a
            href="#about"
            className="px-6 py-3 text-lg bg-gray-700 hover:bg-gray-800 rounded-lg shadow-lg transition"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold text-yellow-400"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Features
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-400"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Promptly offers a seamless and secure way to store your memos, photos, and audio.
          </motion.p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Text Memos", description: "Store your everyday text-based reminders." },
              { title: "Audio Memos", description: "Record and store your thoughts and reminders as audio." },
              { title: "Secure & Private", description: "We prioritize your privacy with secure data storage." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                <p className="mt-4 text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-gray-800 text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-yellow-400"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Promptly
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-gray-400"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Promptly is here to simplify your life by securely storing all your reminders, audio notes, and even your memories. Whether it’s a quick text note or an audio recording, we ensure your data is private, secure, and easily accessible whenever you need it. With Promptly, you have a reliable backup for your thoughts and ideas.
          </motion.p>
        </div>
      </div>

      {/* Purpose Section */}
      <div id="purpose" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold text-yellow-400"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Purpose
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            We aim to provide a hassle-free solution to your everyday tasks like reminders, notes, and memories. Whether you're using text or voice, Promptly serves as your online backup. It’s time to make life a little simpler by storing your important reminders securely with us.
          </motion.p>
        </div>
      </div>

      {/* Tutorials Section */}
      <div id="tutorials" className="py-20 bg-gray-800 text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-yellow-400"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-gray-400"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Creating memos with Promptly is easy! Learn how to store text memos, record audio, and even attach images to your daily reminders. It's a simple, user-friendly process designed to make your life easier.
          </motion.p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Text Memos", description: "Create and save your thoughts instantly with a few clicks." },
              { title: "Audio Memos", description: "Record audio reminders directly from the app and save them securely." },
              { title: "Attach Photos", description: "Add photos to your memos, making them more personalized and memorable." }
            ].map((tutorial, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-700 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white">{tutorial.title}</h3>
                <p className="mt-4 text-gray-400">{tutorial.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center text-gray-400">
        <p>&copy; 2024 Promptly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
