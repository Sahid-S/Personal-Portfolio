import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { FiBookOpen, FiTarget, FiHeart, FiAward } from 'react-icons/fi';

const About = () => {
  const { darkMode } = useContext(ThemeContext);

  const interests = [
    { icon: FiBookOpen, title: 'Machine Learning', description: 'Exploring deep learning and neural networks' },
    { icon: FiTarget, title: 'Data Analytics', description: 'Finding patterns and insights in complex data' },
    { icon: FiHeart, title: 'Open Source', description: 'Contributing to community projects' },
    { icon: FiAward, title: 'Innovation', description: 'Building creative tech solutions' },
  ];

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '10+', label: 'Technologies' },
    { value: '5★', label: 'Client Rating' },
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
              About Me
            </span>
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Get to know me better
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative inline-block">
                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30"
                />
                
                {/* Profile Image Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10"
                >
                  <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-500 shadow-2xl">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sahid&backgroundColor=b6e3f4&clothing=hoodie&eyebrows=default&eyes=happy&mouth=smile"
                      alt="Sahid"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  Data Scientist
                </motion.div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Hi, I'm Sahid! 👋
              </h3>
              
              <div className={`space-y-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  I'm a passionate Data Science enthusiast with a love for transforming complex data 
                  into meaningful insights and building intelligent solutions that make a difference.
                </p>
                
                <p>
                  With a strong foundation in machine learning, statistical analysis, and full-stack 
                  development, I bridge the gap between data science and practical applications. My 
                  journey in tech has been driven by curiosity and a desire to solve real-world problems.
                </p>
                
                <p>
                  When I'm not diving into datasets or training models, you'll find me contributing 
                  to open-source projects, exploring new technologies, or sharing knowledge with the 
                  developer community.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`text-center p-4 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h3 className={`text-2xl font-bold text-center mb-12 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              My Interests & Goals
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`p-6 rounded-xl text-center group cursor-pointer transition-all duration-300 ${
                      darkMode
                        ? 'bg-gray-800 hover:bg-gray-750'
                        : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className={`inline-flex p-3 rounded-lg mb-4 transition-colors duration-300 ${
                      darkMode
                        ? 'bg-purple-900/50 text-purple-400 group-hover:bg-purple-900/70'
                        : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h4 className={`font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {interest.title}
                    </h4>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {interest.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`mt-20 p-8 rounded-2xl text-center ${
              darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}
          >
            <blockquote className={`text-xl italic ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              "Data is the new oil, but like oil, it must be refined to be truly valuable."
            </blockquote>
            <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              - My approach to data science
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
