import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { FiGithub, FiExternalLink, FiCalendar, FiUsers } from 'react-icons/fi';
import { SiPython, SiReact, SiTensorflow, SiFlask, SiMongodb, SiPostgresql, SiDocker, SiJavascript, SiNodedotjs, SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

const Projects = () => {
  const { darkMode } = useContext(ThemeContext);

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Stock Market Predictor',
      description: 'A machine learning application that analyzes historical stock data and predicts future trends using LSTM neural networks. Features real-time data fetching, interactive visualizations, and portfolio optimization recommendations.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      techStack: [
        { name: 'Python', icon: SiPython },
        { name: 'TensorFlow', icon: SiTensorflow },
        { name: 'Flask', icon: SiFlask },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Pandas', icon: SiPandas },
      ],
      features: ['Real-time predictions', 'Historical analysis', 'Portfolio optimization', 'Risk assessment'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
      date: 'Jan 2024',
      team: 'Solo Project'
    },
    {
      id: 2,
      title: 'Healthcare Analytics Dashboard',
      description: 'A comprehensive data visualization platform for healthcare providers to track patient outcomes, resource utilization, and treatment effectiveness. Implements predictive analytics for patient readmission risks.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop',
      techStack: [
        { name: 'React', icon: SiReact },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Python', icon: SiPython },
        { name: 'Scikit-learn', icon: SiScikitlearn },
      ],
      features: ['Patient tracking', 'Predictive analytics', 'Resource management', 'Custom reports'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
      date: 'Sep 2023',
      team: '3 Developers'
    },
    {
      id: 3,
      title: 'Natural Language Processing API',
      description: 'RESTful API service for sentiment analysis, text summarization, and entity recognition. Processes multilingual text with high accuracy using transformer models and provides detailed analytics.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
      techStack: [
        { name: 'Python', icon: SiPython },
        { name: 'TensorFlow', icon: SiTensorflow },
        { name: 'Docker', icon: SiDocker },
        { name: 'Flask', icon: SiFlask },
        { name: 'NumPy', icon: SiNumpy },
      ],
      features: ['Sentiment analysis', 'Text summarization', 'Entity recognition', 'Language detection'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
      date: 'Jun 2023',
      team: '2 Developers'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

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
              Featured Projects
            </span>
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showcasing my best work and innovations
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-white hover:bg-gray-50 shadow-xl hover:shadow-2xl'
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Links */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/70 text-white rounded-lg hover:bg-black/90 transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/70 text-white rounded-lg hover:bg-black/90 transition-colors"
                    aria-label="Live Demo"
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-4 line-clamp-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={techIndex}
                        whileHover={{ scale: 1.1 }}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tech.name}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className={`text-sm font-semibold mb-2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Key Features:
                  </h4>
                  <ul className={`text-xs space-y-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1 h-1 bg-purple-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta Info */}
                <div className={`flex items-center justify-between text-xs ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <div className="flex items-center space-x-1">
                    <FiCalendar className="w-3 h-3" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiUsers className="w-3 h-3" />
                    <span>{project.team}</span>
                  </div>
                </div>

                {/* View Project Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(project.liveLink, '_blank')}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  View Project
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* More Projects Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-20 p-8 rounded-2xl text-center ${
            darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-pink-50'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            More Projects Coming Soon
          </h3>
          <p className={`max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            I'm constantly working on new and exciting projects. Check back regularly or follow me on 
            GitHub to see my latest work and contributions to open-source projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
