/**
 * Particle System for Hero Background
 * Creates an animated particle effect using HTML5 Canvas
 */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
    }

    init() {
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        
        // Pause when tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor((this.canvas.width * this.canvas.height) / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                this.canvas.width,
                this.canvas.height
            ));
        }
    }

    setupEventListeners() {
        // Mouse movement for interactive particles
        document.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Mouse leave to reset interaction
        document.addEventListener('mouseleave', () => {
            this.mouse.x = 0;
            this.mouse.y = 0;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }

    drawConnections() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    // Porto-style gradient connections
                    const gradient = this.ctx.createLinearGradient(
                        this.particles[i].x, this.particles[i].y,
                        this.particles[j].x, this.particles[j].y
                    );
                    gradient.addColorStop(0, `rgba(255, 211, 0, ${opacity * 0.3})`);
                    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.1})`);
                    gradient.addColorStop(1, `rgba(255, 211, 0, ${opacity * 0.3})`);
                    
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = opacity * 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

class Particle {
    constructor(x, y, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Enhanced properties like Porto
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.hue = Math.random() * 60 + 15; // Orange to yellow range
        this.pulsePhase = Math.random() * Math.PI * 2;
        
        // Animation properties
        this.baseX = x;
        this.baseY = y;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 50 + 20;
        this.speed = Math.random() * 0.02 + 0.01;
    }

    update(mouse) {
        // Orbital motion
        this.angle += this.speed;
        this.x = this.baseX + Math.cos(this.angle) * this.radius;
        this.y = this.baseY + Math.sin(this.angle) * this.radius;
        
        // Mouse interaction
        if (mouse.x > 0 && mouse.y > 0) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= dx * force * 0.01;
                this.y -= dy * force * 0.01;
            }
        }
        
        // Boundary check
        if (this.x < 0 || this.x > this.canvasWidth) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > this.canvasHeight) {
            this.vy *= -1;
        }
        
        // Keep particles in bounds
        this.x = Math.max(0, Math.min(this.canvasWidth, this.x));
        this.y = Math.max(0, Math.min(this.canvasHeight, this.y));
    }

    draw(ctx) {
        ctx.save();
        
        // Porto-style pulsing effect
        this.pulsePhase += 0.02;
        const pulseSize = this.size + Math.sin(this.pulsePhase) * 0.5;
        const pulseOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.1;
        
        // Create enhanced gradient for particle
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, pulseSize * 3
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 70%, ${pulseOpacity})`);
        gradient.addColorStop(0.4, `hsla(${this.hue}, 70%, 60%, ${pulseOpacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 60%, 50%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow effect
        ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, ${pulseOpacity * 0.3})`;
        ctx.shadowBlur = pulseSize * 2;
        ctx.fill();
        
        ctx.restore();
    }
}

// ===== GRADIENT MESH ANIMATION =====
class GradientMesh {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.time = 0;
        
        this.init();
    }

    init() {
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        this.setupCanvas();
        this.animate();
        
        // Pause when tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    setupCanvas() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.3';
        
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    animate() {
        this.time += 0.01;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create animated gradient
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width * (0.3 + Math.sin(this.time) * 0.1),
            this.canvas.height * (0.2 + Math.cos(this.time * 0.7) * 0.1),
            0,
            this.canvas.width * (0.7 + Math.cos(this.time * 0.5) * 0.1),
            this.canvas.height * (0.8 + Math.sin(this.time * 0.3) * 0.1),
            Math.max(this.canvas.width, this.canvas.height) * 0.8
        );
        
        gradient.addColorStop(0, `hsla(${15 + Math.sin(this.time) * 10}, 70%, 50%, 0.1)`);
        gradient.addColorStop(0.5, `hsla(${180 + Math.cos(this.time * 0.7) * 20}, 60%, 40%, 0.05)`);
        gradient.addColorStop(1, `hsla(${45 + Math.sin(this.time * 0.3) * 15}, 50%, 30%, 0.02)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    window.particleSystem = new ParticleSystem('particleCanvas');
    
    // Initialize gradient mesh
    window.gradientMesh = new GradientMesh('hero');
});

// ===== EXPORT FOR MODULE SYSTEMS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ParticleSystem, Particle, GradientMesh };
}
