import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { FiGithub, FiExternalLink, FiCalendar, FiUsers } from 'react-icons/fi';
import { SiPython, SiReact, SiTensorflow, SiFlask, SiMongodb, SiPostgresql, SiDocker, SiJavascript, SiNodedotjs, SiScikitlearn, SiPandas, SiNumpy, SiStreamlit, SiFastapi, SiOpenai} from 'react-icons/si';
import { FaCode } from 'react-icons/fa';
import SEO from '../components/SEO';
import { getPageSEO } from '../config/seoConfig';

const Projects = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageSEO = getPageSEO('projects');

  const projects = [
    {
      id: 1,
      title: 'Rainfall Prediction System Using Machine Learning',
      description: 'Comprehensive capstone project focusing on predicting monthly, seasonal, and annual rainfall in India based on historical meteorological data. Developed a Streamlit-based interactive dashboard and dual-model prediction engine (Linear Regression & Random Forest) that provided accurate rainfall forecasts and visual insights for agricultural planning and climate research.',
      image: 'https://images.unsplash.com/photo-1722767910306-693b09cf3cda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
      techStack: [
        { name: 'Python', icon: SiPython },
        { name: 'Pandas', icon: SiPandas },
        { name: 'Numpy', icon: SiNumpy },
        { name: 'Scikit-Learn', icon: SiScikitlearn },
        { name: 'Matplotlib', icon: FaCode },
        { name: 'Streamlit', icon: SiStreamlit },
      ],
      features: ['Dual ML Model Engine', 'Interactive Streamlit Dashboard', 'Automated Data Preprocessing', 'Subdivision-Based Insights'],
      githubLink: 'https://github.com/Sahid-S/Rainfall-Prediction-System-Using-Machine-Learning',
      liveLink: '',
      date: 'May 2025',
      team: 'Solo Project'
    },
    {
      id: 2,
      title: 'IPL Win Prediction Using Machine Learning',
      description: 'Comprehensive capstone project focusing on predictive analytics in sports using historical IPL match data. Developed a machine learning-based web application that predicts the winning probability of a team during an IPL match and provides AI-generated match commentary, achieving 89.7% accuracy with Random Forest.',
      image: 'https://images.unsplash.com/photo-1750716414482-6cd2a65e25e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332',
      techStack: [
        { name: 'Python', icon: SiPython },
        { name: 'Pandas', icon: SiPandas },
        { name: 'Numpy', icon: SiNumpy },
        { name: 'Scikit-Learn', icon: SiScikitlearn },
        { name: 'Matplotlib', icon: FaCode },
        { name: 'Streamlit', icon: SiStreamlit },
      ],
      features: ['Real-time Win Prediction', 'Interactive Web UI', 'AI-Generated Match Commentary', 'Model Performance Comparison Dashboard'],
      githubLink: 'https://github.com/Sahid-S/IPL-Win-Prediction-Using-Machine-Learning',
      liveLink: '',
      date: 'May 2025',
      team: 'Solo Project'
    },
    {
      id: 3,
      title: 'Marine-Guard: AI-Powered Maritime Safety System',
      description: 'Innovative capstone project focused on enhancing maritime safety through AI-driven weather prediction. Developed a comprehensive system that utilizes machine learning models to forecast severe weather conditions, providing critical insights and timely warnings to maritime operators, significantly improving safety and decision-making at sea.',
      image: 'https://media.istockphoto.com/id/519649676/photo/lighthouse-and-bad-weather-in-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=kOeWk6ffbakXGn9X8RLFJK_LW88mLqMB_Mrv_NQb5KU=',
      techStack: [
        { name: 'Python', icon: SiPython },
        { name: 'Pandas', icon: SiPandas },
        { name: 'Numpy', icon: SiNumpy },
        { name: 'Scikit-Learn', icon: SiScikitlearn },
        { name: 'Matplotlib', icon: FaCode },
        { name: 'React', icon: SiReact },
      ],
      features: ['AI-Driven Weather Forecasting', 'Maritime Safety Insights', 'Interactive Data Visualization'],
      githubLink: 'https://github.com/Sahid-S/Marine-Guard',
      liveLink: '',
      date: 'Jan 2026',
      team: 'Team Project (3 Members)'
    },
    {
      id: 4,
      title: 'AcadBridge: AI-Powered Academic Research Assistant',
      description: 'A web-based platform for student-faculty interaction with AI-powered course assistance using RAG (Retrieval-Augmented Generation).',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      techStack: [
        { name: 'Python', icon: SiPython },
        { name: 'Pandas', icon: SiPandas },
        { name: 'OpenAi', icon: SiOpenai },
        { name: 'FastApi', icon: SiFastapi },
        { name: 'Matplotlib', icon: FaCode },
        { name: 'React', icon: SiReact },
      ],
      features: ['AI-Driven Weather Forecasting', 'Maritime Safety Insights', 'Interactive Data Visualization'],
      githubLink: 'https://github.com/Sahid-S/AcadBridge',
      liveLink: '',
      date: 'Jan 2026',
      team: 'Hackathon Project'
    },
    {
      id: 5,
      title: 'Coming Soon',
      description: 'Exciting new project in development! This innovative application will showcase cutting-edge technology and modern design patterns. Stay tuned for updates as we work on bringing this vision to life.',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
      techStack: [
        { name: 'React', icon: SiReact },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'JavaScript', icon: SiJavascript },
      ],
      features: ['Modern Architecture', 'Responsive Design', 'Advanced Features', 'Performance Optimized'],
      githubLink: '#',
      liveLink: '#',
      date: 'TBD 2025',
      team: 'In Development',
      comingSoon: true
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
    <>
      <SEO 
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        canonicalUrl={`https://www.sahid.me${pageSEO.path}`}
      />
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
                  whileHover={{ scale: project.comingSoon ? 1.05 : 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover ${project.comingSoon ? 'filter grayscale opacity-70' : ''}`}
                />
                
                {/* Coming Soon Overlay */}
                {project.comingSoon && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-600/50 to-transparent flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-center"
                    >
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl font-bold mb-2">
                        🚧 Coming Soon
                      </div>
                      <div className="text-white text-sm opacity-90">
                        Under Development
                      </div>
                    </motion.div>
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${project.comingSoon ? 'hidden' : ''}`} />
                
                {/* Overlay Links */}
                {!project.comingSoon && (
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
                )}
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
                  whileHover={{ scale: project.comingSoon ? 1.0 : 1.02 }}
                  whileTap={{ scale: project.comingSoon ? 1.0 : 0.98 }}
                  onClick={() => !project.comingSoon && window.open(project.githubLink, '_blank')}
                  disabled={project.comingSoon}
                  className={`w-full mt-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    project.comingSoon
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  {project.comingSoon ? '🚧 Coming Soon' : 'View Project'}
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
    </>
  );
};

export default Projects;
