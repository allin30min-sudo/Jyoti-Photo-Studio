// ===================================
// JYOTI PHOTO STUDIO - MAIN SCRIPTS
// Premium Photography Website
// ===================================

// ===== Global Variables =====
let scrollPosition = 0;
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const SLIDE_INTERVAL = 5000; // 5 seconds

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initHeroSlider();
    initScrollEffects();
    initGalleryFilters();
    initSwiperSlider();
    initAOSAnimations();
    initParallaxEffects();
    initMobileMenu();
});

// ===== Utility Functions (Hoisted) =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Navigation Functions =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navigation on scroll - Throttled
    const handleScroll = throttle(function () {
        scrollPosition = window.pageYOffset;

        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update parallax effect only if not on mobile/touch to save resources
        if (window.matchMedia("(min-width: 768px)").matches) {
            updateParallax();
        }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== Hero Slider =====
function initHeroSlider() {
    if (slides.length === 0) return;

    // Start the slider
    setInterval(() => {
        // Optimize: verify logic needed here? Yes, but ensure valid DOM elements
        if (slides[currentSlide]) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }
        }
    }, SLIDE_INTERVAL);

    // Shutter effect on page load
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('shutter-effect');
        }
    }, 100);
}

// ===== Scroll Effects =====
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.section-reveal, .reveal-on-scroll');

    // Performance optimization: disconnect if no elements
    if (revealElements.length === 0 && !document.querySelector('.scroll-indicator')) return;

    const checkReveal = throttle(function () {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }, 200);

    window.addEventListener('scroll', checkReveal, { passive: true });
    checkReveal(); // Initial check

    // Section-wise scroll with loop
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        let sectionIndex = 0;
        const allSections = document.querySelectorAll('section');

        scrollIndicator.addEventListener('click', function () {
            sectionIndex++;

            if (sectionIndex >= allSections.length) {
                // Determine if we are at the bottom of the page
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                    sectionIndex = 0;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                sectionIndex = 0;
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = allSections[sectionIndex];
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Adjust for navbar
                        behavior: 'smooth'
                    });
                }
            }
        });

        // Ensure index stays synced if user scrolls manually - Throttled
        const syncIndex = throttle(function () {
            let currentScroll = window.scrollY + 100;
            allSections.forEach((section, index) => {
                if (section.offsetTop <= currentScroll && (section.offsetTop + section.offsetHeight) > currentScroll) {
                    sectionIndex = index;
                }
            });
        }, 500);

        window.addEventListener('scroll', syncIndex, { passive: true });
    }
}

// ===== Gallery Filters =====
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Use requestAnimationFrame for smoother class addition
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Swiper Slider Initialization =====
function initSwiperSlider() {
    // Check if Swiper is loaded
    if (typeof Swiper !== 'undefined') {
        const gallerySwiper = new Swiper('.gallery-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            effect: 'slide',
            speed: 800,
        });
    }
}

// ===== AOS (Animate On Scroll) Alternative =====
function initAOSAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const checkAOS = throttle(function () {
        const windowHeight = window.innerHeight;
        const triggerBottom = windowHeight * 0.8;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('aos-animate');
            }
        });
    }, 150);

    window.addEventListener('scroll', checkAOS, { passive: true });
    checkAOS(); // Initial check
}

// ===== Parallax Effects =====
function initParallaxEffects() {
    // Only init if we have parallax elements
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
    if (parallaxElements.length > 0) {
        // We attach the listener in initNavigation or globally, but let's ensure it's not duplicated.
        // The actual update function is called inside the throttled handleScroll in initNavigation.
        // So we don't need another listener here.
    }
}

function updateParallax() {
    const scrolled = window.pageYOffset;

    // Use transform3d for hardware acceleration
    document.querySelectorAll('.parallax-slow').forEach(element => {
        element.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
    });

    document.querySelectorAll('.parallax-medium').forEach(element => {
        element.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    });

    document.querySelectorAll('.parallax-fast').forEach(element => {
        element.style.transform = `translate3d(0, ${scrolled * 0.7}px, 0)`;
    });
}

// ===== Mouse Move Effects (Bokeh & Elements) =====
// Optimization: Disable on touch devices to prevent lag
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener('mousemove', throttle(function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Move bokeh elements based on mouse position
        const bokehElements = document.querySelectorAll('.bokeh');
        bokehElements.forEach((bokeh, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * 50 * speed;
            const y = (mouseY - 0.5) * 50 * speed;
            // hardware accelerated transform
            bokeh.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }, 50));
}

// ===== Button Ripple Effect =====
document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== Camera Flash Effect (Optional - Can be triggered on certain actions) =====
function triggerCameraFlash() {
    const flashOverlay = document.createElement('div');
    flashOverlay.classList.add('flash-overlay', 'active');
    document.body.appendChild(flashOverlay);

    setTimeout(() => {
        flashOverlay.remove();
    }, 500);
}

// ===== Lazy Loading Images =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback or load all immediately
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// ===== Form Validation (For Contact/Booking Forms) =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                showError(input, 'This field is required');
            } else {
                input.classList.remove('error');
                hideError(input);
            }

            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    showError(input, 'Please enter a valid email');
                }
            }

            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                    isValid = false;
                    input.classList.add('error');
                    showError(input, 'Please enter a valid 10-digit phone number');
                }
            }
        });

        if (isValid) {
            // Submit form or show success message
            showSuccessMessage('Form submitted successfully!');
            form.reset();
        }
    });
}

function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

function hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.classList.add('success-message');
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.classList.add('show');
    }, 10);

    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// ===== Export functions for use in other modules =====
window.jyotiPhotoStudio = {
    triggerCameraFlash,
    validateForm,
    showSuccessMessage,
    debounce,
    throttle
};

// ===== Console Branding =====
console.log('%c🎬 Jyoti Photo Studio', 'color: #C9A961; font-size: 24px; font-weight: bold;');
console.log('%cFrom Shaadi to Film – A to Z Photo & Video Solutions', 'color: #D4B876; font-size: 14px;');
console.log('%cWebsite loaded successfully!', 'color: #2EC4B6; font-size: 12px;');
