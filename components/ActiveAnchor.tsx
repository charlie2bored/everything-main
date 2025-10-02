'use client'

import { useEffect } from 'react'

/**
 * ActiveAnchor: highlights header anchor links based on current section.
 */
export default function ActiveAnchor() {
  useEffect(() => {
    const sections = ['home', 'work', 'about', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const links = Array.from(document.querySelectorAll('nav.header__nav a.nav-link')) as HTMLAnchorElement[]

    const setActive = (id: string) => {
      links.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('nav-link--active')
          link.setAttribute('aria-current', 'page')
        } else {
          link.classList.remove('nav-link--active')
          link.removeAttribute('aria-current')
        }
      })
    }

    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
      if (visible[0]) {
        setActive(visible[0].target.id)
      }
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] })

    sections.forEach(sec => io.observe(sec))
    return () => io.disconnect()
  }, [])

  return null
}


