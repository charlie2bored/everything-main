'use client'

import { m } from 'framer-motion'

interface TagChipsProps {
  tags: string[]
  variant?: 'default' | 'light'
  className?: string
}

export default function TagChips({ tags, variant = 'default', className = '' }: TagChipsProps) {
  return (
    <ul 
      className={`chips ${className}`} 
      aria-label="Project categories"
    >
      {tags.map((tag, index) => (
        <m.li 
          key={tag}
          className="chip"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.03,
            duration: 0.36,
            ease: "easeOut"
          }}
        >
          {tag}
        </m.li>
      ))}
    </ul>
  )
}
