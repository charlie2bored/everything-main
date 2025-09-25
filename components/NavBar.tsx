'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface NavItem {
  name: string
  href: string
}

/**
 * NavBar: responsive, accessible navigation with focus management.
 */
export default function NavBar() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const items: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    if (!open) return

    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className="header"
      style={{ height: 'var(--header-h)' }}
      role="banner"
    >
      <div className="header__container" style={{ height: '100%' }}>
        <div className="header__logo">
          <Link href="/" className="logo-link" aria-label="Charlie - Home">
            <span className="logo-text">Charlie</span>
          </Link>
        </div>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="nav-list">
            {items.map((item) => (
              <li key={item.name} className="nav-item">
                <Link href={item.href} className="nav-link">
                  <span className="nav-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__socials" aria-hidden="true" />

        <button
          ref={buttonRef}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ring-focus"
          style={{
            height: '44px',
            paddingInline: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text)',
            display: 'none',
          }}
        >
          Menu
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'color-mix(in oklab, var(--bg) 92%, transparent)',
            backdropFilter: 'blur(6px)',
            display: 'grid',
            alignContent: 'start',
            padding: '24px',
            gap: '12px',
          }}
        >
          {items.map((item) => (
            <Link key={item.name} href={item.href} className="nav-link" onClick={() => setOpen(false)}>
              {item.name}
            </Link>
          ))}
          <button onClick={() => setOpen(false)} className="btn btn--ghost" style={{ width: 'fit-content' }}>
            Close
          </button>
        </div>
      )}
    </header>
  )
}


