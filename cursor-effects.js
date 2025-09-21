/**
 * Advanced Cursor Effects System
 * Creates interactive cursor trail and magnetic hover effects
 */

class CursorEffects {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 8;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMoving = false;
        this.moveTimeout = null;
        
        this.init();
    }

    init() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        this.createCustomCursor();
        this.bindEvents();
        this.startAnimationLoop();
    }

    createCustomCursor() {
        // Create main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            mix-blend-mode: difference;
        `;
        document.body.appendChild(this.cursor);

        // Create cursor dot
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        this.cursorDot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease-out;
        `;
        document.body.appendChild(this.cursorDot);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .work-link, .service-card, input, textarea, [role="button"]'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.onElementHover(element));
            element.addEventListener('mouseleave', () => this.onElementLeave(element));
        });
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.isMoving = true;

        // Update cursor position
        if (this.cursor) {
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
        }

        if (this.cursorDot) {
            this.cursorDot.style.left = this.mouseX + 'px';
            this.cursorDot.style.top = this.mouseY + 'px';
        }

        // Create trail particles
        this.createTrailParticle(this.mouseX, this.mouseY);

        // Reset move timeout
        clearTimeout(this.moveTimeout);
        this.moveTimeout = setTimeout(() => {
            this.isMoving = false;
        }, 100);
    }

    createTrailParticle(x, y) {
        if (this.trail.length >= this.maxTrailLength) {
            const oldParticle = this.trail.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.parentNode.removeChild(oldParticle);
            }
        }

        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        this.trail.push(particle);

        // Auto-remove particle
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
                const index = this.trail.indexOf(particle);
                if (index > -1) {
                    this.trail.splice(index, 1);
                }
            }
        }, 600);
    }

    onElementHover(element) {
        if (this.cursor) {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            this.cursor.style.borderColor = 'var(--accent)';
            this.cursor.style.background = 'rgba(255, 211, 0, 0.1)';
        }

        // Add magnetic effect
        this.addMagneticEffect(element);
    }

    onElementLeave(element) {
        if (this.cursor) {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            this.cursor.style.background = 'transparent';
        }

        // Remove magnetic effect
        this.removeMagneticEffect(element);
    }

    addMagneticEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const moveHandler = (e) => {
            const deltaX = (e.clientX - centerX) * 0.1;
            const deltaY = (e.clientY - centerY) * 0.1;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        };

        element._magneticHandler = moveHandler;
        document.addEventListener('mousemove', moveHandler);
    }

    removeMagneticEffect(element) {
        if (element._magneticHandler) {
            document.removeEventListener('mousemove', element._magneticHandler);
            element.style.transform = '';
            delete element._magneticHandler;
        }
    }

    showCursor() {
        if (this.cursor) {
            this.cursor.style.opacity = '1';
        }
        if (this.cursorDot) {
            this.cursorDot.style.opacity = '1';
        }
    }

    hideCursor() {
        if (this.cursor) {
            this.cursor.style.opacity = '0';
        }
        if (this.cursorDot) {
            this.cursorDot.style.opacity = '0';
        }
    }

    startAnimationLoop() {
        const animate = () => {
            // Animate trail particles
            this.trail.forEach((particle, index) => {
                const opacity = (this.maxTrailLength - index) / this.maxTrailLength;
                const scale = opacity;
                particle.style.opacity = opacity;
                particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    destroy() {
        // Clean up cursor elements
        if (this.cursor && this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
        if (this.cursorDot && this.cursorDot.parentNode) {
            this.cursorDot.parentNode.removeChild(this.cursorDot);
        }

        // Clean up trail particles
        this.trail.forEach(particle => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });

        // Remove event listeners
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseenter', this.showCursor);
        document.removeEventListener('mouseleave', this.hideCursor);
    }
}

// Enhanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        this.bindScrollEvents();
        this.observeElements();
    }

    bindScrollEvents() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Parallax for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const offset = scrollTop * 0.5;
            heroContent.style.transform = `translateY(${offset}px)`;
        }

        // Parallax for floating orbs
        const floatingElements = document.querySelectorAll('.services::after, .about::after');
        floatingElements.forEach((element, index) => {
            const offset = scrollTop * (0.2 + index * 0.1);
            element.style.transform = `translateY(${offset}px)`;
        });
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe sections for reveal animations
        const sections = document.querySelectorAll('.services, .about, .contact');
        sections.forEach(section => {
            section.classList.add('section-enter');
            observer.observe(section);
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop devices
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        window.cursorEffects = new CursorEffects();
    }
    
    window.scrollAnimations = new ScrollAnimations();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CursorEffects, ScrollAnimations };
}


