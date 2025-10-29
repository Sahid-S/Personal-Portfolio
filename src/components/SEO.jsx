import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ 
  title = 'Sahid | Data Science & Machine Learning Portfolio',
  description = 'Data Science Enthusiast & Creative Technologist. Explore my portfolio showcasing machine learning projects, data analytics, and web development solutions.',
  keywords = 'Sahid, Data Science, Machine Learning, Portfolio, Web Development, AI, Python, React, Data Analytics, TensorFlow',
  author = 'Sahid',
  ogImage = '/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false
}) => {
  // Get current URL for canonical and OG tags
  const currentUrl = canonicalUrl || `https://www.sahid.me${window.location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://www.sahid.me${ogImage}`} />
      <meta property="og:site_name" content="Sahid Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://www.sahid.me${ogImage}`} />
      <meta name="twitter:creator" content="@sahid" />

      {/* Additional Meta */}
      <meta name="language" content="English" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  twitterCard: PropTypes.string,
  canonicalUrl: PropTypes.string,
  noIndex: PropTypes.bool
};

export default SEO;
