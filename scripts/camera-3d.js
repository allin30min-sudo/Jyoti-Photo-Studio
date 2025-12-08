// ===================================
// 3D CAMERA EFFECTS CONTROLLER
// Advanced 3D Interactive Animations
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    init3DCameraEffects();
    initParallax3D();
    initCameraGestures();
    init3DScrollAnimations();
});

// ===== 3D Camera Effects Initialization =====
function init3DCameraEffects() {
    // Add 3D tilt effect on mouse move for cards
    const cards3D = document.querySelectorAll('.service-card, .highlight-card, .testimonial-card, .feature-item');

    cards3D.forEach(card => {
        card.addEventListener('mousemove', handleCard3DMove);
        card.addEventListener('mouseleave', handleCard3DLeave);
    });

    // Add camera lens border effect to images
    const galleryImages = document.querySelectorAll('.gallery-item, .service-image');
    galleryImages.forEach(img => {
        img.classList.add('camera-lens-border');
    });

    // Add 3D text effect to headings
    const mainHeadings = document.querySelectorAll('h1, h2');
    mainHeadings.forEach(heading => {
        heading.classList.add('text-3d');
    });
}

// ===== Handle 3D Card Mouse Movement =====
function handleCard3DMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 15; // Max 15deg tilt
    const rotateY = ((centerX - x) / centerX) * 15;

    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(20px)
        scale3d(1.05, 1.05, 1.05)
    `;

    card.style.transition = 'transform 0.1s ease-out';
}

// ===== Reset 3D Card on Mouse Leave =====
function handleCard3DLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
}

// ===== Enhanced 3D Parallax Effect =====
function initParallax3D() {
    // Removed .hero-content to stop text movement
    const parallaxElements = document.querySelectorAll('.section-title, .bokeh');

    window.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = mouseX * 50 * speed;
            const y = mouseY * 50 * speed;
            const z = speed * 10;

            element.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        });
    });
}

// ===== Camera Gesture Controls =====
function initCameraGestures() {
    // Double-click for zoom effect
    const zoomableElements = document.querySelectorAll('.service-card, .gallery-item');

    zoomableElements.forEach(element => {
        let clickCount = 0;
        let clickTimer = null;

        element.addEventListener('click', function () {
            clickCount++;

            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                triggerCameraZoom(element);
            }
        });
    });

    // Add focus pull effect on scroll into view
    observeFocusPull();
}

// ===== Camera Zoom Animation =====
function triggerCameraZoom(element) {
    element.style.animation = 'lensZoom 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// ===== Focus Pull Observer =====
function observeFocusPull() {
    // Disable heavy focus pull animation on mobile/tablet to prevent flickering
    if (window.innerWidth < 768) return;

    const focusElements = document.querySelectorAll('.service-card, .highlight-card, .feature-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'focusPull 0.8s ease-out';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 800);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    focusElements.forEach(element => observer.observe(element));
}

// ===== 3D Scroll Animations =====
function init3DScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-aos');

                // Add 3D effects based on animation type
                if (animation === 'zoom-in') {
                    element.style.animation = 'lensZoom 0.8s ease-out forwards';
                } else if (animation === 'fade-up') {
                    element.style.animation = 'depth3D 1s ease-out forwards';
                }

                element.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.2
    });

    scrollElements.forEach(element => observer.observe(element));
}

// ===== Camera Flash Effect on Click =====
function triggerCameraFlash() {
    const flash = document.createElement('div');
    flash.className = 'camera-flash-overlay';
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
    `;

    document.body.appendChild(flash);

    // Animate flash
    flash.style.animation = 'flash3D 0.5s ease-out';

    setTimeout(() => {
        flash.remove();
    }, 500);
}

// ===== Add flash effect to buttons =====
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (!this.href || this.href === '#') {
            e.preventDefault();
            triggerCameraFlash();
        }
    });
});

