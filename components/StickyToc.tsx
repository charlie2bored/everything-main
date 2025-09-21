'use client'

import { useState, useEffect } from 'react'
import { m } from 'framer-motion'

interface TocSection {
  id: string
  title: string
}

interface StickyTocProps {
  sections: TocSection[]
  className?: string
}

export default function StickyToc({ sections, className = '' }: StickyTocProps) {
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)

      // Find active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean)

      // Find the section that's currently in view
      let currentSection = ''
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) { // Account for header height
            currentSection = element.id
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      scrollToSection(sectionId)
    }
  }

  return (
    <nav 
      className={`sticky-toc ${className}`}
      aria-label="Table of contents"
    >
      {/* Progress bar */}
      <div className="sticky-toc__progress-container">
        <m.div 
          className="sticky-toc__progress-bar"
          style={{ scaleX: scrollProgress }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />
      </div>

      {/* Table of contents */}
      <div className="sticky-toc__container">
        <div className="sticky-toc__content">
          <h2 className="sticky-toc__title">Contents</h2>
          
          <ul className="sticky-toc__list" role="list">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id
              
              return (
                <li key={section.id} className="sticky-toc__item">
                  <button
                    type="button"
                    className={`sticky-toc__link ${isActive ? 'sticky-toc__link--active' : ''}`}
                    onClick={() => scrollToSection(section.id)}
                    onKeyDown={(e) => handleKeyDown(e, section.id)}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span className="sticky-toc__number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="sticky-toc__text">
                      {section.title}
                    </span>
                    
                    {isActive && (
                      <m.div
                        className="sticky-toc__indicator"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

