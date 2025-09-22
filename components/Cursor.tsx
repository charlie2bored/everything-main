'use client'

import { useEffect, useRef, useState } from 'react'

const SPRING = { stiffness: 0.24, damping: 0.18 }

interface CursorPosition {
  x: number
  y: number
}

export default function Cursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const trailRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const velocityRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  // Check if device supports hover and prefers motion
  const shouldShowCursor = () => {
    if (typeof window === 'undefined') return false
    
    const hasHover = window.matchMedia('(hover: hover)').matches
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    const prefersMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    return hasHover && hasPointer && prefersMotion && !isTouchDevice
  }

  useEffect(() => {
    if (!shouldShowCursor()) return

    let mousePosition = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX
      mousePosition.y = e.clientY
      setPosition(mousePosition)
      setIsVisible(true)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
      document.body.classList.add('cursor-active')
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      document.body.classList.remove('cursor-active')
      setIsActive(false)
    }

    // Smooth trailing animation
    const animate = () => {
      const trail = trailRef.current
      const velocity = velocityRef.current
      
      // Spring physics for smooth following
      const dx = mousePosition.x - trail.x
      const dy = mousePosition.y - trail.y
      
      velocity.x += dx * SPRING.stiffness
      velocity.y += dy * SPRING.stiffness
      velocity.x *= (1 - SPRING.damping)
      velocity.y *= (1 - SPRING.damping)
      
      trail.x += velocity.x
      trail.y += velocity.y
      
      // Update trail position if visible
      if (isVisible) {
        const trailElement = document.querySelector('.cursor__trail') as HTMLElement
        if (trailElement) {
          trailElement.style.transform = `translate3d(${trail.x - 20}px, ${trail.y - 20}px, 0)`
        }
      }
      
      rafRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate)

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.body.classList.remove('cursor-active')
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isVisible])

  if (!shouldShowCursor()) return null

  return (
    <div className="cursor-container">
      {/* Main cursor dot */}
      <div
        className="cursor__dot"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Trailing circle */}
      <div
        className="cursor__trail"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  )
}
