/**
 * Advanced Animation Utilities
 * Handles complex animations, transitions, and micro-interactions
 */

class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupTextAnimations();
        this.setupMagneticElements();
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down'
        );
        
        animatedElements.forEach(el => {
            this.scrollObserver.observe(el);
        });
    }

    triggerAnimation(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fade-in':
                this.fadeInAnimation(element);
                break;
            case 'slide-in-left':
                this.slideInLeftAnimation(element);
                break;
            case 'slide-in-right':
                this.slideInRightAnimation(element);
                break;
            case 'slide-in-up':
                this.slideInUpAnimation(element);
                break;
            case 'slide-in-down':
                this.slideInDownAnimation(element);
                break;
        }
    }

    getAnimationType(element) {
        const classes = element.className.split(' ');
        return classes.find(cls => cls.startsWith('slide-in-') || cls === 'fade-in') || 'fade-in';
    }

    // ===== ANIMATION METHODS =====
    fadeInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideInLeftAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    slideInRightAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    slideInUpAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideInDownAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // ===== HOVER ANIMATIONS =====
    setupHoverAnimations() {
        // Scale on hover
        const scaleElements = document.querySelectorAll('.scale-on-hover');
        scaleElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.scaleElement(el, 1.05));
            el.addEventListener('mouseleave', () => this.scaleElement(el, 1));
        });

        // Rotate on hover
        const rotateElements = document.querySelectorAll('.rotate-on-hover');
        rotateElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.rotateElement(el, 5));
            el.addEventListener('mouseleave', () => this.rotateElement(el, 0));
        });

        // Work card hover effects
        const workCards = document.querySelectorAll('.work-card');
        workCards.forEach(card => {
            this.setupWorkCardHover(card);
        });
    }

    scaleElement(element, scale) {
        element.style.transition = 'transform 0.3s ease-out';
        element.style.transform = `scale(${scale})`;
    }

    rotateElement(element, degrees) {
        element.style.transition = 'transform 0.3s ease-out';
        element.style.transform = `rotate(${degrees}deg)`;
    }

    setupWorkCardHover(card) {
        const image = card.querySelector('.work-card-image');
        const content = card.querySelector('.work-card-content');
        const tags = card.querySelectorAll('.tag');

        card.addEventListener('mouseenter', () => {
            // Card lift effect
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 16px 64px rgba(255, 107, 53, 0.2)';
            
            // Image zoom effect
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            
            // Tags animation
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.backgroundColor = '#ff6b35';
                    tag.style.color = '#0f0f0f';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset card
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.25)';
            
            // Reset image
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            // Reset tags
            tags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.backgroundColor = '#2d2d2d';
                tag.style.color = '#b3b3b3';
            });
        });
    }

    // ===== TEXT ANIMATIONS =====
    setupTextAnimations() {
        // Typing animation
        const typingElements = document.querySelectorAll('.typing-animation');
        typingElements.forEach(el => {
            this.createTypingAnimation(el);
        });

        // Text reveal animation
        const textRevealElements = document.querySelectorAll('.animate-text-reveal');
        textRevealElements.forEach(el => {
            this.createTextRevealAnimation(el);
        });

        // Glitch effect
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            this.createGlitchEffect(el);
        });
    }

    createTypingAnimation(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #ff6b35';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' ? '2px solid #ff6b35' : 'none';
                }, 500);
            }
        };
        
        typeWriter();
    }

    createTextRevealAnimation(element) {
        const words = element.textContent.split(' ');
        element.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.className = 'word';
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100%)';
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    createGlitchEffect(element) {
        const text = element.textContent;
        element.setAttribute('data-text', text);
        
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance to glitch
                element.style.animation = 'glitch 0.3s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            }
        }, 2000);
    }

    // ===== MAGNETIC ELEMENTS =====
    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                this.handleMagneticHover(el, e);
            });
            
            el.addEventListener('mouseleave', () => {
                this.resetMagneticElement(el);
            });
        });
    }

    handleMagneticHover(element, event) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (event.clientX - centerX) * 0.1;
        const deltaY = (event.clientY - centerY) * 0.1;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }

    resetMagneticElement(element) {
        element.style.transform = 'translate(0, 0)';
    }

    // ===== PARTICLE TRAIL =====
    createParticleTrail(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle-trail';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    }

    // ===== LOADING ANIMATIONS =====
    showLoadingSpinner(container) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        container.appendChild(spinner);
        return spinner;
    }

    hideLoadingSpinner(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }

    // ===== UTILITY METHODS =====
    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    easeInOutCirc(t) {
        return t < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    }

    // ===== DESTROY METHOD =====
    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        
        this.animations.clear();
        this.observers.clear();
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// ===== EXPORT FOR MODULE SYSTEMS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
