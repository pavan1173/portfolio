// Portfolio Analytics and Engagement Tracking
class PortfolioAnalytics {
    constructor() {
        this.analytics = {
            pageViews: 0,
            sectionViews: {},
            chatbotInteractions: 0,
            contactFormSubmissions: 0,
            downloadClicks: 0,
            socialLinkClicks: {},
            timeOnPage: 0,
            startTime: Date.now()
        };
        
        this.init();
    }
    
    init() {
        this.trackPageView();
        this.trackSectionViews();
        this.trackChatbotInteractions();
        this.trackContactForm();
        this.trackDownloads();
        this.trackSocialLinks();
        this.trackTimeOnPage();
        this.setupPeriodicSave();
    }
    
    trackPageView() {
        this.analytics.pageViews++;
        this.saveAnalytics();
        console.log('📊 Page view tracked');
    }
    
    trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.analytics.sectionViews[sectionId] = (this.analytics.sectionViews[sectionId] || 0) + 1;
                    this.saveAnalytics();
                    console.log(`📊 Section view tracked: ${sectionId}`);
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    trackChatbotInteractions() {
        const chatbotSend = document.querySelector('#chatbotSend');
        const chatbotInput = document.querySelector('#chatbotInput');
        
        if (chatbotSend) {
            chatbotSend.addEventListener('click', () => {
                this.analytics.chatbotInteractions++;
                this.saveAnalytics();
                console.log('📊 Chatbot interaction tracked');
            });
        }
        
        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.analytics.chatbotInteractions++;
                    this.saveAnalytics();
                    console.log('📊 Chatbot interaction tracked (Enter key)');
                }
            });
        }
    }
    
    trackContactForm() {
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                this.analytics.contactFormSubmissions++;
                this.saveAnalytics();
                console.log('📊 Contact form submission tracked');
            });
        }
    }
    
    trackDownloads() {
        const downloadButtons = document.querySelectorAll('[id*="download"], [class*="download"]');
        downloadButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.analytics.downloadClicks++;
                this.saveAnalytics();
                console.log('📊 Download click tracked');
            });
        });
    }
    
    trackSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link, a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="instagram"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                const platform = this.getSocialPlatform(link.href);
                this.analytics.socialLinkClicks[platform] = (this.analytics.socialLinkClicks[platform] || 0) + 1;
                this.saveAnalytics();
                console.log(`📊 Social link click tracked: ${platform}`);
            });
        });
    }
    
    getSocialPlatform(url) {
        if (url.includes('github')) return 'GitHub';
        if (url.includes('linkedin')) return 'LinkedIn';
        if (url.includes('twitter')) return 'Twitter';
        if (url.includes('instagram')) return 'Instagram';
        return 'Other';
    }
    
    trackTimeOnPage() {
        setInterval(() => {
            this.analytics.timeOnPage = Math.floor((Date.now() - this.analytics.startTime) / 1000);
        }, 1000);
        
        // Track time on page when user leaves
        window.addEventListener('beforeunload', () => {
            this.analytics.timeOnPage = Math.floor((Date.now() - this.analytics.startTime) / 1000);
            this.saveAnalytics();
        });
    }
    
    setupPeriodicSave() {
        // Save analytics every 30 seconds
        setInterval(() => {
            this.saveAnalytics();
        }, 30000);
    }
    
    saveAnalytics() {
        try {
            localStorage.setItem('portfolioAnalytics', JSON.stringify(this.analytics));
        } catch (error) {
            console.error('Error saving analytics:', error);
        }
    }
    
    loadAnalytics() {
        try {
            const saved = localStorage.getItem('portfolioAnalytics');
            if (saved) {
                const savedAnalytics = JSON.parse(saved);
                this.analytics = { ...this.analytics, ...savedAnalytics };
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
    }
    
    getAnalytics() {
        return this.analytics;
    }
    
    generateReport() {
        const report = {
            summary: {
                totalPageViews: this.analytics.pageViews,
                totalTimeOnPage: this.analytics.timeOnPage,
                totalChatbotInteractions: this.analytics.chatbotInteractions,
                totalContactSubmissions: this.analytics.contactFormSubmissions,
                totalDownloads: this.analytics.downloadClicks
            },
            sectionEngagement: this.analytics.sectionViews,
            socialEngagement: this.analytics.socialLinkClicks,
            timestamp: new Date().toISOString()
        };
        
        return report;
    }
    
    displayAnalytics() {
        const report = this.generateReport();
        console.log('📊 Portfolio Analytics Report:', report);
        
        // Create a simple analytics display
        const analyticsDisplay = document.createElement('div');
        analyticsDisplay.className = 'analytics-display';
        analyticsDisplay.innerHTML = `
            <div class="analytics-header">
                <h3>📊 Portfolio Analytics</h3>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="analytics-content">
                <div class="analytics-item">
                    <span>Page Views:</span>
                    <span>${report.summary.totalPageViews}</span>
                </div>
                <div class="analytics-item">
                    <span>Time on Page:</span>
                    <span>${Math.floor(report.summary.totalTimeOnPage / 60)}m ${report.summary.totalTimeOnPage % 60}s</span>
                </div>
                <div class="analytics-item">
                    <span>Chatbot Interactions:</span>
                    <span>${report.summary.totalChatbotInteractions}</span>
                </div>
                <div class="analytics-item">
                    <span>Contact Submissions:</span>
                    <span>${report.summary.totalContactSubmissions}</span>
                </div>
            </div>
        `;
        
        analyticsDisplay.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            max-width: 300px;
            font-size: 0.875rem;
        `;
        
        document.body.appendChild(analyticsDisplay);
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAnalytics = new PortfolioAnalytics();
    window.portfolioAnalytics.loadAnalytics();
    
    // Add analytics display button (for development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const analyticsBtn = document.createElement('button');
        analyticsBtn.innerHTML = '📊';
        analyticsBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;
        analyticsBtn.addEventListener('click', () => {
            window.portfolioAnalytics.displayAnalytics();
        });
        document.body.appendChild(analyticsBtn);
    }
});

console.log('📊 Portfolio Analytics initialized');
