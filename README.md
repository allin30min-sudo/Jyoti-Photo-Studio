# 📸 Jyoti Photo Studio - Premium Photography Website

> **From Shaadi to Film – A to Z Photo & Video Solutions**

A fully responsive, highly animated, premium photography studio website designed with cinematic aesthetics and modern web technologies.

![Website Preview](https://img.shields.io/badge/Status-Ready-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

### 🎬 Cinematic Design
- **Premium Color Palette**: Deep charcoal/black + warm gold + soft white
- **Camera-Themed Elements**: Lens flares, bokeh effects, aperture animations
- **Professional Typography**: Playfair Display for headings, Outfit for body text
- **Ambient Bokeh Background**: Floating light particles for depth

### 🎨 Advanced Animations
- **Scroll-Based Parallax**: Smooth depth-based scrolling effects
- **Lens Flare Effects**: Cinematic light highlights on key sections
- **Shutter/Aperture Transitions**: Camera-inspired reveal animations
- **Hover Effects**: Service cards with spotlight and zoom effects
- **Micro-Interactions**: Responsive buttons, smooth transitions

### 📱 Fully Responsive
- **Mobile-First Design**: Optimized for all device sizes
- **Touch-Optimized**: Enhanced interactions for mobile devices
- **Sticky Navigation**: Blur effect with smooth transitions
- **Mobile Menu**: Smooth slide-in hamburger menu

### 📄 Complete Page Structure
1. **Home Page**: Hero slider, highlights, services preview, gallery, testimonials
2. **About Us**: Studio story, team profiles, approach timeline
3. **Services**: Detailed service categories with package builder
4. **Gallery**: Filterable portfolio with lightbox viewer
5 **Packages & Pricing**: Suggested packages with customization options
6. **Testimonials**: Client reviews with ratings
7. **Blog**: Photography tips and guides (optional)
8. **Contact/Booking**: Multi-field booking form with validation

### 🚀 Performance Optimized
- **Lazy Loading**: Images load as needed
- **GPU Acceleration**: Smooth animations without lag
- **Throttled Scroll Events**: Optimized performance
- **Reduced Motion Support**: Respects user preferences

---

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with SEO optimization
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript**: No framework dependencies
- **Swiper.js**: Touch-enabled gallery slider
- **Font Awesome 6**: Premium icon library
- **Google Fonts**: Outfit & Playfair Display

---

## 📂 Project Structure

```
jyoti-photo-studio/
├── index.html                 # Main homepage
├── pages/                     # Additional pages
│   ├── about.html
│   ├── services.html
│   ├── gallery.html
│   ├── packages.html
│   ├── testimonials.html
│   ├── blog.html
│   └── contact.html
├── styles/                    # Stylesheets
│   ├── main.css              # Core styles & design system
│   ├── animations.css        # Animation definitions
│   ├── responsive.css        # Media queries
│   └── components.css        # UI components (forms, modals, etc.)
├── scripts/                   # JavaScript files
│   ├── main.js               # Core functionality
│   └── animations.js         # Animation controllers
├── assets/                    # Images and media
│   ├── images/
│   └── videos/
└── README.md                  # Documentation
```

---

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in your browser:
```bash
# Navigate to project folder
cd dynamic-constellation

# Open in default browser (Windows)
start index.html

# Or use Live Server in VS Code for best experience
```

### Option 2: Local Server (Recommended)
For best performance and to avoid CORS issues:

**Using Python:**
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

---

## 🎨 Customization Guide

### Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
    --color-primary: #C9A961;     /* Gold */
    --color-secondary: #2D2D2D;   /* Dark Gray */
    --color-dark: #1A1A1A;        /* Background */
    --color-white: #FFFFFF;       /* Text */
    --color-amber: #FF6B35;       /* Accent */
    --color-teal: #2EC4B6;        /* Accent 2 */
}
```

### Typography
Change fonts in `index.html` Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Images
Replace placeholder images in:
- Hero slider backgrounds
- Service card images
- Gallery items
- Team member photos

**Image Recommendations:**
- Hero: 1920x1080px (Full HD)
- Services: 600x400px
- Gallery: 800x600px
- Team: 400x400px (square)

### Contact Information
Update in `index.html` footer section:
- Phone number
- WhatsApp link
- Email address
- Studio address
- Social media links

---

## 📋 Features Checklist

### Design Elements
- [x] Bokeh background effects
- [x] Lens flare animations
- [x] Camera shutter overlay
- [x] Parallax scrolling
- [x] Gradient text effects
- [x] Glassmorphism elements

### Functionality
- [x] Hero image slider
- [x] Sticky navigation
- [x] Mobile hamburger menu
- [x] Smooth scroll
- [x] Gallery filtering
- [x] Swiper slider
- [x] Lightbox/modal viewer
- [x] Form validation
- [x] Scroll reveal animations
- [x] Counter animations
- [x] Mouse parallax effects

### Pages
- [x] Home/Landing page
- [ ] About Us page
- [ ] Services page
- [ ] Gallery page
- [ ] Packages page
- [ ] Testimonials page
- [ ] Blog page
- [ ] Contact/Booking page

*Note: Home page is complete. Additional pages follow the same structure and can be created based on the home page template.*

---

## 🎯 Key Services Highlighted

1. **Wedding & Pre-wedding Photography**
   - Engagement/Roka coverage
   - Pre-wedding outdoor/studio shoots
   - Wedding day documentation
   - Bridal portraits & couple sessions

2. **Events & Parties**
   - Birthday celebrations
   - Corporate events
   - Anniversary functions
   - Cultural shows

3. **Film & Content Production**
   - Short films
   - Music videos
   - Instagram Reels
   - YouTube content

4. **Commercial Photography**
   - Product photography
   - Corporate profiles
   - Branding shoots

5. **Portrait & Family**
   - Maternity shoots
   - Newborn photography
   - Family portraits
   - Fashion/model portfolios

6. **A to Z Event Solutions**
   - LED walls & displays
   - Live streaming
   - Drone cinematography
   - Album design & printing

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Mobile Safari | ✅ iOS 12+ |
| Chrome Mobile | ✅ Latest |

---

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support for animations
- High contrast mode compatible
- Screen reader friendly

---

## 🔧 Scripts Included

### Main.js
- Navigation management
- Hero slider
- Mobile menu toggle
- Scroll effects
- Gallery filters
- Form validation
- AOS animations

### Animations.js
- Scroll animation controller
- Custom cursor (optional)
- Image reveal effects
- Lens flare controller
- Text animations
- Lightbox system
- Counter animations

---

## 📞 Contact & Support

**Studio Contact:**
- 📱 Phone: +91 98765 43210
- 📧 Email: info@jyotiphotostudio.com
- 📍 Location: Mumbai, Maharashtra, India
- ⏰ Hours: Mon-Sun, 9:00 AM - 9:00 PM

**Social Media:**
- Instagram: @jyotiphotostudio
- Facebook: /jyotiphotostudio
- YouTube: Jyoti Photo Studio

---

## 📝 To-Do / Future Enhancements

- [ ] Add remaining pages (About, Services, Gallery, etc.)
- [ ] Integrate backend for contact form
- [ ] Add CMS for easy content updates
- [ ] Implement online booking system with calendar
- [ ] Add payment gateway integration
- [ ] Create admin dashboard
- [ ] Add blog with CMS
- [ ] Implement client gallery portal
- [ ] Add testimonials slider with video reviews
- [ ] SEO optimization with meta tags
- [ ] Add Schema.org markup
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Performance optimization (lazy load, compression)
- [ ] Add Google Analytics
- [ ] Implement WhatsApp chat widget
- [ ] Add Instagram feed integration

---

## 📄 License

This project is created for **Jyoti Photo Studio**. All rights reserved.

For licensing inquiries or custom development, please contact the studio.

---

## 🙏 Credits

- **Design & Development**: Premium Photo Studio Template
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Outfit, Playfair Display)
- **Slider**: Swiper.js
- **Images**: Unsplash (placeholders - replace with actual studio photos)

---

## 💡 Tips for Best Experience

1. **Use Live Server**: Install the Live Server extension in VS Code for hot reload
2. **Replace Images**: Swap placeholder images with high-quality studio photos
3. **Customize Content**: Update all text to match studio's actual services and information
4. **Test on Mobile**: Always check responsiveness on real devices
5. **Optimize Images**: Compress images before deployment for faster loading
6. **Add Real Reviews**: Replace testimonial placeholders with actual client reviews
7. **Update Contact Info**: Ensure all contact details are current

---

## 🚀 Deployment

### GitHub Pages
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/jyoti-photo-studio.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Netlify
1. Connect your repository
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

**Made with ❤️ for Jyoti Photo Studio**

*Capturing moments, creating memories* 📸✨
