import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiR,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiFlask,
  SiDjango,
  SiTailwindcss,
  SiBootstrap,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiGooglecloud,
  SiFigma,
  SiTableau,
  SiPowerbi,
  SiApachespark,
  SiApacheairflow,
  SiOpencv,
  SiPlotly
} from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import { FaDatabase } from 'react-icons/fa';

const Skills = () => {
  const { darkMode } = useContext(ThemeContext);

  const skillCategories = [
    {
      title: 'Programming Languages',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python', icon: SiPython, level: 95 },
        { name: 'JavaScript', icon: SiJavascript, level: 90 },
        { name: 'TypeScript', icon: SiTypescript, level: 85 },
        { name: 'R', icon: SiR, level: 80 },
        { name: 'C++', icon: SiCplusplus, level: 75 },
        { name: 'SQL', icon: FaDatabase, level: 90 },
      ]
    },
    {
      title: 'Data Science & ML',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'TensorFlow', icon: SiTensorflow, level: 90 },
        { name: 'PyTorch', icon: SiPytorch, level: 85 },
        { name: 'Scikit-learn', icon: SiScikitlearn, level: 95 },
        { name: 'Pandas', icon: SiPandas, level: 95 },
        { name: 'NumPy', icon: SiNumpy, level: 95 },
        { name: 'Jupyter', icon: SiJupyter, level: 90 },
        { name: 'OpenCV', icon: SiOpencv, level: 80 },
        { name: 'Plotly', icon: SiPlotly, level: 85 },
      ]
    },
    {
      title: 'Web Technologies',
      color: 'from-green-500 to-teal-500',
      skills: [
        { name: 'React', icon: SiReact, level: 90 },
        { name: 'Node.js', icon: SiNodedotjs, level: 85 },
        { name: 'Flask', icon: SiFlask, level: 90 },
        { name: 'Django', icon: SiDjango, level: 85 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95 },
        { name: 'Bootstrap', icon: SiBootstrap, level: 85 },
      ]
    },
    {
      title: 'Databases',
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 85 },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 90 },
        { name: 'MySQL', icon: SiMysql, level: 85 },
        { name: 'Redis', icon: SiRedis, level: 75 },
      ]
    },
    {
      title: 'Tools & Platforms',
      color: 'from-indigo-500 to-purple-500',
      skills: [
        { name: 'Git', icon: SiGit, level: 95 },
        { name: 'Docker', icon: SiDocker, level: 85 },
        { name: 'Kubernetes', icon: SiKubernetes, level: 75 },
        { name: 'AWS', icon: SiAmazonaws, level: 80 },
        { name: 'Google Cloud', icon: SiGooglecloud, level: 75 },
        { name: 'Figma', icon: SiFigma, level: 70 },
      ]
    },
    {
      title: 'Data Visualization',
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Tableau', icon: SiTableau, level: 85 },
        { name: 'Power BI', icon: SiPowerbi, level: 80 },
        { name: 'Apache Spark', icon: SiApachespark, level: 75 },
        { name: 'Apache Airflow', icon: SiApacheairflow, level: 70 },
      ]
    },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
              Technical Skills
            </span>
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              {/* Category Title */}
              <div className="flex items-center mb-6">
                <div className={`h-1 flex-grow bg-gradient-to-r ${category.color} rounded`} />
                <h3 className={`mx-4 text-xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
                <div className={`h-1 flex-grow bg-gradient-to-l ${category.color} rounded`} />
              </div>

              {/* Skills Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              >
                {category.skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      className="group relative"
                    >
                      <div className={`p-6 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                        darkMode
                          ? 'bg-gray-800 hover:bg-gray-750'
                          : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                      }`}>
                        {/* Skill Icon */}
                        <div className="mb-3 flex justify-center">
                          <Icon className={`w-12 h-12 transition-colors duration-300 ${
                            darkMode
                              ? 'text-gray-400 group-hover:text-white'
                              : 'text-gray-600 group-hover:text-gray-900'
                          }`} />
                        </div>
                        
                        {/* Skill Name */}
                        <p className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skill.name}
                        </p>

                        {/* Skill Level Bar */}
                        <div className="mt-2">
                          <div className={`h-1 rounded-full overflow-hidden ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className={`h-full bg-gradient-to-r ${category.color}`}
                            />
                          </div>
                        </div>

                        {/* Hover Tooltip */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium pointer-events-none ${
                            darkMode
                              ? 'bg-gray-700 text-white'
                              : 'bg-gray-900 text-white'
                          }`}
                        >
                          {skill.level}%
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-20 p-8 rounded-2xl text-center ${
            darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-pink-50'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Always Learning
          </h3>
          <p className={`max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Technology is constantly evolving, and so am I. I'm always exploring new tools, 
            frameworks, and methodologies to stay at the forefront of data science and web development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
