'use client'

import { useState } from 'react'
import { m } from 'framer-motion'

interface FilterChipsProps {
  tags: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
  className?: string
}

export default function FilterChips({ 
  tags, 
  activeFilter, 
  onFilterChange, 
  className = '' 
}: FilterChipsProps) {
  const allFilters = ['All', ...tags]

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter)
    
    // Announce filter change to screen readers
    const announcement = `Filtering projects by ${filter === 'All' ? 'all categories' : filter}`
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = announcement
    document.body.appendChild(liveRegion)
    
    setTimeout(() => {
      document.body.removeChild(liveRegion)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent, filter: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFilterClick(filter)
    }
  }

  return (
    <div className={`filter-chips ${className}`} role="group" aria-label="Filter projects">
      <div className="filter-chips__container">
        {allFilters.map((filter, index) => {
          const isActive = activeFilter === filter
          
          return (
            <m.button
              key={filter}
              type="button"
              className={`filter-chip ${isActive ? 'filter-chip--active' : ''}`}
              onClick={() => handleFilterClick(filter)}
              onKeyDown={(e) => handleKeyDown(e, filter)}
              aria-pressed={isActive}
              aria-label={`Filter by ${filter === 'All' ? 'all categories' : filter}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.02,
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.15 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <span className="filter-chip__text">
                {filter}
              </span>
              
              {isActive && (
                <m.div
                  className="filter-chip__indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  aria-hidden="true"
                />
              )}
            </m.button>
          )
        })}
      </div>
      
      {/* Screen reader only filter status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeFilter === 'All' 
          ? 'Showing all projects' 
          : `Showing projects filtered by ${activeFilter}`
        }
      </div>
    </div>
  )
}
