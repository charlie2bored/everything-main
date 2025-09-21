interface ParticlesConfig {
  density: number
}

export function initParticles(config: ParticlesConfig = { density: 0.65 }) {
  // Lightweight particle system implementation
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return

  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '-1'
  canvas.style.opacity = '0.4'
  
  document.body.appendChild(canvas)

  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
  }> = []

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  const createParticle = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1
  })

  const animate = () => {
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(255, 211, 0, 0.1)'

    particles.forEach(particle => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(animate)
  }

  // Initialize particles
  resizeCanvas()
  const particleCount = Math.floor((canvas.width * canvas.height) / 15000 * config.density)
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle())
  }

  window.addEventListener('resize', resizeCanvas)
  animate()

  // Cleanup function
  return () => {
    document.body.removeChild(canvas)
    window.removeEventListener('resize', resizeCanvas)
  }
}
