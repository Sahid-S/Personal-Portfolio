import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { ThemeContext } from '../App';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-40 transition-colors duration-300 ${
            darkMode
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
          } hover:shadow-xl`}
          aria-label="Back to top"
        >
          <FiArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
