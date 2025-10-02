'use client'

import { useEffect, useState } from 'react'

/**
 * ScrollProgress: thin progress bar pinned to top to show page read progress.
 * Mobile-first; respects prefers-reduced-motion.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setProgress(pct)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: '100%',
        background: 'transparent',
        zIndex: 999,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'var(--accent)',
          transition: 'width var(--transition-fast)',
        }}
      />
    </div>
  )
}


