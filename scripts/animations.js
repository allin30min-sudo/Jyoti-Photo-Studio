// ===================================
// ADVANCED ANIMATIONS CONTROLLER
// Smooth Cinematic Animations
// ===================================

// ===== Advanced Scroll Animations =====
class ScrollAnimationController {
    constructor() {
        this.elements = [];
        this.scrollPosition = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.collectElements();
        this.setupEventListeners();
        this.update();
    }

    collectElements() {
        // Collect all elements that need animation
        this.elements = {
            parallaxSections: document.querySelectorAll('.parallax-section'),
            fadeElements: document.querySelectorAll('.fade-on-scroll'),
            slideElements: document.querySelectorAll('.slide-on-scroll'),
            scaleElements: document.querySelectorAll('.scale-on-scroll'),
            rotateElements: document.querySelectorAll('.rotate-on-scroll')
        };
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => {
            this.scrollPosition = window.pageYOffset;
            this.requestTick();
        }, { passive: true });

        window.addEventListener('resize', this.debounce(() => {
            this.update();
        }, 250));
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.update());
            this.ticking = true;
        }
    }

    update() {
        this.ticking = false;

        // Disable heavy scroll animations on mobile for performance
        if (window.innerWidth < 768) {
            // Optional: ensure elements are visible if we skip animation
            // or just let them be handled by simple CSS or IntersectionObserver
            return;
        }

        this.animateElements();
    }

    animateElements() {
        const windowHeight = window.innerHeight;
        const scrolled = this.scrollPosition;

        // Parallax sections
        this.elements.parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const offset = (scrolled - section.offsetTop) * 0.5;
            section.style.transform = `translateY(${offset}px)`;
        });

        // Fade elements
        this.elements.fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                const opacity = Math.min(1, (windowHeight - elementTop) / (windowHeight * 0.5));
                element.style.opacity = opacity;
            }
        });

        // Slide elements
        this.elements.slideElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < windowHeight * 0.85) {
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
            }
        });

        // Scale elements
        this.elements.scaleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const viewportCenter = windowHeight / 2;

            if (elementTop < windowHeight && elementTop + elementHeight > 0) {
                const distance = Math.abs(viewportCenter - (elementTop + elementHeight / 2));
                const scale = 1 - (distance / windowHeight) * 0.1;
                element.style.transform = `scale(${Math.max(0.9, Math.min(1, scale))})`;
            }
        });
    }

    debounce(func, wait) {
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
}

// ===== Cursor Animation (Optional Premium Effect) =====
class CustomCursor {
    constructor() {
        this.cursor = {
            dot: null,
            outline: null
        };
        this.position = { x: 0, y: 0 };
        this.targetPosition = { x: 0, y: 0 };
        this.init();
    }

    init() {
        // Only initialize on desktop
        if (window.innerWidth > 1024) {
            this.createCursor();
            this.setupEventListeners();
            this.animate();
        }
    }

