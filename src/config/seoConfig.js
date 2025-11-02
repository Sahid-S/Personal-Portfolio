// SEO Configuration for All Pages
// Import this in your page components for consistent SEO metadata

export const seoConfig = {
  siteName: 'SAHID Portfolio',
  siteUrl: 'https://www.sahid.me',
  author: 'SAHID',
  twitterHandle: '@sahid',
  defaultImage: '/og.png',
  
  pages: {
    home: {
      title: 'SAHID — Python Developer | Data Scientist | Data Analyst | Full-Stack Developer',
      description: 'Portfolio of SAHID, a Python Developer, Data Scientist, Data Analyst and Full-Stack Developer specializing in AI-powered web and data applications. Building intelligent solutions with Python, machine learning, and modern full-stack development.',
      keywords: 'SAHID, Python Developer, Data Scientist, Data Analyst, Full-Stack Developer, AI, Machine Learning, Python Programming, Data Analytics, Web Development, Portfolio, TensorFlow, React, Flask, Full Stack Development',
      path: '/'
    },
    
    about: {
      title: 'About SAHID | Python Developer, Data Scientist & Full-Stack Developer',
      description: 'Learn about SAHID - a versatile Python Developer, Data Scientist, Data Analyst and Full-Stack Developer specializing in AI-powered applications. Discover my journey in building intelligent solutions with data and modern technologies.',
      keywords: 'About SAHID, Python Developer, Data Scientist, Data Analyst, Full-Stack Developer, Machine Learning Engineer, AI Developer, Background, Experience, Skills',
      path: '/about'
    },
    
    skills: {
      title: 'Skills & Technologies | SAHID - Python, Data Science & Full-Stack Development',
      description: 'Explore SAHID\'s comprehensive technical skills spanning Python development, data science, analytics, and full-stack technologies. Expert in Python, Machine Learning, TensorFlow, React, Flask, Data Analysis, and modern web development frameworks.',
      keywords: 'Technical Skills, Python Programming, Machine Learning, TensorFlow, React, Data Science, Data Analytics, Full-Stack Development, Flask, Django, JavaScript, Programming Languages',
      path: '/skills'
    },
    
    projects: {
      title: 'Projects | SAHID - AI, Data Science & Full-Stack Applications',
      description: 'Explore SAHID\'s portfolio of AI-powered applications, data science projects, and full-stack web solutions. From machine learning models to intelligent applications, see real-world implementations using Python, TensorFlow, React, and modern technologies.',
      keywords: 'AI Projects, Data Science Projects, Machine Learning Projects, Full-Stack Applications, Python Projects, Web Development, Portfolio Projects, GitHub, TensorFlow Projects',
      path: '/projects'
    },
    
    resume: {
      title: 'Resume | SAHID - Python Developer, Data Scientist & Full-Stack Developer',
      description: 'View SAHID\'s professional resume showcasing expertise in Python development, data science, analytics, and full-stack development. Includes education, work experience, certifications, and achievements in AI and software development.',
      keywords: 'Resume, CV, Education, Work Experience, Python Developer Resume, Data Scientist Resume, Full-Stack Developer CV, Download Resume',
      path: '/resume'
    },
    
    contact: {
      title: 'Contact SAHID | Python Developer & Data Scientist for Hire',
      description: 'Get in touch with SAHID for Python development, data science projects, AI solutions, full-stack applications, collaborations, or consultations. Available for freelance and full-time opportunities. Connect via email, LinkedIn, or GitHub.',
      keywords: 'Contact, Hire Python Developer, Hire Data Scientist, Hire Full-Stack Developer, Collaboration, Consultation, Freelance Data Scientist, Job Opportunities',
      path: '/contact'
    }
  },
  
  // Social media links (update with your actual profiles)
  social: {
    github: 'https://github.com/Sahid-S',
    linkedin: 'https://linkedin.com/in/sahid',
    twitter: 'https://twitter.com/sahid',
    email: 'mailto:sahid@example.com'
  },
  
  // Structured data configuration
  structuredData: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'SAHID',
      jobTitle: ['Python Developer', 'Data Scientist', 'Data Analyst', 'Full-Stack Developer'],
      description: 'Python Developer, Data Scientist, Data Analyst and Full-Stack Developer specializing in AI-powered web and data applications',
      url: 'https://www.sahid.me',
      image: 'https://www.sahid.me/og.png',
      knowsAbout: [
        'Python Programming',
        'Data Science',
        'Machine Learning',
        'Data Analytics',
        'Full-Stack Development',
        'Artificial Intelligence',
        'TensorFlow',
        'React',
        'Flask',
        'Django',
        'Data Visualization',
        'Deep Learning',
        'Web Development',
        'FastAPI',
        'Node.js'
      ]
    }
  }
};

// Helper function to get page config
export const getPageSEO = (pageName) => {
  return seoConfig.pages[pageName] || seoConfig.pages.home;
};

// Helper function to generate full URL
export const getFullUrl = (path) => {
  return `${seoConfig.siteUrl}${path}`;
};

export default seoConfig;
