import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { 
  FiDownload, 
  FiBriefcase, 
  FiAward, 
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiCheck
} from 'react-icons/fi';
import { HiAcademicCap } from 'react-icons/hi';

const Resume = () => {
  const { darkMode } = useContext(ThemeContext);

  const education = [
    {
      degree: "Master of Science in Data Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      duration: "2022 - 2024",
      description: "Specialized in Machine Learning and Deep Learning with a focus on NLP and Computer Vision. GPA: 3.9/4.0",
      achievements: [
        "Dean's List for Academic Excellence",
        "Research Assistant in AI Lab",
        "Published 2 papers on neural network optimization"
      ]
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Indian Institute of Technology",
      location: "Delhi, India",
      duration: "2018 - 2022",
      description: "Graduated with First Class Honors. Specialized in Artificial Intelligence and Data Structures.",
      achievements: [
        "Gold Medalist in Programming Contest",
        "Led Technical Society as President",
        "Completed 5+ industry projects"
      ]
    }
  ];

  const experience = [
    {
      title: "Senior Data Scientist",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      duration: "Jan 2024 - Present",
      description: "Leading a team of data scientists in developing ML models for predictive analytics and business intelligence.",
      responsibilities: [
        "Developed ML pipelines that improved prediction accuracy by 35%",
        "Led cross-functional teams of 8+ members",
        "Implemented real-time analytics dashboard saving $2M annually",
        "Mentored junior data scientists and interns"
      ]
    },
    {
      title: "Machine Learning Engineer",
      company: "AI Solutions Corp",
      location: "Remote",
      duration: "Jun 2022 - Dec 2023",
      description: "Built and deployed production-ready machine learning models for various client projects.",
      responsibilities: [
        "Created NLP models for sentiment analysis with 92% accuracy",
        "Optimized existing algorithms reducing processing time by 40%",
        "Deployed models using Docker and Kubernetes",
        "Collaborated with clients to understand requirements"
      ]
    },
    {
      title: "Data Science Intern",
      company: "Analytics Pro",
      location: "Bangalore, India",
      duration: "Jan 2022 - May 2022",
      description: "Worked on data visualization and exploratory data analysis for business insights.",
      responsibilities: [
        "Performed EDA on large datasets using Python",
        "Created interactive dashboards with Tableau",
        "Assisted in building recommendation systems",
        "Presented findings to stakeholders"
      ]
    }
  ];

  const certifications = [
    "AWS Certified Machine Learning - Specialty",
    "Google Cloud Professional Data Engineer",
    "TensorFlow Developer Certificate",
    "Deep Learning Specialization - Coursera"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
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
              Resume
            </span>
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            My professional journey and achievements
          </p>

          {/* Download Button */}
          <motion.a
            href="/resume.pdf"
            download="Sahid_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiDownload className="w-5 h-5" />
            <span>Download Resume PDF</span>
          </motion.a>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FiBriefcase className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Professional Experience
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-8 border-l-2 border-purple-500"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-purple-500 rounded-full" />
                  
                  <div className={`p-6 rounded-xl ${
                    darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                  }`}>
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <div>
                        <h4 className={`text-xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {job.title}
                        </h4>
                        <p className="text-purple-500 font-semibold">
                          {job.company}
                        </p>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="flex items-center space-x-1 mb-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiMapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {job.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className={`flex items-start ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <FiCheck className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <HiAcademicCap className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Education
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-8 border-l-2 border-pink-500"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-pink-500 rounded-full" />
                  
                  <div className={`p-6 rounded-xl ${
                    darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                  }`}>
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <div>
                        <h4 className={`text-xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {edu.degree}
                        </h4>
                        <p className="text-pink-500 font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="flex items-center space-x-1 mb-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiMapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {edu.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className={`flex items-start ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <FiAward className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`p-8 rounded-2xl ${
              darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}
          >
            <div className="flex items-center mb-6">
              <FiBookOpen className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Certifications
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}
                >
                  <FiAward className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
