# Modern Portfolio Website

A beautiful, responsive portfolio website built with React.js and Tailwind CSS. Features a modern design with smooth animations, interactive components, and a professional layout.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient backgrounds and glassmorphism effects
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: CSS animations and transitions for enhanced user experience
- **Interactive Components**: Hover effects, loading states, and interactive elements
- **Contact Form**: Functional contact form with validation
- **Project Showcase**: Filterable project gallery with detailed information
- **Skills Section**: Visual skill progress bars and technology badges
- **Social Integration**: Links to social media profiles and professional networks

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Portfolio-Project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 Customization Guide

### Personal Information

Update the following files to customize your personal information:

#### 1. Hero Section (`src/components/Hero.jsx`)
- Change "Your Name" to your actual name
- Update the roles array with your professional titles
- Modify the description text
- Update social media links

#### 2. About Section (`src/components/About.jsx`)
- Replace the placeholder image with your actual photo
- Update the statistics (years of experience, projects, etc.)
- Modify the about text to reflect your background
- Update the "What I do" section with your services

#### 3. Skills Section (`src/components/Skills.jsx`)
- Adjust skill levels (percentages) to match your expertise
- Add or remove skills based on your experience
- Update the "Currently Learning" section
- Modify skill categories as needed

#### 4. Projects Section (`src/components/Projects.jsx`)
- Replace project data with your actual projects
- Update project images, descriptions, and links
- Add your GitHub repositories and live demo links
- Modify project categories and filters

#### 5. Contact Section (`src/components/Contact.jsx`)
- Update email address and contact information
- Modify location and availability
- Update social media links
- Customize the contact form fields if needed

#### 6. Footer (`src/components/Footer.jsx`)
- Update copyright information with your name
- Modify social media links
- Customize the footer description

### Styling Customization

#### Color Scheme
The portfolio uses a blue-cyan gradient theme. To change colors:

1. **Primary Colors**: Replace `blue-400`, `blue-500`, `blue-600` with your preferred colors
2. **Accent Colors**: Replace `cyan-400`, `cyan-500` with complementary colors
3. **Background**: Modify the gradient backgrounds in the main container

#### Typography
- Update font sizes and weights in the Tailwind classes
- Modify text colors and spacing as needed

### Adding New Sections

To add new sections:

1. Create a new component in `src/components/`
2. Import and add it to `src/App.jsx`
3. Add navigation links in `src/components/Navbar.jsx`

### Image Optimization

For better performance:
- Use optimized images (WebP format recommended)
- Compress images before adding to the project
- Consider using a CDN for large images

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/repository-name"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Build and deploy: `npm run build && npm run deploy`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.

---

**Happy Coding! 🎉**
