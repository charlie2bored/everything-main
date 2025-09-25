import React from 'react'

/**
 * Stack: grid-based vertical layout with configurable gap.
 * - Defaults to `var(--space-5)` gap.
 */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: string
}

export default function Stack({ gap = 'var(--space-5)', style, children, ...props }: StackProps) {
  const mergedStyle: React.CSSProperties = {
    display: 'grid',
    gap,
    ...(style || {}),
  }

  return (
    <div style={mergedStyle} {...props}>
      {children}
    </div>
  )
}


