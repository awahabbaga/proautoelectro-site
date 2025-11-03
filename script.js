// ========================================
// Scroll Progress Indicator
// ========================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ========================================
// Language Toggle with localStorage
// ========================================
const toggleBtn = document.getElementById('lang-toggle');
const frContent = document.getElementById('content-fr');
const enContent = document.getElementById('content-en');

// Check saved language preference
const savedLang = localStorage.getItem('preferredLanguage') || 'fr';

function updateNavLinks(lang) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const suffix = lang === 'en' ? '-en' : '';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            // Remove any existing language suffix
            const baseHref = href.replace('-en', '');
            // Add the appropriate suffix
            link.setAttribute('href', baseHref + suffix);
        }
    });
}

function setLanguage(lang) {
    if (lang === 'en') {
        frContent.style.display = 'none';
        enContent.style.display = 'block';
        toggleBtn.innerHTML = '<span class="lang-icon">🌐</span><span>FR</span>';
        document.documentElement.lang = 'en';
        localStorage.setItem('preferredLanguage', 'en');
        updateNavLinks('en');
    } else {
        frContent.style.display = 'block';
        enContent.style.display = 'none';
        toggleBtn.innerHTML = '<span class="lang-icon">🌐</span><span>EN</span>';
        document.documentElement.lang = 'fr';
        localStorage.setItem('preferredLanguage', 'fr');
        updateNavLinks('fr');
    }
}

// Initialize language on load
setLanguage(savedLang);

toggleBtn.addEventListener('click', () => {
    const currentLang = localStorage.getItem('preferredLanguage') || 'fr';
    setLanguage(currentLang === 'fr' ? 'en' : 'fr');
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (isExpanded) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Enhanced Scroll Animations with Stagger
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe service items and other elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.classList.add('scroll-reveal');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate info blocks
    const infoBlocks = document.querySelectorAll('.info-block');
    infoBlocks.forEach((block, index) => {
        block.classList.add('scroll-reveal');
        block.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(block);
    });
});

// ========================================
// Header Scroll Effect
// ========================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Enhanced Scroll Animations with Stagger
// ========================================
// Form Validation & Enhancement
// ========================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            
            // Find first invalid field and focus it
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                
                // Add visual feedback
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        input.style.borderColor = '#ff6b35';
                    } else {
                        input.style.borderColor = '';
                    }
                });
            }
            
            alert('Veuillez remplir tous les champs obligatoires. / Please fill all required fields.');
        } else {
            // Visual feedback on successful submission
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Envoi en cours... / Sending...';
                submitBtn.disabled = true;
            }
        }
    });

    // Remove error styling on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                input.style.borderColor = '';
            }
        });
    });
});

// ========================================
// Back to Top Button Smooth Scroll
// ========================================
const backToTopLinks = document.querySelectorAll('.back-to-top');
backToTopLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ========================================
// Image Lazy Loading Fallback (for older browsers)
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading natively
    console.log('Native lazy loading supported');
} else {
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Add animation classes on page load
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content with stagger
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroElements = heroContent.children;
        Array.from(heroElements).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            setTimeout(() => {
                el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        });
    }
});

// ========================================
// Add Smooth Cursor Effect (Desktop only)
// ========================================
if (window.innerWidth > 768) {
    const buttons = document.querySelectorAll('.cta, button, .service-item');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            this.style.cursor = 'pointer';
        });
    });
}

// ========================================
// Performance: Debounce Scroll Events
// ========================================
function debounce(func, wait = 10) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any additional scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);