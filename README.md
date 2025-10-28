# Sahid's Portfolio Website 🚀

A modern, responsive, and visually dynamic personal portfolio website built with React and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Modern Design**: Clean, professional, and visually appealing interface
- **Dark/Light Mode**: Toggle between dark and light themes
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Powered by Framer Motion and AOS
- **SEO Optimized**: Meta tags and semantic HTML for better search visibility
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Fast loading with Vite and optimized assets

## 📋 Sections

1. **Home** - Hero section with animated background and call-to-action
2. **About** - Personal introduction with profile image and interests
3. **Skills** - Categorized technical skills with visual indicators
4. **Projects** - Featured projects with tech stacks and live demos
5. **Resume** - Timeline layout of education and experience with download option
6. **Contact** - Contact form and social media links

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **AOS** - Scroll animations
- **React Icons** - Icon library

### Build Tools
- **Vite** - Build tool and dev server
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Git installed

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg         # Site favicon
│   └── resume.pdf          # Your resume file (add this)
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── BackToTop.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Resume.jsx
│   │   └── Contact.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── README.md             # Project documentation
```

## 🎨 Customization

### Personal Information

1. Update personal details in all page components
2. Replace social media links with your actual profiles
3. Add your actual resume PDF to `/public/resume.pdf`
4. Update meta tags in `index.html`

### Colors

The color scheme uses purple and pink gradients. To change:
- Edit gradient classes in components
- Modify Tailwind config for custom colors

### Content

- **Projects**: Edit the `projects` array in `/src/pages/Projects.jsx`
- **Skills**: Modify the `skillCategories` array in `/src/pages/Skills.jsx`
- **Experience**: Update arrays in `/src/pages/Resume.jsx`
- **Contact**: Change contact information in `/src/pages/Contact.jsx`

## 🔧 Environment Variables

Create a `.env` file for any API keys or configuration:

```env
VITE_API_URL=your_api_url
VITE_EMAIL_SERVICE_KEY=your_email_key
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Deploy: `npm run deploy`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: sahid@example.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com)
- **GitHub**: [Your GitHub](https://github.com)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All open-source contributors

---

Built with ❤️ by Sahid
