'use client'

import { useEffect } from 'react'

const isMobile = () => {
  // More aggressive mobile detection including tablets and slow devices
  if (typeof window === 'undefined') return false
  
  return (
    window.matchMedia('(max-width: 1024px)').matches || // Include tablets
    window.matchMedia('(hover: none)').matches || // Touch devices
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) || // Slow CPUs
    ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) // Low memory
  )
}

export default function EffectsGate() {
  useEffect(() => {
    // Skip effects entirely on mobile devices for better performance
    if (isMobile()) {
      return
    }

    // For desktop, load particles with idle callback for better performance
    const startEffects = () => {
      import('../lib/particles-init')
        .then(module => module.initParticles({ density: 0.3 }))
        .catch(error => console.warn('Effects failed to load:', error))
    }

    // Use requestIdleCallback if available, fallback to setTimeout
    let id: number
    if (typeof (window as any).requestIdleCallback === 'function') {
      id = (window as any).requestIdleCallback(startEffects, { timeout: 2000 })
    } else {
      id = window.setTimeout(startEffects, 0) as unknown as number
    }

    // Cleanup function
    return () => {
      if (typeof (window as any).cancelIdleCallback === 'function') {
        (window as any).cancelIdleCallback(id)
      } else {
        clearTimeout(id)
      }
    }
  }, [])

  return null
}
