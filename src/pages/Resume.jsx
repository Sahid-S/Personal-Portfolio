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
import SEO from '../components/SEO';
import { getPageSEO } from '../config/seoConfig';

const Resume = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageSEO = getPageSEO('resume');

  const education = [
    {
      degree: "Master of Science in Data Science",
      institution: "The American College",
      location: "Madurai, India",
      duration: "2024 - 2026",
      description: "Cumulative GPA: 7/10",
      achievements: [
        "Core Data Science & Programming Foundations: Completed advanced coursework in Python Programming, Fundamentals of Data Science, Artificial Intelligence, Big Data Analytics, Machine Learning, Deep Learning, and Cloud Computing with practical lab work.",
        "Statistical & Analytical Techniques: Gained strong analytical foundation through Mathematics for Data Science, Statistics (I & II), Data Mining & Warehousing, and Databases for Data Science, enabling data modeling, hypothesis testing, and data-driven decision-making.",
        "Hands-on Industry & Project Experience: Completed practical labs (Python, Big Data, Machine Learning, Deep Learning), internship and a capstone project focusing on end-to-end data workflows: data collection → preprocessing → model building → visualization & deployment."
      ]
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Jamal Mohamed College",
      location: "Madurai, India",
      duration: "2021 - 2024",
      description: "Cumulative GPA: 7.5/10",
      achievements: [
        "Core Computer Science Foundations: Studied programming languages (C, C++, Java), Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks and Web Programming with hands-on lab experience.",
        "Applied Technologies & Tools: Gained practical exposure in software engineering, web development (HTML, CSS, JavaScript), RDBMS using SQL, Java Programming.",
        "Industry-oriented Skill Development & Projects: Completed projects and skill enhancement courses including Soft Skills, Environmental Studies, Value Education, and Entrepreneurship Development."
      ]
    }
  ];

  const experience = [
    {
      title: "Python Developer",
      company: "TACTGEN",
      location: "Madurai, India",
      duration: "Feb 2025 - Present",
      description: "Full-Stack Developer specializing in AI-integrated web and mobile applications, with proven expertise in building production-ready Flask APIs, React Native mobile apps (Gottalott, GENPI), third-party API integrations (eBay, Azure OpenAI, Google Search), payment gateway implementation, and end-to-end product development from concept to deployment.",
      responsibilities: [
        "Full-Stack API Development: Converted multiple Python applications (Streamlit, Image-to-Text, Product Description) to production-ready Flask APIs with proper exception handling, naming conventions, and comprehensive testing via Postman and curl.",
        "AI/ML Integration: Implemented Azure OpenAI for image-to-text conversion, visual search using OpenAI's CLIP model with cosine similarity matching, and AI-powered product description generation with guardrails and classifier integration.",
        "E-commerce Platform Development: Built and deployed Gottalott mobile app (React Native) with complete product management workflow - listings, editing, deletion, cross-platform publishing, advanced search filters, and subscription payment integration.",
        "Third-Party API Integration: Successfully integrated eBay Browse API with OAuth2 authentication, Google Custom Search API for product images, and Facebook Marketplace for cross-listing functionality.",
        "Enterprise Mobile Application: Developed GENPI Vendor Login mobile app with property management, ticket tracking, contract orders, proposal requests, vendor estimates, and token-based authentication with role-based access control.",
        "Advanced Search Features: Implemented fuzzy matching search autocomplete, real-time voice-to-text translation for multilingual search, and visual similarity-based product matching system.",
        "Payment Gateway Integration: Configured Razorpay payment system with backend-frontend connectivity for subscription management and transaction processing.",
        "Database Management: Installed and configured PostgreSQL, SSMS, and pgAdmin4; performed data manipulation operations using Pandas and NumPy on CSV files and Excel datasets.",
        "Quality Assurance: Conducted comprehensive testing across multiple modules including form validations, API endpoints, user authentication flows, and identified/documented bugs in GenPi property management system.",
        "Production Deployment: Generated production-ready Android APKs using Gradle, implemented WebView-based applications with offline handling, pull-to-refresh functionality, and optimized pagination for improved performance."
      ]
    }
  ];

  const certifications = [
    {
      name: "100 Days of Code: The Complete Python Pro Bootcamp - Udemy",
      link: "https://udemy-certificate.s3.amazonaws.com/image/UC-8df9ef35-d9a7-4ff1-8f75-40a194d5143a.jpg"
    },
    {
      name: "The Complete Full-Stack Web Development Bootcamp - Udemy",
      link: "https://udemy-certificate.s3.amazonaws.com/image/UC-243b900c-4205-48b5-8185-32cc24baa06b.jpg"
    }
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
              Resume
            </span>
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            My professional journey and achievements
          </p>

          {/* Download Button */}
          <motion.a
            href="/assets/Sahid_Resume.pdf"
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
                      {job.responsibilities.map((resp, i) => {
                        const [label, ...rest] = resp.split(':');
                        const content = rest.join(':');
                        return (
                          <li key={i} className={`flex items-start ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <FiCheck className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm">
                              <span className={`font-semibold ${
                                darkMode ? 'text-purple-400' : 'text-purple-600'
                              }`}>
                                {label}:
                              </span>
                              {content}
                            </span>
                          </li>
                        );
                      })}
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
              {certifications.map((cert, index) => {
                const CertContent = (
                  <>
                    <FiAward className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {cert.name}
                    </span>
                  </>
                );

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-white'
                    } ${cert.link ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 w-full"
                      >
                        {CertContent}
                      </a>
                    ) : (
                      CertContent
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Resume;
