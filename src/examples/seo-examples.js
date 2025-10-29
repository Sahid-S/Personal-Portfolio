// Example implementations for adding SEO to remaining pages

// ==========================================
// ABOUT PAGE EXAMPLE
// ==========================================
/*
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import { getPageSEO } from '../config/seoConfig';

const About = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageSEO = getPageSEO('about');
  
  return (
    <>
      <SEO 
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        canonicalUrl={`https://www.sahid.me${pageSEO.path}`}
      />
      
      {/* Your existing About page content *\/}
    </>
  );
};

export default About;
*/

// ==========================================
// SKILLS PAGE EXAMPLE
// ==========================================
/*
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import { getPageSEO } from '../config/seoConfig';

const Skills = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageSEO = getPageSEO('skills');
  
  return (
    <>
      <SEO 
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        canonicalUrl={`https://www.sahid.me${pageSEO.path}`}
      />
      
      {/* Your existing Skills page content *\/}
    </>
  );
};

export default Skills;
*/

// ==========================================
// PROJECTS PAGE EXAMPLE
// ==========================================
/*
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import { getPageSEO } from '../config/seoConfig';

const Projects = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageSEO = getPageSEO('projects');
  
  return (
    <>
      <SEO 
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        canonicalUrl={`https://www.sahid.me${pageSEO.path}`}
      />
      
      {/* Your existing Projects page content *\/}
    </>
  );
};

export default Projects;
*/

// ==========================================
// RESUME PAGE EXAMPLE
// ==========================================
/*
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import { getPageSEO } from '../config/seoConfig';

const Resume = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageSEO = getPageSEO('resume');
  
  return (
    <>
      <SEO 
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        canonicalUrl={`https://www.sahid.me${pageSEO.path}`}
      />
      
      {/* Your existing Resume page content *\/}
    </>
  );
};

export default Resume;
*/

// ==========================================
// CONTACT PAGE EXAMPLE
// ==========================================
/*
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import { getPageSEO } from '../config/seoConfig';

const Contact = () => {
  const { darkMode } = useContext(ThemeContext);
  const pageSEO = getPageSEO('contact');
  
  return (
    <>
      <SEO 
        title={pageSEO.title}
        description={pageSEO.description}
        keywords={pageSEO.keywords}
        canonicalUrl={`https://www.sahid.me${pageSEO.path}`}
      />
      
      {/* Your existing Contact page content *\/}
    </>
  );
};

export default Contact;
*/

// ==========================================
// CUSTOM SEO FOR SPECIFIC PAGES
// ==========================================

// Example: Projects page with custom OG image
/*
<SEO 
  title="My Amazing Project | Sahid Portfolio"
  description="A machine learning project that predicts customer churn using deep learning"
  keywords="Machine Learning, Deep Learning, Customer Churn, TensorFlow"
  ogImage="/projects/project-preview.png"
  canonicalUrl="https://www.sahid.me/projects/customer-churn"
/>
*/

// Example: Blog post with article schema
/*
<SEO 
  title="Understanding Neural Networks | Sahid's Blog"
  description="A comprehensive guide to neural networks and deep learning"
  keywords="Neural Networks, Deep Learning, AI, Tutorial"
  ogType="article"
  canonicalUrl="https://www.sahid.me/blog/neural-networks"
/>
*/

// Example: Page that shouldn't be indexed
/*
<SEO 
  title="Test Page"
  description="This is a test page"
  noIndex={true}
/>
*/
