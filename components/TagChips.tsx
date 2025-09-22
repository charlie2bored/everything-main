'use client'

import { m } from 'framer-motion'

interface TagChipsProps {
  tags: string[]
  variant?: 'default' | 'light'
  className?: string
}

export default function TagChips({ tags, variant = 'default', className = '' }: TagChipsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={`chips ${className}`}>
      {tags.map((tag, index) => (
        <m.span 
          key={tag}
          className={`chip chip--${variant}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.03,
            duration: 0.36,
            ease: "easeOut"
          }}
        >
          {tag}
        </m.span>
      ))}
    </div>
  )
}
