# M. Pavan Kumar - Personal Portfolio Website

A modern, responsive, and interactive personal portfolio website showcasing skills, projects, certifications, and coding profiles.

## 🚀 Features

### Core Features
- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, colorful design with smooth animations
- **Dark/Light Mode Toggle**: Switch between themes seamlessly
- **Interactive Navigation**: Smooth scrolling with active link states
- **AI-Powered Chatbot**: Interactive assistant in the contact section

### Personal Branding
- **Photo Integration**: Your photo as logo in navigation and hero section
- **Professional Branding**: "CS Student & Developer" tagline
- **Custom Animations**: Enhanced visual effects and transitions

### Sections
1. **Home**: Hero section with introduction and photo
2. **About Me**: Bio, education, and interests
3. **Skills**: Progress bars for technical skills
4. **Projects**: Portfolio of work with descriptions
5. **Certifications**: Grid layout with clickable links
6. **Coding Profiles**: Links to LeetCode, CodeChef, HackerRank
7. **Goals**: Future aspirations and achievements
8. **Contact**: Contact form and social links

### Technical Skills
- HTML, CSS, JavaScript
- DSA in C (learning)
- API Development
- Frontend Development
- Power BI Basics
- Generative AI

### Certifications
- AWS Academy Graduate - Cloud Foundations
- Power BI Certification
- C Programming Certification
- Generative AI Course - GeeksforGeeks

### Coding Profiles
- LeetCode: https://leetcode.com/u/pavan1104/
- CodeChef: https://www.codechef.com/users/mpavan1104
- HackerRank: https://www.hackerrank.com/profile/mpavankumar11041

## 🐛 Recent Bug Fixes

### Fixed Issues
1. **Image Source Bug**: Fixed `logo.png` reference to use `pavan-photo.jpg`
2. **Missing Navigation Items**: Added "Certifications" and "Coding Profiles" to navigation
3. **Missing CSS Variables**: Added `--gradient-success` for success button styling
4. **Content Updates**: Updated with your specific information from the JSON requirements

### Enhanced Features
- Added Download Resume button with animation
- Updated contact information with your email
- Added social links to coding profiles
- Enhanced animations and visual effects
- Improved responsive design

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: AOS (Animate On Scroll), custom CSS keyframes
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **Responsive**: CSS Grid, Flexbox, Media Queries

## 📁 File Structure

```
.vscode/portpolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
├── pavan-photo.jpg     # Your profile photo
└── README.md           # This documentation
```

## 🚀 Getting Started

1. **Open the website**: Double-click `index.html` or open it in a web browser
2. **Navigate**: Use the navigation menu to explore different sections
3. **Interact**: Try the dark/light mode toggle, AI chatbot, and animations
4. **Contact**: Use the contact form or social links to get in touch

## ✉️ Contact Form Email Delivery

The contact form sends messages to your email using SMTP via Nodemailer in the Node backend.

### 1) Install dependencies

```
npm install
```

### 2) Create `.env` with SMTP credentials

Create a `.env` file in the project root with your SMTP provider settings:

```
PORT=3000

SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

MAIL_FROM="Portfolio <no-reply@yourdomain.com>"
MAIL_TO=mpavankumar110405@gmail.com
# Alternatively: CONTACT_RECIPIENT=mpavankumar110405@gmail.com
```

Common providers:
- Gmail: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587` (requires App Password)
- Outlook: `SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`
- Zoho: `SMTP_HOST=smtp.zoho.com`, `SMTP_PORT=587`

### 3) Run the backend server

```
npm run dev
# or
npm start
```

Visit `http://localhost:3000` and submit the contact form to receive emails.

### Troubleshooting
- If emails are not received, check server logs for `Error sending contact email`.
- Ensure `.env` values are set and correct.
- For Gmail, enable 2FA and create an App Password.
- Verify spam folder and allowed senders.

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Success: `#10b981` (Green)
- Accent: `#06b6d4` (Cyan)

### Animations
- Smooth transitions on all interactive elements
- AOS animations for scroll-triggered effects
- Custom 3D keyframe animations for enhanced visual appeal
- 3D transform effects with perspective and preserve-3d
- Hover animations with rotateX, rotateY, and scale effects

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔧 Future Enhancements

- [ ] Add actual resume download functionality
- [ ] Integrate with backend for dynamic content
- [ ] Add more interactive animations
- [ ] Implement blog section
- [ ] Add project filtering and search

## 📞 Contact

- **Email**: mpavankumar1104@gmail.com
- **Location**: Surampalem, Andhra Pradesh, India
- **Education**: B.Tech CSE at Aditya University, Surampalem

---

**Created with ❤️ for showcasing your skills and achievements!**
