// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Simple AOS (Animate On Scroll) implementation
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 500px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    
    // Add some interactive animations to the phone mockup
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) {
        // Simulate app activity
        setInterval(() => {
            const progressFill = phoneScreen.querySelector('.progress-fill');
            if (progressFill) {
                const currentWidth = parseInt(progressFill.style.width) || 0;
                const newWidth = (currentWidth + 5) % 100;
                progressFill.style.width = newWidth + '%';
            }
        }, 2000);
    }
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        card.addEventListener('click', function() {
            const darkPref = localStorage.getItem('darkmode') === 'true';
            if(darkPref){
                console.log("clicked");
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// GitHub link function
function openGitHub() {
    // Replace with actual GitHub repository URL
    window.open('https://github.com/yourusername/workoutmix', '_blank');
}

// Add typing effect to hero title
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
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.dashboard-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(statsSection);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, -6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, 6px);
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .feature-card, .tech-card, .screenshot-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .feature-card.aos-animate, .tech-card.aos-animate, .screenshot-card.aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(loadingStyle);

// Add smooth hover effects for technology cards
document.addEventListener('DOMContentLoaded', function() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width || '0%';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = targetWidth;
        }, 50);
    });
}

// Trigger progress bar animation when screenshots section is visible
const screenshotsSection = document.querySelector('.screenshots');
if (screenshotsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(screenshotsSection);
}

// Add floating animation to phone mockup
document.addEventListener('DOMContentLoaded', function() {
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        phoneMockup.style.animation = 'float 6s ease-in-out infinite';
    }
});

// Add CSS for floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }
    
    .phone-mockup {
        animation: float 6s ease-in-out infinite;
    }
