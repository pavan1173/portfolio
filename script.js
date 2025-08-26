// Initialize AOS (Animate On Scroll) with enhanced settings
AOS.init({
    duration: 1200,
    easing: 'ease-out-cubic',
    once: true,
    mirror: false,
    offset: 100,
    delay: 0
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const chatbotToggle = document.querySelector('#chatbotToggle');
const chatbotContainer = document.querySelector('#chatbotContainer');
const chatbotClose = document.querySelector('#chatbotClose');
const chatbotMessages = document.querySelector('#chatbotMessages');
const chatbotInput = document.querySelector('#chatbotInput');
const chatbotSend = document.querySelector('#chatbotSend');
const contactForm = document.querySelector('#contactForm');

// Enhanced Navigation Toggle with Animation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navToggle.classList.contains('active')) {
            bar.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                 index === 1 ? 'opacity: 0' :
                                 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Reset hamburger bars
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
        });
    });
});

// Smooth scrolling for navigation links with enhanced animation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            
            // Add smooth scrolling with easing
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Add active state to clicked link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Enhanced Navbar background on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Dark/Light Theme Toggle with enhanced animation
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update theme toggle icon with rotation animation
    const themeIcon = themeToggle.querySelector('i');
    themeIcon.style.transform = 'rotate(360deg)';
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    setTimeout(() => {
        themeIcon.style.transform = 'rotate(0deg)';
    }, 300);
    
    // Add page transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Initialize theme
document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
const themeIcon = themeToggle.querySelector('i');
themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', toggleTheme);

// Enhanced AI Chatbot Functionality with more intelligent responses
const chatbotResponses = {
    greetings: [
        "Hello! I'm Pavan's AI assistant. I can help you learn about his skills, projects, education, and career goals. What would you like to know?",
        "Hi there! I'm here to tell you about M. Pavan Kumar - a passionate CS student and web developer. How can I help you?",
        "Welcome! I'm your guide to Pavan's portfolio. He's a Computer Science student at Aditya University with expertise in web development and AI tools."
    ],
    skills: [
        "Pavan has strong frontend development skills: HTML (90%), CSS (85%), JavaScript (75%). He's also learning DSA in C programming (70%) and working on API development (75%).",
        "His technical expertise includes: Frontend Development (80%), C Programming (80%), Power BI Basics (70%), Generative AI (75%), and Git/GitHub (70%).",
        "Pavan is particularly skilled in creating responsive web interfaces and has experience with modern web technologies. He's also exploring AI tools and content creation."
    ],
    projects: [
        "Pavan's main project is the Smart College Canteen System - a real-time live menu tracking system built with HTML/CSS. It helps students view updated item availability and reduces food waste.",
        "He's currently expanding the college canteen website into a real-time application with interactive features. The project demonstrates his ability to create practical, user-focused solutions.",
        "His projects showcase his skills in web development and his focus on creating solutions that solve real campus problems."
    ],
    education: [
        "Pavan is pursuing B.Tech in Computer Science and Engineering at Aditya University, Surampalem (2021-2025). He's currently in his final year.",
        "He completed his intermediate education at Ashwmeada Junior College, S V Jr College, Tirupathi, A.P.",
        "His education focuses on computer science fundamentals, programming, and practical web development skills."
    ],
    certifications: [
        "Pavan has earned several certifications: AWS Academy Graduate - Cloud Foundations, Power BI Certification, C Programming Certification, and Generative AI Course from GeeksforGeeks.",
        "His certifications demonstrate his commitment to continuous learning across cloud computing, data visualization, programming, and emerging AI technologies.",
        "These certifications complement his academic education and show his proactive approach to skill development."
    ],
    goals: [
        "Pavan's current goals include: improving communication skills (60% complete), creating an AI-enhanced portfolio (80% complete), starting content creation (40% complete), and getting placed in top tech companies (50% complete).",
        "He's actively working on multiple fronts: professional development, portfolio enhancement, personal branding through content creation, and career preparation for top tech companies.",
        "Pavan is ambitious and aims to work at companies like Apple. He's preparing through continuous learning, project building, and skill development."
    ],
    contact: [
        "You can reach Pavan at mpavankumar1104@gmail.com. He's based in Surampalem, Andhra Pradesh, India, and is always open to discussing opportunities.",
        "For professional inquiries, use the contact form on this website. You can also connect with him on GitHub, LinkedIn, Twitter, and Instagram.",
        "Pavan is particularly interested in discussing web development projects, AI tools, and opportunities at top tech companies."
    ],
    coding_profiles: [
        "Pavan is active on multiple coding platforms: LeetCode, CodeChef, and HackerRank. He has a 5-star rating on HackerRank and regularly participates in competitive programming.",
        "His coding profiles show his commitment to problem-solving and algorithmic thinking. You can find him on LeetCode, CodeChef, and HackerRank.",
        "He uses these platforms to practice DSA, improve his programming skills, and prepare for technical interviews."
    ],
    experience: [
        "Pavan has hands-on experience with C, C++, and Data Structures. He's worked on real-time operating system concepts and has good debugging skills.",
        "His project experience includes developing the Smart College Canteen System where he handled framework understanding, multimedia module development, and bug fixing.",
        "He has experience in requirement analysis, architectural design, and coordinating with team members on development projects."
    ],
    default: [
        "I'm not sure about that specific question, but I can tell you about Pavan's skills, projects, education, goals, coding profiles, or how to contact him. What would you like to know?",
        "That's an interesting question! While I don't have specific information about that, I can help you learn about Pavan's background, technical skills, or career aspirations.",
        "I'd be happy to help you learn more about Pavan's portfolio. You can ask me about his skills, projects, education, goals, coding profiles, or contact information."
    ]
};

function getChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse(chatbotResponses.greetings);
    } else if (message.includes('skill') || message.includes('technology') || message.includes('programming') || message.includes('tech')) {
        return getRandomResponse(chatbotResponses.skills);
    } else if (message.includes('project') || message.includes('work') || message.includes('portfolio') || message.includes('canteen')) {
        return getRandomResponse(chatbotResponses.projects);
    } else if (message.includes('education') || message.includes('college') || message.includes('university') || message.includes('degree') || message.includes('b.tech')) {
        return getRandomResponse(chatbotResponses.education);
    } else if (message.includes('certification') || message.includes('certificate') || message.includes('aws') || message.includes('power bi')) {
        return getRandomResponse(chatbotResponses.certifications);
    } else if (message.includes('goal') || message.includes('future') || message.includes('plan') || message.includes('ambition') || message.includes('career')) {
        return getRandomResponse(chatbotResponses.goals);
    } else if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('connect') || message.includes('location')) {
        return getRandomResponse(chatbotResponses.contact);
    } else if (message.includes('leetcode') || message.includes('codechef') || message.includes('hackerrank') || message.includes('coding') || message.includes('competitive')) {
        return getRandomResponse(chatbotResponses.coding_profiles);
    } else if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('internship')) {
        return getRandomResponse(chatbotResponses.experience);
    } else {
        return getRandomResponse(chatbotResponses.default);
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = isUser ? 'translateX(20px)' : 'translateX(-20px)';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageDiv);
    
    // Animate message appearance
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Enhanced Chatbot Toggle with animation
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    
    if (chatbotContainer.classList.contains('active')) {
        chatbotToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            chatbotToggle.style.transform = 'scale(1)';
        }, 150);
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Enhanced Send Message with typing indicator
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Simulate typing delay
        setTimeout(() => {
            typingDiv.remove();
            const response = getChatbotResponse(message);
            addMessage(response);
        }, 1500);
    }
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Formspree handles submission, so no JS needed for contact form

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Enhanced styles with animations
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.4s ease, glow 2s infinite;
        border-left: 4px solid ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#4f46e5'};
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add enhanced notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .typing-indicator {
        opacity: 0.7;
    }
    
    .typing-dots {
        display: flex;
        gap: 0.25rem;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--text-secondary);
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Skill Progress Animation with staggered effect
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.animation = 'glow 2s infinite';
        }, index * 200);
    });
}

// New Feature: Real-time Skill Progress Tracker
function initializeSkillTracker() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skillItem => {
        const progressBar = skillItem.querySelector('.skill-progress');
        const percentageSpan = skillItem.querySelector('.skill-info span:last-child');
        
        if (progressBar && percentageSpan) {
            const targetPercentage = parseInt(percentageSpan.textContent);
            let currentPercentage = 0;
            
            const animateProgress = () => {
                if (currentPercentage < targetPercentage) {
                    currentPercentage += 1;
                    progressBar.style.width = currentPercentage + '%';
                    percentageSpan.textContent = currentPercentage + '%';
                    requestAnimationFrame(animateProgress);
                }
            };
            
            // Start animation when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgress();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(skillItem);
        }
    });
}

