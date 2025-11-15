# 🚀 Srujan's Ultimate Portfolio

## 🌟 Overview

The **Ultimate Portfolio** combines the best features from 4 different portfolio versions to create a cutting-edge, modern web experience. This portfolio showcases my journey as an AI Engineer, Robotics Specialist, and Space & Biotech Researcher.

### 🎯 Live Demo
- **Main Portfolio**: [https://srujan29112001.github.io/PortfolioHub/](https://srujan29112001.github.io/PortfolioHub/)
- **AI Portfolio**: [https://srujan29112001.github.io/AIPortfolio/](https://srujan29112001.github.io/AIPortfolio/)
- **Robotics Portfolio**: [https://srujan29112001.github.io/RoboticsPortfolio/](https://srujan29112001.github.io/RoboticsPortfolio/)
- **Research Portfolio**: [https://srujan29112001.github.io/SpaceBioTechPortfolio/](https://srujan29112001.github.io/SpaceBioTechPortfolio/)

## ✨ Features

### 🎨 Design & UI
- **Modern Dark/Light Theme**: Seamless theme switching with localStorage persistence
- **Interactive Particle System**: Dynamic canvas-based particle animations with mouse interaction
- **Glitch Text Effects**: Eye-catching glitch animations on hero text
- **Gradient Accents**: Beautiful gradient text and backgrounds throughout
- **3D Cube Loading Animation**: Professional loading screen with 3D CSS animations
- **Cursor Trail Effect**: Smooth cursor trail on desktop devices

### 🚀 Performance & Technical
- **PWA Ready**: Fully installable Progressive Web App with offline support
- **Service Worker**: Intelligent caching for offline functionality
- **Lazy Loading**: Images and content load on-demand for faster initial load
- **GSAP Animations**: Smooth, hardware-accelerated animations with ScrollTrigger
- **AOS Library**: Scroll-based reveal animations
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **SEO Optimized**: Schema.org structured data, meta tags, sitemap
- **Accessibility**: WCAG AA compliant with ARIA labels and keyboard navigation

### 📱 Sections
1. **Hero Section**: Animated introduction with typing effect and particle background
2. **Stats Counter**: Animated statistics with intersection observer
3. **About Section**: Expandable biography with tabbed content (Experience, Education, Hobbies)
4. **Specializations**: Three main focus areas with hover effects and portfolio links
5. **Projects Gallery**: Featured projects with video demos and documentation links
6. **Blog Section**: Latest posts with load more functionality
7. **Career Records**: Certificates and achievements showcase
8. **Contact Form**: Functional contact form with validation
9. **Footer**: Links to sub-portfolios and social media

### 🔧 Interactive Elements
- **Smooth Scrolling**: Navigation with active section highlighting
- **Progress Bar**: Visual scroll progress indicator
- **Back to Top**: Floating button for quick navigation
- **Motion Toggle**: Accessibility feature to disable animations
- **Hamburger Menu**: Mobile-responsive navigation
- **Tab System**: Organized content in About section
- **Read More/Less**: Expandable content sections
- **Social Links**: HuggingFace, Instagram, X (Twitter), GitHub, LinkedIn, Email

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript**: ES6+, async/await, Intersection Observer API
- **GSAP**: Professional animation library with ScrollTrigger
- **AOS**: Animate On Scroll library
- **Font Awesome**: Icon library

### PWA & Performance
- **Service Worker**: Offline caching and background sync
- **Web Manifest**: PWA configuration
- **Performance API**: Monitoring and optimization

### Design System
- **Fonts**: Dancing Script, Josefin Sans, Poppins, JetBrains Mono
- **Colors**: 
  - Primary: #0f0f1e (dark mode)
  - AI Orange: #ff6b35
  - Robotics Red: #ff3b30
  - Research Blue: #007aff
  - Accent Green: #00ff88

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Local web server (Live Server extension or Python HTTP server)
- Git (for version control)

### Quick Start
1. Clone or download the repository:
```bash
git clone https://github.com/srujan29112001/PortfolioHub.git
cd PortfolioHub
```

2. Add your images to the `Images/` folder:
   - `My Portfolio-modified (1).png` (logo)
   - `photo passport.png` (profile photo)
   - `DRDO-logo.png`
   - `thapar.png`
   - `JEE.jpeg`
   - `inter-state-board.png`
   - `TS-Board-SSC.png`

3. Update personal information in `index.html`:
   - Name and title
   - Biography text
   - Experience details
   - Education information
   - Project details
   - Social media links

4. Update Google Drive links in `main.js`:
   - Replace `YOUR_VIDEO_ID` with actual video IDs
   - Replace `YOUR_DOC_ID` with actual document IDs

5. Configure contact form:
   - Replace `YOUR_GOOGLE_SCRIPT_ID` in `index.html`
   - Set up Google Sheets integration (see below)

6. Serve locally:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code Live Server
# Right-click index.html -> "Open with Live Server"
```

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Set source to main branch
5. Save and wait for deployment
6. Access at: `https://[username].github.io/[repository-name]/`

### Netlify
1. Drag and drop project folder to [Netlify](https://www.netlify.com/)
2. Configure build settings if needed
3. Deploy instantly with automatic HTTPS

### Vercel
1. Import project to [Vercel](https://vercel.com/)
2. Configure project settings
3. Deploy with automatic preview URLs

## 📧 Contact Form Setup

### Google Sheets Integration
1. Create a new Google Sheet
2. Go to Extensions → Apps Script
3. Add the following script:
```javascript
function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.subject,
        data.message
    ]);
    return ContentService
        .createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
}
```
4. Deploy as web app and get the URL
5. Replace `YOUR_GOOGLE_SCRIPT_ID` in index.html

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --ai-orange: #ff6b35;  /* Your primary color */
    --robotics-red: #ff3b30;  /* Your secondary color */
    --research-blue: #007aff;  /* Your tertiary color */
}
```

### Animations
Adjust animation settings in `main.js`:
```javascript
// Particle density
const particleCount = 100;

// Typing speed
let typingSpeed = 100;

// Animation durations
const ANIMATION_DURATION = 1000;
```

### Content
All content is in `index.html` and `main.js`:
- Update text directly in HTML
- Modify project/blog data arrays in JavaScript

## 📊 Performance Optimization

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: Yes

### Optimization Tips
1. **Images**: Compress and use WebP format
2. **Code**: Minify CSS/JS for production
3. **Fonts**: Use font-display: swap
4. **Caching**: Configure service worker caching
5. **CDN**: Use CDN for external libraries

## 🐛 Troubleshooting

### Common Issues
1. **Animations not working**: Check if motion is enabled in settings
2. **Form not submitting**: Verify Google Script ID is correct
3. **Images not loading**: Ensure correct file paths and names
4. **PWA not installing**: Check HTTPS and manifest configuration
5. **Mobile menu issues**: Clear cache and reload

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

For support, email srujan29112001@gmail.com or open an issue.

## 🙏 Acknowledgments

- **Claude Opus 4.1**: Enhanced version with PWA and modern features
- **Perplexity Labs**: Interactive improvements and optimizations
- **Original Portfolio**: Base design and content structure
- **Open Source Libraries**: GSAP, AOS, Font Awesome

---

**Built with ❤️ and ☕ by Srujan**

*Transforming Ideas into Impact Across Disciplines*
