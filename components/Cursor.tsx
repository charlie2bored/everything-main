'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorState {
  x: number
  y: number
  targetX: number
  targetY: number
  isActive: boolean
  isHovering: boolean
  pillText: string
  isPillVisible: boolean
  pillX: number
  pillY: number
}

const SPRING = { stiffness: 0.24, damping: 0.18 }

// Check if device supports custom cursor
const supportsCustomCursor = () => {
  if (typeof window === 'undefined') return false
  
  // Only enable on pointer devices with hover capability
  const hasHover = window.matchMedia('(hover: hover)').matches
  const hasPointer = window.matchMedia('(pointer: fine)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  return hasHover && hasPointer && !prefersReducedMotion
}

export default function Cursor() {
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isActive: false,
    isHovering: false,
    pillText: '',
    isPillVisible: false,
    pillX: 0,
    pillY: 0
  })

  const rafRef = useRef<number>(0)
  const velocityRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!supportsCustomCursor()) {
      return
    }

    // Add cursor-active class to body
    document.body.classList.add('cursor-active')

    const updateCursor = () => {
      setState(prevState => {
        const dx = prevState.targetX - prevState.x
        const dy = prevState.targetY - prevState.y

        // Spring physics for smoother following
        velocityRef.current.x += dx * SPRING.stiffness
        velocityRef.current.y += dy * SPRING.stiffness
        velocityRef.current.x *= (1 - SPRING.damping)
        velocityRef.current.y *= (1 - SPRING.damping)

        const newX = prevState.x + velocityRef.current.x
        const newY = prevState.y + velocityRef.current.y

        return {
          ...prevState,
          x: newX,
          y: newY
        }
      })

      rafRef.current = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setState(prevState => ({
        ...prevState,
        targetX: e.clientX,
        targetY: e.clientY,
        isActive: true
      }))
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const pillText = target.getAttribute('data-cursor-text')
      
      if (pillText) {
        setState(prevState => ({
          ...prevState,
          isHovering: true,
          pillText,
          isPillVisible: true
        }))
      } else {
        setState(prevState => ({
          ...prevState,
          isHovering: true
        }))
      }
    }

    const handleMouseLeave = () => {
      setState(prevState => ({
        ...prevState,
        isHovering: false,
        isPillVisible: false,
        pillText: ''
      }))
    }

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      const pillText = target.getAttribute('data-cursor-text')
      
      if (pillText) {
        // Pin pill to bottom-right of focused element for keyboard users
        const rect = target.getBoundingClientRect()
        setState(prevState => ({
          ...prevState,
          isPillVisible: true,
          pillText,
          pillX: rect.right - 80,
          pillY: rect.bottom - 40
        }))
      }
    }

    const handleBlur = () => {
      setState(prevState => ({
        ...prevState,
        isPillVisible: false,
        pillText: ''
      }))
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    document.addEventListener('focus', handleFocus, true)
    document.addEventListener('blur', handleBlur, true)

    // Start animation loop
    rafRef.current = requestAnimationFrame(updateCursor)

    return () => {
      document.body.classList.remove('cursor-active')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('focus', handleFocus, true)
      document.removeEventListener('blur', handleBlur, true)
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  if (!supportsCustomCursor() || !state.isActive) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="cursor-dot"
        style={{
          transform: `translate3d(${state.targetX}px, ${state.targetY}px, 0)`,
        }}
      />
      
      {/* Trailing circle */}
      <div
        className={`cursor-circle ${state.isHovering ? 'cursor-circle--hover' : ''}`}
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0)`,
        }}
      />

      {/* Cursor pill */}
      {state.isPillVisible && (
        <div
          className="cursor-pill"
          style={{
            transform: `translate3d(${state.pillX || state.x + 12}px, ${state.pillY || state.y + 12}px, 0)`,
          }}
        >
          {state.pillText}
        </div>
      )}
    </>
  )
}