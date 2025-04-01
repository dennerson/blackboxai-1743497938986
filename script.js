// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.classList.add(savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.classList.contains('dark') ? 'light' : 'dark';
    html.classList.remove('light', 'dark');
    html.classList.add(currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenu.classList.toggle('hidden');
    mobileMenuButton.innerHTML = isExpanded 
        ? '<i class="fas fa-bars text-gray-700 dark:text-white"></i>' 
        : '<i class="fas fa-times text-gray-700 dark:text-white"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-gray-700 dark:text-white"></i>';
    });
});

// Create particle animation
function createParticles() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * -20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.bottom = `-${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        heroSection.appendChild(particle);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});