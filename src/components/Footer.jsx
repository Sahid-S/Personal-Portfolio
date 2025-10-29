import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Sahid-S', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sahid-dev/', label: 'LinkedIn' },
    { icon: FiInstagram, href: 'https://www.instagram.com/sahid_1918/', label: 'Instagram' },
    { icon: FiMail, href: 'mailto:sahidsfathima@gmail.com', label: 'Email' },
  ];

  return (
    <footer className={`mt-20 py-8 border-t transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Sahid
              </h3>
            </Link>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Data Science Enthusiast & Creative Technologist. Building intelligent solutions
              that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors duration-200 ${
                    darkMode
                      ? 'text-gray-400 hover:text-purple-400'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Connect
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t text-center ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={`text-sm flex flex-wrap items-center justify-center gap-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>© 2025 Sahid. Some rights reserved.</span>
            <span className="flex items-center gap-1">
              Open-sourced on GitHub with <FiHeart className="w-4 h-4 text-red-500" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
