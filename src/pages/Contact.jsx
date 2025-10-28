import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter,
  FiMapPin,
  FiPhone,
  FiSend,
  FiUser,
  FiMessageSquare
} from 'react-icons/fi';

const Contact = () => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'sahid@example.com',
      href: 'mailto:sahid@example.com'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'hover:text-blue-600'
    },
    {
      icon: FiTwitter,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-blue-400'
    },
    {
      icon: FiMail,
      label: 'Email',
      href: 'mailto:sahid@example.com',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <section className="min-h-screen py-20 pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Let's discuss your next project or collaboration
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Your Name
                    </label>
                    <div className="relative">
                      <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                        } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Your Email
                    </label>
                    <div className="relative">
                      <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                        } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message
                  </label>
                  <div className="relative">
                    <FiMessageSquare className={`absolute left-3 top-3 w-5 h-5 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none`}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    const content = (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 ${
                          darkMode
                            ? 'bg-gray-800 hover:bg-gray-750'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {info.label}
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {info.value}
                          </p>
                        </div>
                      </motion.div>
                    );

                    return info.href ? (
                      <a key={index} href={info.href} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-lg transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-750'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`p-6 rounded-xl ${
                  darkMode
                    ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30'
                    : 'bg-gradient-to-r from-purple-100 to-pink-100'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <span className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Available for opportunities
                  </span>
                </div>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  I'm currently open to new projects and collaborations. 
                  Feel free to reach out if you have an exciting opportunity!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