    createCursor() {
        this.cursor.dot = document.createElement('div');
        this.cursor.dot.classList.add('cursor-dot');

        this.cursor.outline = document.createElement('div');
        this.cursor.outline.classList.add('cursor-outline');

        document.body.appendChild(this.cursor.dot);
        document.body.appendChild(this.cursor.outline);
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.targetPosition = { x: e.clientX, y: e.clientY };
        });

        // Expand cursor on clickable elements
        document.querySelectorAll('a, button, .clickable').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.outline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    animate() {
        // Smooth cursor movement
        this.position.x += (this.targetPosition.x - this.position.x) * 0.15;
        this.position.y += (this.targetPosition.y - this.position.y) * 0.15;

        if (this.cursor.dot && this.cursor.outline) {
            this.cursor.dot.style.left = this.position.x + 'px';
            this.cursor.dot.style.top = this.position.y + 'px';

            this.cursor.outline.style.left = this.position.x + 'px';
            this.cursor.outline.style.top = this.position.y + 'px';
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ===== Image Reveal Animations =====
class ImageRevealController {
    constructor() {
        this.images = document.querySelectorAll('.reveal-image');
        this.init();
    }

    init() {
        this.setupObserver();
    }

    setupObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }

    revealImage(image) {
        // Aperture-style reveal
        image.style.clipPath = 'circle(0% at 50% 50%)';

        setTimeout(() => {
            image.style.transition = 'clip-path 1s ease-out';
            image.style.clipPath = 'circle(100% at 50% 50%)';
        }, 100);
    }
}

// ===== Lens Flare Effect Controller =====
class LensFlareController {
    constructor() {
        this.flares = document.querySelectorAll('.lens-flare');
        this.init();
    }

    init() {
        this.animateFlares();
    }

    animateFlares() {
        this.flares.forEach((flare, index) => {
            setInterval(() => {
                flare.style.animation = 'none';
                setTimeout(() => {
                    flare.style.animation = 'flare 3s ease-in-out';
                }, 10);
            }, 5000 + (index * 1000));
        });
    }
}

// ===== Text Animation Controller =====
class TextAnimationController {
    constructor() {
        this.animatedTexts = document.querySelectorAll('.animate-text');
        this.init();
    }

    init() {
        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateText(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.animatedTexts.forEach(text => observer.observe(text));
    }

    animateText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';

        // Split text into characters
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.animation = `fadeIn 0.05s ease-in forwards`;
            span.style.animationDelay = `${index * 0.03}s`;
            element.appendChild(span);
        });
    }
}

// ===== Modal/Lightbox Controller =====
class LightboxController {
    constructor() {
        this.lightbox = null;
        this.currentIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        this.createLightbox();
        this.setupTriggers();
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.classList.add('lightbox');
        this.lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&larr;</button>
                <button class="lightbox-next">&rarr;</button>
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(this.lightbox);

        this.setupLightboxEvents();
    }

    setupTriggers() {
        document.querySelectorAll('.gallery-item img, [data-lightbox]').forEach((img, index) => {
            this.images.push({
                src: img.src,
                alt: img.alt || '',
                caption: img.dataset.caption || ''
            });

            img.addEventListener('click', () => {
                this.openLightbox(index);
            });

            img.style.cursor = 'pointer';
        });
    }

    setupLightboxEvents() {
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        this.lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => {
            this.closeLightbox();
        });

        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            this.showPrevious();
        });

        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            this.showNext();
        });

        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.showPrevious();
                if (e.key === 'ArrowRight') this.showNext();
            }
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        const img = this.images[this.currentIndex];
        this.lightbox.querySelector('.lightbox-image').src = img.src;
        this.lightbox.querySelector('.lightbox-caption').textContent = img.caption;
    }
}

// ===== Counter Animation =====
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.current = 0;
        this.increment = target / (duration / 16);
    }

    animate() {
        const step = () => {
            this.current += this.increment;
            if (this.current < this.target) {
                this.element.textContent = Math.floor(this.current);
                requestAnimationFrame(step);
            } else {
                this.element.textContent = this.target;
            }
        };
        step();
    }
}

// ===== Initialize All Animation Controllers =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const scrollController = new ScrollAnimationController();

    // Initialize custom cursor (desktop only)
    if (window.innerWidth > 1024) {
        // const customCursor = new CustomCursor();
        // Commented out by default, uncomment to enable
    }

    // Initialize image reveal
    const imageReveal = new ImageRevealController();

    // Initialize lens flare effects
    const lensFlare = new LensFlareController();

    // Initialize text animations
    const textAnimation = new TextAnimationController();

    // Initialize lightbox
    const lightbox = new LightboxController();

    // Initialize counters (if any)
    document.querySelectorAll('[data-counter]').forEach(element => {
        const target = parseInt(element.dataset.counter);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    new CounterAnimation(element, target).animate();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
});

// ===== Smooth Page Transitions =====
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

// ===== Export for external use =====
window.animationControllers = {
    ScrollAnimationController,
    CustomCursor,
    ImageRevealController,
    LensFlareController,
    TextAnimationController,
    LightboxController,
    CounterAnimation
};