`;
document.head.appendChild(floatStyle); 

// Dark mode toggle functionality
function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkmode', 'true');
    } else {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkmode', 'false');
    }
    // Swap screenshot images
    swapScreenshotImages(enabled);
}

function swapScreenshotImages(isDark) {
    document.querySelectorAll('.app-screenshot').forEach(img => {
        const light = img.getAttribute('data-img-light');
        const dark = img.getAttribute('data-img-dark');
        if (isDark && dark) {
            img.src = dark;
        } else if (light) {
            img.src = light;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const darkCard = document.getElementById('darkmode-toggle-card');
    if (darkCard) {
        darkCard.style.cursor = 'pointer';
        darkCard.addEventListener('click', function() {
            const isDark = document.body.classList.contains('darkmode');
            setDarkMode(!isDark);
        });
    }
    // On load, check localStorage
    const darkPref = localStorage.getItem('darkmode') === 'true';
    setDarkMode(darkPref);
});

// Inject dark mode CSS if not present
(function() {
    if (!document.getElementById('darkmode-style')) {
        const style = document.createElement('style');
        style.id = 'darkmode-style';
        style.textContent = `
        body.darkmode {
            background: #181A20 !important;
            color: #F3F4F6 !important;
        }
        body.darkmode .navbar {
            background: rgba(24,26,32,0.98) !important;
            box-shadow: 0 2px 12px rgba(16,185,129,0.08);
        }
        body.darkmode .nav-logo,
        body.darkmode .nav-logo i {
            color: #10B981 !important;
        }
        body.darkmode .nav-menu a {
            color: #F3F4F6 !important;
        }
        body.darkmode .nav-menu a:hover {
            color: #10B981 !important;
        }
        body.darkmode .hamburger span {
            background: #F3F4F6 !important;
        }
        body.darkmode .nav-menu.active {
            background: #23263A !important;
        }
        body.darkmode .hero {
            background: linear-gradient(135deg, #23263A 0%, #181A20 100%) !important;
            color: #F3F4F6 !important;
        }
        body.darkmode .hero-title {
            color: #F3F4F6 !important;
        }
        body.darkmode .hero-subtitle {
            color: #A1A1AA !important;
        }
        body.darkmode .hero-buttons .btn-primary {
            background: linear-gradient(45deg, #3B82F6, #10B981) !important;
            color: #fff !important;
        }
        body.darkmode .hero-buttons .btn-secondary {
            background: rgba(255,255,255,0.08) !important;
            color: #fff !important;
            border-color: #33364D !important;
        }
        body.darkmode .btn {
            color: #F3F4F6 !important;
        }
        body.darkmode .phone-mockup {
            background: #23263A !important;
            box-shadow: 0 2px 12px #181A20, 0 20px 40px rgba(16,185,129,0.10);
        }
        body.darkmode .phone-screen {
            background: #181A20 !important;
        }
        body.darkmode .app-header {
            background: linear-gradient(135deg, #23263A 0%, #3B82F6 100%) !important;
            color: #F3F4F6 !important;
        }
        body.darkmode .app-title {
            color: #F3F4F6 !important;
        }
        body.darkmode .app-status {
            background: rgba(16,185,129,0.18) !important;
            color: #fff !important;
        }
        body.darkmode .app-content {
            background: #23263A !important;
        }
        body.darkmode .workout-card {
            background: #23263A !important;
            color: #F3F4F6 !important;
            box-shadow: 0 4px 20px rgba(16,185,129,0.10);
        }
        body.darkmode .exercise-name {
            color: #F3F4F6 !important;
        }
        body.darkmode .set-info {
            color: #A1A1AA !important;
        }
        body.darkmode .progress-bar {
            background: #374151 !important;
        }
        body.darkmode .progress-fill {
            background: linear-gradient(45deg, #10B981, #3B82F6) !important;
        }
        body.darkmode .stats {
            color: #A1A1AA !important;
        }
        body.darkmode .stats span {
            background: #23263A !important;
            color: #F3F4F6 !important;
        }
        body.darkmode .features,
        body.darkmode .technology,
        body.darkmode .container,
        body.darkmode .footer {
            background: #181A20 !important;
            color: #F3F4F6 !important;
        }
        body.darkmode .feature-card,
        body.darkmode .tech-card,
        body.darkmode .screenshot-card {
            background: #23263A !important;
            color: #F3F4F6 !important;
            border-color: #33364D !important;
            box-shadow: 0 4px 32px rgba(16,185,129,0.10);
        }
        
        /* Dark mode specific styling for the dark mode toggle card */
        body.darkmode #darkmode-toggle-card::before {
            background: linear-gradient(45deg, #3B82F6, #10B981) !important;
            color: #fff !important;
        }
        
        body.darkmode #darkmode-toggle-card:hover {
            border-color: #10B981 !important;
            box-shadow: 0 15px 45px rgba(16,185,129,0.25), 0 3px 10px rgba(59,130,246,0.20) !important;
        }
        
        body.darkmode #darkmode-toggle-card::after {
            opacity: 0.9 !important;
        }
        body.darkmode .feature-card h3,
        body.darkmode .tech-card h3,
        body.darkmode .screenshot-title {
            color: #F3F4F6 !important;
        }
        body.darkmode .feature-card p,
        body.darkmode .tech-card p,
        body.darkmode .section-header p,
        body.darkmode .screenshots .section-header p {
            color: #A1A1AA !important;
        }
        body.darkmode .feature-icon,
        body.darkmode .tech-icon {
            background: linear-gradient(45deg, #3B82F6, #10B981) !important;
            color: #fff !important;
        }
        body.darkmode .section-header h2 {
            background: linear-gradient(45deg, #10B981, #3B82F6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        body.darkmode .footer {
            background: #181A20 !important;
            color: #F3F4F6 !important;
        }
        body.darkmode .footer-links a {
            color: #F3F4F6 !important;
        }
        body.darkmode .footer-links a:hover {
            color: #10B981 !important;
        }
        body.darkmode .footer-logo i,
        body.darkmode .footer-logo span {
            color: #10B981 !important;
        }
        body.darkmode .screenshots {
            background: linear-gradient(135deg, #23263A 0%, #181A20 100%) !important;
            color: #F3F4F6 !important;
        }
        body.darkmode .screenshot-title {
            color: #F3F4F6 !important;
        }
        body.darkmode .screenshot-card:hover {
            box-shadow: 0 30px 60px rgba(16,185,129,0.18);
            border-color: #10B981 !important;
        }
        body.darkmode .app-screenshot {
            box-shadow: 0 4px 24px rgba(59,130,246,0.18);
        }
        body.darkmode .btn-primary {
            background: linear-gradient(45deg, #3B82F6, #10B981) !important;
            color: #fff !important;
        }
        body.darkmode .btn-secondary {
            background: rgba(255,255,255,0.08) !important;
            color: #fff !important;
            border-color: #33364D !important;
        }
        @media (max-width: 900px) {
            body.darkmode .nav-menu {
                background: #23263A !important;
            }
        }
        @media (max-width: 600px) {
            body.darkmode .container {
                background: #181A20 !important;
            }
            body.darkmode .screenshots .section-header h2 {
                color: #F3F4F6 !important;
            }
        }
        `;
        document.head.appendChild(style);
    }
})(); 