'use client'

import { m } from 'framer-motion'

interface TagChipsProps {
  tags: string[]
  className?: string
}

export default function TagChips({ tags, className = '' }: TagChipsProps) {
  return (
    <ul 
      className={`tags ${className}`} 
      aria-label="Project tags"
    >
      {tags.map((tag, index) => (
        <m.li 
          key={tag}
          className="tag"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: index * 0.05,
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          {tag}
        </m.li>
      ))}
    </ul>
  )
}
