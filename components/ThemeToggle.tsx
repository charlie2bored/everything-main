'use client'

import { useEffect, useState } from 'react'

/**
 * ThemeToggle: dark/light toggle persisted via localStorage; mobile-first.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initial = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    apply(initial)
  }, [])

  const apply = (next: 'dark' | 'light') => {
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.style.colorScheme = next
    if (next === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  const toggle = () => apply(theme === 'dark' ? 'light' : 'dark')

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="ring-focus"
      style={{
        height: '36px',
        minWidth: '36px',
        paddingInline: '12px',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--text)'
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}


