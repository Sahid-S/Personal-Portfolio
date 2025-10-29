import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiPython, SiReact, SiTensorflow } from 'react-icons/si';

const TypingAnimation = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 1); // Typing speed
        return () => clearTimeout(timer);
      }
    }, delay);

    return () => clearTimeout(startTyping);
  }, [currentIndex, text, delay]);

  useEffect(() => {
    // Only show cursor if typing is not complete
    if (currentIndex < text.length) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 200); // Cursor blink speed

      return () => clearInterval(cursorTimer);
    } else {
      // Hide cursor after typing is complete
      setShowCursor(false);
    }
  }, [currentIndex, text.length]);

  return (
    <span>
      {displayedText}
      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>|</span>
    </span>
  );
};

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  const floatingIcons = [
    { Icon: SiPython, delay: 0, x: -200, y: -100 },
    { Icon: SiReact, delay: 0.2, x: 200, y: -50 },
    { Icon: SiTensorflow, delay: 0.4, x: -150, y: 100 },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20' 
            : 'bg-gradient-to-br from-purple-100/50 via-transparent to-pink-100/50'
        }`} />
        
        {/* Animated shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Tech Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: 0.1, 
            x: x, 
            y: y,
          }}
          transition={{
            delay: delay,
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className={`absolute hidden lg:block ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          <Icon className="w-20 h-20" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-lg mb-4 ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              } font-semibold`}
            >
              Hello, I'm
            </motion.p>

            {/* Name with Gradient */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                Sahid
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl sm:text-2xl mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Building Intelligent Solutions From Code To Cloud
            </motion.p>

            {/* Real typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-lg mb-12 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <TypingAnimation
                text="Full-Stack Developer | AI Integration Specialist | Transforming ideas into scalable solutions"
                delay={100}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <span>View My Projects</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/resume">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    darkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-800 hover:bg-gray-100 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <FiDownload className="w-5 h-5" />
                  <span>Download Resume</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center space-x-6"
            >
              {[
                { Icon: FiGithub, href: 'https://github.com/Sahid-S', label: 'GitHub' },
                { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/sahid-dev/', label: 'LinkedIn' },
                { Icon: FiMail, href: 'mailto:sahidsfathima@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full transition-colors duration-300 ${
                    darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                  }`}
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
