interface ParticlesConfig {
  density: number
}

export function initParticles(config: ParticlesConfig = { density: 0.55 }) {
  // Create canvas element for particles
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return

  // Style the canvas
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '-1',
    opacity: '0.3'
  })
  
  document.body.appendChild(canvas)

  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    alpha: number
  }> = []

  let animationId: number

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
  }

  const createParticle = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.5 + 0.2
  })

  const animate = () => {
    if (!ctx) return
    
    // Clear with slight fade effect for trails
    ctx.globalAlpha = 0.1
    ctx.fillStyle = '#0A0A0A'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.globalAlpha = 1
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off edges
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(window.innerWidth, particle.x))
      particle.y = Math.max(0, Math.min(window.innerHeight, particle.y))

      // Draw particle
      ctx.globalAlpha = particle.alpha
      ctx.fillStyle = '#D4AF37' // Gold color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    })

    animationId = requestAnimationFrame(animate)
  }

  // Initialize
  resizeCanvas()
  
  // Create particles based on screen size and density
  const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 20000 * config.density)
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle())
  }

  // Event listeners
  const handleResize = () => {
    resizeCanvas()
    // Adjust particle count on resize
    const newCount = Math.floor((window.innerWidth * window.innerHeight) / 20000 * config.density)
    if (particles.length < newCount) {
      for (let i = particles.length; i < newCount; i++) {
        particles.push(createParticle())
      }
    } else if (particles.length > newCount) {
      particles.splice(newCount)
    }
  }

  window.addEventListener('resize', handleResize, { passive: true })
  
  // Start animation
  animate()

  // Return cleanup function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('resize', handleResize)
    if (canvas.parentNode) {
      document.body.removeChild(canvas)
    }
  }
}