// New Feature: Skill Category Filter
function initializeSkillFilter() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const filterButtons = document.createElement('div');
    filterButtons.className = 'skill-filters';
    filterButtons.innerHTML = `
        <button class="filter-btn active" data-category="all">All Skills</button>
        <button class="filter-btn" data-category="Frontend Development">Frontend</button>
        <button class="filter-btn" data-category="Programming & DSA">Programming</button>
        <button class="filter-btn" data-category="Other Skills">Other</button>
    `;
    
    const skillsSection = document.querySelector('.skills .container');
    const skillsGrid = document.querySelector('.skills-grid');
    
    if (skillsSection && skillsGrid) {
        skillsSection.insertBefore(filterButtons, skillsGrid);
        
        // Add filter functionality
        filterButtons.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const category = e.target.dataset.category;
                
                // Update active button
                filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Filter skills
                skillCategories.forEach(categoryElement => {
                    const categoryTitle = categoryElement.querySelector('h3').textContent;
                    if (category === 'all' || categoryTitle === category) {
                        categoryElement.style.display = 'block';
                        categoryElement.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        categoryElement.style.display = 'none';
                    }
                });
            }
        });
    }
}

// Enhanced Goal Progress Animation
function animateGoals() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.animation = 'shimmer 2s infinite';
        }, index * 300);
    });
}

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            } else if (entry.target.classList.contains('goals')) {
                animateGoals();
            }
            
            // Add staggered animation to cards
            const cards = entry.target.querySelectorAll('.project-card, .goal-card, .stat-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'scaleIn 0.6s ease forwards';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe sections for animations
const skillsSection = document.querySelector('.skills');
const goalsSection = document.querySelector('.goals');
const aboutSection = document.querySelector('.about');
const projectsSection = document.querySelector('.projects');

if (skillsSection) observer.observe(skillsSection);
if (goalsSection) observer.observe(goalsSection);
if (aboutSection) observer.observe(aboutSection);
if (projectsSection) observer.observe(projectsSection);

// Enhanced Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced Portfolio Download Feature
function downloadPortfolio() {
    const content = `
        M. Pavan Kumar - Portfolio
        
        About Me:
        Computer Science student at Aditya University, Surampalem
        Passionate about web development and AI technologies
        
        Skills:
        - HTML (90%)
        - CSS (85%)
        - JavaScript (75%)
        - C Programming (80%)
        - Data Structures (70%)
        - Algorithms (65%)
        
        Projects:
        1. Travel Website - HTML, CSS, JavaScript
        2. Travel API - Node.js, MongoDB
        3. College Canteen App - React, Real-time features
        
        Goals:
        - Improve communication skills
        - Create AI-enhanced portfolio
        - Start content creation
        - Get placed in top tech companies
        
        Contact:
        Email: pavan.kumar@example.com
        Location: Surampalem, Andhra Pradesh, India
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Pavan_Kumar_Portfolio.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Portfolio downloaded successfully!', 'success');
}

// Function to download resume
function downloadResume() {
    try {
        // Create a link element
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'M_Pavan_Kumar_Resume.pdf';
        link.target = '_blank';
        
        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Resume downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error downloading resume:', error);
        showNotification('Resume download failed. Please try again.', 'error');
    }
}

// Add download button to hero section with animation
const heroButtons = document.querySelector('.hero-buttons');
if (heroButtons) {
    const downloadBtn = document.createElement('a');
    downloadBtn.href = '#';
    downloadBtn.className = 'btn btn-secondary';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Portfolio';
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadResumeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            downloadResumeBtn.style.transform = 'scale(1)';
            downloadResume();
        }, 150);
    });
}

// Enhanced smooth reveal animations for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation to CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
window.addEventListener('load', createParticles);

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillTracker();
    initializeSkillFilter();
});

console.log('Enhanced portfolio website loaded successfully! 🚀');
console.log('Features: Enhanced animations, photo integration, particle effects, improved interactions, skill tracker, skill filters');