// ===== 3D Carousel Effect for Gallery =====
function init3DGalleryCarousel() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    const totalItems = galleryItems.length;

    function rotateGallery() {
        galleryItems.forEach((item, index) => {
            const angle = ((index - currentIndex) * (360 / totalItems));
            const z = Math.cos(angle * Math.PI / 180) * 300;
            const x = Math.sin(angle * Math.PI / 180) * 300;

            item.style.transform = `
                perspective(1200px)
                translateX(${x}px)
                translateZ(${z}px)
                rotateY(${-angle}deg)
            `;

            item.style.opacity = z > 0 ? 1 : 0.3;
        });
    }

    // Auto-rotate (optional)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalItems;
    //     rotateGallery();
    // }, 3000);
}

// ===== Gyroscope Effect (for mobile devices) =====
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
}

function handleOrientation(event) {
    const beta = event.beta;  // Range: -180 to 180 (front-back tilt)
    const gamma = event.gamma; // Range: -90 to 90 (left-right tilt)

    // const hero = document.querySelector('.hero-content');
    // if (hero) {
    //     // Disabled to keep text static as requested
    //     // const tiltX = (gamma / 90) * 10;
    //     // const tiltY = (beta / 180) * 10;

    //     // hero.style.transform = `
    //     //     perspective(1000px)
    //     //     rotateX(${tiltY}deg)
    //     //     rotateY(${tiltX}deg)
    //     // `;
    // }
}

// ===== 3D Depth on Scroll =====
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    // Disable heavy 3D scroll effects on mobile/tablet
    if (window.innerWidth < 1024) return;

    const scrollPosition = window.pageYOffset;
    const scrollDelta = scrollPosition - lastScrollPosition;

    // Add depth to sections based on scroll
    document.querySelectorAll('section').forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distanceFromCenter = rect.top + (rect.height / 2) - (window.innerHeight / 2);
        const normalizedDistance = distanceFromCenter / window.innerHeight;

        const rotateX = normalizedDistance * 5; // Max 5deg rotation
        const translateZ = Math.abs(normalizedDistance) * -20; // Parallax depth

        section.style.transform = `
            perspective(2000px)
            rotateX(${rotateX}deg)
            translateZ(${translateZ}px)
        `;
    });

    lastScrollPosition = scrollPosition;
}, { passive: true });

// ===== Camera Focus Ring Animation =====
function addFocusRing(element) {
    const ring = document.createElement('div');
    ring.className = 'focus-ring';
    ring.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin: -50px 0 0 -50px;
        border: 3px solid rgba(201, 169, 97, 0.8);
        border-radius: 50%;
        pointer-events: none;
        animation: focusRingPulse 1s ease-out;
        z-index: 100;
    `;

    element.style.position = 'relative';
    element.appendChild(ring);

    setTimeout(() => ring.remove(), 1000);
}

// Add focus ring style
const style = document.createElement('style');
style.textContent = `
    @keyframes focusRingPulse {
        0% {
            transform: scale(0.5) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }
    
    .camera-flash-overlay {
        animation: flash3D 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// ===== Apply focus ring on important elements =====
document.querySelectorAll('.btn-primary, .service-card').forEach(element => {
    element.addEventListener('mouseenter', function () {
        addFocusRing(this);
    });
});

// ===== 3D Loading Effect =====
window.addEventListener('load', () => {
    // Disabled body focus pull to prevent whole page flicker/glitch
    // document.body.style.animation = 'focusPull 1.5s ease-out';

    // Add viewfinder effect to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('viewfinder-effect');
    }
});

// ===== Export functions for external use =====
window.camera3D = {
    triggerCameraFlash,
    triggerCameraZoom,
    addFocusRing
};

console.log('%c📸 3D Camera Effects Loaded!', 'color: #C9A961; font-size: 16px; font-weight: bold;');
console.log('%cInteractive 3D animations are now active!', 'color: #D4B876; font-size: 12px;');
