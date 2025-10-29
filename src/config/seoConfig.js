// SEO Configuration for All Pages
// Import this in your page components for consistent SEO metadata

export const seoConfig = {
  siteName: 'Sahid Portfolio',
  siteUrl: 'https://www.sahid.me',
  author: 'Sahid',
  twitterHandle: '@sahid',
  defaultImage: '/og-image.png',
  
  pages: {
    home: {
      title: 'Sahid | Data Science & Machine Learning Portfolio',
      description: 'Welcome to Sahid\'s portfolio. Data Science Enthusiast & Creative Technologist specializing in machine learning, AI, and full-stack development. Explore my projects and skills.',
      keywords: 'Sahid, Data Science, Machine Learning, AI, Portfolio, Python, React, TensorFlow, Data Analytics, Web Development',
      path: '/'
    },
    
    about: {
      title: 'About Sahid | Data Scientist & Developer',
      description: 'Learn more about Sahid - a passionate data scientist with expertise in machine learning, AI, and web development. Discover my journey, skills, and interests.',
      keywords: 'About Sahid, Data Scientist, Machine Learning Engineer, Background, Experience, Skills',
      path: '/about'
    },
    
    skills: {
      title: 'Skills & Technologies | Sahid Portfolio',
      description: 'Explore Sahid\'s technical skills including Python, Machine Learning, TensorFlow, React, Data Analytics, and more. View proficiency levels and technology stack.',
      keywords: 'Technical Skills, Python, Machine Learning, TensorFlow, React, Data Science, Programming Languages',
      path: '/skills'
    },
    
    projects: {
      title: 'Projects | Sahid\'s Portfolio',
      description: 'Browse through Sahid\'s data science and web development projects. From machine learning models to full-stack applications, see real-world implementations.',
      keywords: 'Data Science Projects, Machine Learning Projects, Web Development, Portfolio Projects, GitHub',
      path: '/projects'
    },
    
    resume: {
      title: 'Resume | Sahid - Data Scientist',
      description: 'View Sahid\'s professional resume including education, work experience, certifications, and achievements in data science and software development.',
      keywords: 'Resume, CV, Education, Work Experience, Data Scientist Resume, Download Resume',
      path: '/resume'
    },
    
    contact: {
      title: 'Contact Sahid | Let\'s Connect',
      description: 'Get in touch with Sahid for data science projects, collaborations, job opportunities, or consultations. Connect via email, LinkedIn, or GitHub.',
      keywords: 'Contact, Email, Hire Data Scientist, Collaboration, Consultation, Get in Touch',
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
      name: 'Sahid',
      jobTitle: 'Data Scientist',
      description: 'Data Science Enthusiast & Creative Technologist specializing in Machine Learning, AI, and Web Development',
      url: 'https://www.sahid.me',
      image: 'https://www.sahid.me/og-image.png',
      knowsAbout: [
        'Data Science',
        'Machine Learning',
        'Python',
        'React',
        'TensorFlow',
        'Data Analytics',
        'Artificial Intelligence',
        'Web Development'
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
