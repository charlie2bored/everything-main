'use client'

import React, { useEffect, useRef, useState } from 'react'

export interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number
  scale?: number
}

/**
 * Magnetic: subtle translate/scale effect following the cursor.
 * Disables itself when prefers-reduced-motion is set.
 */
const Magnetic = React.forwardRef<HTMLDivElement, MagneticProps>(function Magnetic(
  { strength = 8, scale = 1.02, style, children, ...props },
  forwardedRef
) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const node = (forwardedRef as React.RefObject<HTMLDivElement>)?.current || innerRef.current
    if (!node) return

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const tx = x * strength
      const ty = y * strength
      node.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
    }
    const onLeave = () => {
      node.style.transform = 'translate3d(0, 0, 0) scale(1)'
    }
    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', onLeave)
    return () => {
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, strength, scale])

  return (
    <div
      ref={forwardedRef || innerRef}
      style={{
        transition: 'transform 160ms ease-out',
        willChange: 'transform',
        ...(style || {}),
      }}
      {...props}
    >
      {children}
    </div>
  )
})

export default Magnetic


