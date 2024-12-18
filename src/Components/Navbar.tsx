import React from 'react';
import logo from '../assets/SVG/logo.svg'


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
          <a href="/" className="text-white font-bold text-xl mr-1">
          <img 
            src={logo} 
            alt="P Logo" 
            className="h-20 w-20" 
          />
          </a>
        </div>

          <div className="hidden md:flex items-center justify-center space-x-8">
            <a
              href="#home"
              className="relative text-white text-lg font-light transition duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Home
            </a>
            <a
              href="#about"
              className="relative text-white text-lg font-light transition duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              About
            </a>
            <a
              href="#services"
              className="relative text-white text-lg font-light transition duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Services
            </a>
            <a
              href="#contact"
              className="relative text-white text-lg font-light transition duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:flex space-x-4">
            <a
              href="/login"
              className="px-5 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-5 py-2 bg-transparent border border-yellow-400 text-yellow-400 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition duration-300"
            >
              Signup
            </a>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 text-center py-4 space-y-4">
          <a href="#home" className="block text-white text-lg hover:text-yellow-400 transition duration-300">
            Home
          </a>
          <a href="#about" className="block text-white text-lg hover:text-yellow-400 transition duration-300">
            About
          </a>
          <a href="#services" className="block text-white text-lg hover:text-yellow-400 transition duration-300">
            Services
          </a>
          <a href="#contact" className="block text-white text-lg hover:text-yellow-400 transition duration-300">
            Contact
          </a>
          <a
            href="/login"
            className="block w-full px-5 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Login
          </a>
          <a
            href="/signup"
            className="block w-full px-5 py-2 bg-transparent border border-yellow-400 text-yellow-400 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition duration-300"
          >
            Signup
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;