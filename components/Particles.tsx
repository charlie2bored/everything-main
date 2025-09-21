'use client'

import { useEffect } from 'react'

export default function Particles() {
  useEffect(() => {
    const initParticles = async () => {
      try {
        // Dynamically import particles initialization
        const { initParticles: init } = await import('./particles-init')
        init({ density: 0.65 }) // tuned lower for performance
      } catch (error) {
        console.warn('Particles failed to load:', error)
      }
    }

    // Use requestIdleCallback if available, fallback to requestAnimationFrame
    const startParticles = () => {
      if (typeof window !== 'undefined') {
        const scheduleInit = (window as any).requestIdleCallback || requestAnimationFrame
        const cancelInit = (window as any).cancelIdleCallback || cancelAnimationFrame
        
        const id = scheduleInit(initParticles)
        
        return () => cancelInit(id)
      }
    }

    return startParticles()
  }, [])

  return null
}
