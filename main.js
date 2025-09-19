/**
 * Main JavaScript file for Charlie Portfolio
 * Implements 48/52 work rows (text/media), LQIP, filters, and hover pill
 */

class PortfolioApp {
    constructor() {
        this.workRows = [];
        this.currentRowIndex = 0;
        this.rafId = null;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeNavigation();
        this.initializeSmoothScrolling();
        this.initializeFormHandling();
        this.initializeWorkRows();
        this.initializeIntro();
        this.setupFilterChips();
        this.loadProjects();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('load', () => this.handleLoad());

        // Scroll for more button
        const scrollMoreBtn = document.querySelector('.scroll-more');
        if (scrollMoreBtn) {
            scrollMoreBtn.addEventListener('click', () => this.handleScrollMore());
            scrollMoreBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleScrollMore();
                }
            });
        }

        // Button clicks
        const viewWorkBtn = document.getElementById('viewWorkBtn');
        const collaborateBtn = document.getElementById('collaborateBtn');
        
        if (viewWorkBtn) {
            viewWorkBtn.addEventListener('click', () => this.scrollToSection('work'));
        }
        
        if (collaborateBtn) {
            collaborateBtn.addEventListener('click', () => this.scrollToSection('contact'));
        }
    }

    // ===== SCROLL FOR MORE =====
    handleScrollMore() {
        const targetSection = document.querySelector('.scroll-more')?.dataset.scrollto;
        if (targetSection) {
            this.scrollToSection(targetSection.replace('#', ''));
        }
    }

    // ===== NAVIGATION =====
    initializeNavigation() {
        this.nav = document.getElementById('nav');
        this.navBurger = document.getElementById('navBurger');
        this.navDrawer = document.getElementById('nav-drawer');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollY = window.scrollY;
        this.isNavSolid = false;
        
        // Mobile navigation
        if (this.navBurger && this.navDrawer) {
            this.navBurger.addEventListener('click', () => this.toggleMobileMenu());
            
            // Close drawer when clicking outside
            this.navDrawer.addEventListener('click', (e) => {
                if (e.target === this.navDrawer) {
                    this.closeMobileMenu();
                }
            });
            
            // Close drawer on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !this.navDrawer.hidden) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const isOpen = this.navBurger.getAttribute('aria-expanded') === 'true';
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navBurger.setAttribute('aria-expanded', 'true');
        this.navDrawer.removeAttribute('hidden');
        this.navDrawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('body-scroll-locked');
        
        // Focus trap
        this.trapFocus(this.navDrawer);
    }

    closeMobileMenu() {
        this.navBurger.setAttribute('aria-expanded', 'false');
        this.navDrawer.setAttribute('hidden', '');
        this.navDrawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('body-scroll-locked');
        
        // Return focus to burger button
        this.navBurger.focus();
    }

    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        // Navbar solid state
        if (currentScrollY > heroHeight * 0.5 && !this.isNavSolid) {
            this.nav.classList.add('nav--solid');
            this.isNavSolid = true;
        } else if (currentScrollY <= heroHeight * 0.5 && this.isNavSolid) {
            this.nav.classList.remove('nav--solid');
            this.isNavSolid = false;
        }
        
        // Update active navigation link
        this.updateActiveNavLink();
        
        this.lastScrollY = currentScrollY;
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    initializeSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.scrollToSection(targetSection);
                this.closeMobileMenu();
            });
        });
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 60; // Account for fixed nav
            
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            window.scrollTo({
                top: offsetTop,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    }

    // ===== FORM HANDLING =====
    initializeFormHandling() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Add input focus effects
            const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
            formInputs.forEach(input => {
                input.addEventListener('focus', () => this.handleInputFocus(input));
                input.addEventListener('blur', () => this.handleInputBlur(input));
            });
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // Check honeypot field
        const honeypot = form.querySelector('#website').value;
        if (honeypot) {
            // Bot detected, silently ignore
            return;
        }
        
        // Clear previous errors
        this.clearFormErrors(form);
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }
        
        // Show loading state
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Show success message
            this.showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    validateForm(form) {
        let isValid = true;
        
        // Validate name
        const name = form.querySelector('#name');
        const nameError = form.querySelector('#name-error');
        if (!name.value.trim()) {
            this.showFieldError(name, nameError, 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            this.showFieldError(name, nameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const email = form.querySelector('#email');
        const emailError = form.querySelector('#email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            this.showFieldError(email, emailError, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            this.showFieldError(email, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        const message = form.querySelector('#message');
        const messageError = form.querySelector('#message-error');
        if (!message.value.trim()) {
            this.showFieldError(message, messageError, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            this.showFieldError(message, messageError, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    showFieldError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
    
    clearFormErrors(form) {
        const errorElements = form.querySelectorAll('.form-error');
        const errorFields = form.querySelectorAll('.form-input.error, .form-textarea.error');
        
        errorElements.forEach(el => el.textContent = '');
        errorFields.forEach(field => field.classList.remove('error'));
    }

    handleInputFocus(input) {
        input.parentElement.classList.add('focused');
    }

    handleInputBlur(input) {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: type === 'success' ? '#00d4aa' : '#ff6b35',
            color: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ===== WORK ROWS INITIALIZATION =====
    initializeWorkRows() {
        this.projectList = document.getElementById('projectList');
        this.workRows = Array.from(document.querySelectorAll('.work-row'));
        if (!this.workRows.length) return;

        // Make rows focusable and wire keyboard activation
        this.workRows.forEach((row) => {
            row.setAttribute('tabindex', '0');
            const link = row.querySelector('.work-link');
            if (!link) return;
            row.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });

            // Cursor-following pill on media hover
            const mediaWrap = row.querySelector('.media-wrap');
            const pill = row.querySelector('.hover-pill');
            if (mediaWrap && pill) {
                let pending = false;
                const move = (x, y) => {
                    pill.style.left = `${x}px`;
                    pill.style.top = `${y}px`;
                };
                const onMove = (e) => {
                    if (this.prefersReducedMotion) return; // center-only fallback via CSS on focus
                    const rect = mediaWrap.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    if (!pending) {
                        pending = true;
                        this.rafId = requestAnimationFrame(() => {
                            move(x, y);
                            pending = false;
                        });
                    }
                };
                mediaWrap.addEventListener('mousemove', onMove);
                mediaWrap.addEventListener('mouseleave', () => {
                    pill.style.left = '-9999px';
                    pill.style.top = '-9999px';
                });
            }
        });

        // Keyboard navigation between rows
        document.addEventListener('keydown', (e) => {
            const active = document.activeElement;
            const inWork = active && active.classList && active.classList.contains('work-row');
            if (!inWork) return;
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.focusRowByOffset(1);
            }
            if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.focusRowByOffset(-1);
            }
        });
    }

    focusRowByOffset(delta) {
        const currentIndex = this.workRows.indexOf(document.activeElement);
        const nextIndex = Math.max(0, Math.min(this.workRows.length - 1, currentIndex + delta));
        const nextRow = this.workRows[nextIndex];
        if (nextRow) {
            const behavior = this.prefersReducedMotion ? 'auto' : 'smooth';
            nextRow.scrollIntoView({ behavior, block: 'center' });
            nextRow.focus();
        }
    }

    setupFilterChips() {
        const chips = document.querySelectorAll('.filter-chip');
        if (!chips.length) return;
        chips.forEach((chip) => {
            chip.addEventListener('click', () => {
                chips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
                chip.classList.add('active');
                chip.setAttribute('aria-selected', 'true');
                const filter = chip.dataset.filter;
                this.filterRows(filter);
            });
        });
    }

    filterRows(filter) {
        this.workRows.forEach((row) => {
            const tags = (row.dataset.tags || '').toLowerCase();
            const show = filter === 'all' || tags.includes(filter.toLowerCase());
            row.style.display = show ? '' : 'none';
        });
    }

    // ===== PROJECT LOADING =====
    async loadProjects() {
        try {
            const response = await fetch('projects.json');
            const projects = await response.json();
            this.enhanceProjects(projects);
        } catch (error) {
            console.error('Error loading projects:', error);
            // Fallback to static content if JSON fails to load
        }
    }

    enhanceProjects(projects) {
        // Enhance existing static rows with LQIP and interactions
        const existingRows = document.querySelectorAll('.work-row');
        existingRows.forEach((row, index) => {
            const project = projects[index];
            if (!project) return;

            // Add LQIP blur-up effect
            const image = row.querySelector('.project-thumb');
            const skeleton = row.querySelector('.skeleton');
            
            if (image && skeleton) {
                // Add LQIP if available
                if (project.thumbLqip) {
                    image.style.filter = 'blur(20px)';
                    image.style.opacity = '0';
                    
                    // Create LQIP image
                    const lqipImg = new Image();
                    lqipImg.src = project.thumbLqip;
                    lqipImg.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        filter: blur(20px);
                        z-index: 1;
                    `;
                    
                    const mediaWrap = row.querySelector('.media-wrap');
                    mediaWrap.insertBefore(lqipImg, image);
                    
                    // Load full image
                    image.addEventListener('load', () => {
                        lqipImg.style.opacity = '0';
                        image.style.filter = 'blur(0)';
                        image.style.opacity = '1';
                        setTimeout(() => {
                            lqipImg.remove();
                            skeleton.style.opacity = '0';
                            setTimeout(() => skeleton.remove(), 300);
                        }, 300);
                    });
                } else {
                    // Standard blur-up without LQIP
                    image.addEventListener('load', () => {
                        image.style.filter = 'blur(0)';
                        image.style.opacity = '1';
                        setTimeout(() => {
                            skeleton.style.opacity = '0';
                            setTimeout(() => skeleton.remove(), 300);
                        }, 500);
                    });
                }
            }

            // Add keyboard support
            const projectLink = row.querySelector('.work-link');
            projectLink.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = projectLink.href;
                }
            });

            // Add focus styles
            projectLink.addEventListener('focus', () => {
                projectLink.style.outline = '2px solid var(--accent)';
                projectLink.style.outlineOffset = '4px';
            });
            projectLink.addEventListener('blur', () => {
                projectLink.style.outline = 'none';
            });
        });
    }

    // No parallax or scroll-triggered animations per requirements

    // ===== UTILITY METHODS =====
    handleResize() {
        // Recalculate dimensions on resize
        this.updateParallax();
        this.updateActivePanel();
    }

    handleLoad() {
        document.body.classList.add('loaded');
    }

    // ===== INTRO OVERLAY =====
    initializeIntro() {
        const intro = document.getElementById('intro');
        if (!intro) return;
        if (this.prefersReducedMotion || sessionStorage.getItem('introPlayed') === '1') {
            intro.remove();
            return;
        }
        // Play once
        requestAnimationFrame(() => {
            intro.classList.add('intro--play');
            setTimeout(() => {
                intro.classList.add('intro--out');
                setTimeout(() => intro.remove(), 500);
                sessionStorage.setItem('introPlayed', '1');
            }, 1500);
        });
    }

    // ===== PUBLIC API =====
    destroy() {
        // Clean up event listeners and observers
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('load', this.handleLoad);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the portfolio app
    window.portfolioApp = new PortfolioApp();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== EXPORT FOR MODULE SYSTEMS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}