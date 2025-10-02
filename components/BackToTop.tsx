'use client'

import { useEffect, useState } from 'react'

/**
 * BackToTop: floating button appears after scrolling; mobile-first full-tap target.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
      className="ring-focus"
      style={{
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        height: '44px',
        minWidth: '44px',
        paddingInline: '12px',
        borderRadius: '999px',
        background: 'var(--accent)',
        color: 'var(--bg)',
        border: '1px solid transparent',
        boxShadow: 'var(--elev-1)',
        zIndex: 998,
      }}
    >
      ↑ Top
    </button>
  )
}


