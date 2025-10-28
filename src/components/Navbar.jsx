import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon,
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiMail
} from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', name: 'Home', icon: FiHome },
    { path: '/about', name: 'About', icon: FiUser },
    { path: '/skills', name: 'Skills', icon: FiCode },
    { path: '/projects', name: 'Projects', icon: FiBriefcase },
    { path: '/resume', name: 'Resume', icon: FiFileText },
    { path: '/contact', name: 'Contact', icon: FiMail },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/95 backdrop-blur-md shadow-lg'
        : darkMode
          ? 'bg-transparent'
          : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/"
            onClick={handleNavClick}
            className="flex items-center space-x-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              <span className="text-gradient bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Sahid
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`group relative flex items-center space-x-1 transition-colors duration-200 ${
                      isActive
                        ? darkMode 
                          ? 'text-purple-400' 
                          : 'text-purple-600'
                        : darkMode
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={false}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400'
                  : 'bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? darkMode
                        ? 'bg-purple-900/50 text-purple-400'
                        : 'bg-purple-100 text-purple-600'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
