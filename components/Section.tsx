import React from 'react'

/**
 * Section: vertical spacing wrapper for page sections.
 * - Uses CSS variables for consistent rhythm.
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Gap scale var for top/bottom padding; defaults to `var(--space-7)`/`var(--space-8)` via inline style */
  paddingVar?: string
}

export default function Section({ paddingVar, style, children, ...props }: SectionProps) {
  const py = paddingVar ?? 'var(--space-7)'
  const mergedStyle: React.CSSProperties = {
    paddingBlock: py,
    ...(style || {}),
  }

  return (
    <section style={mergedStyle} {...props}>
      {children}
    </section>
  )
}


