import React from 'react'

/**
 * Container: centers content and constrains max width.
 * - Mobile-first horizontal padding using CSS variables.
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional max width CSS var; defaults to `var(--maxw-xl)` */
  maxWidthVar?: string
}

export default function Container({
  maxWidthVar = 'var(--maxw-xl)',
  style,
  children,
  ...props
}: ContainerProps) {
  const mergedStyle: React.CSSProperties = {
    maxWidth: maxWidthVar,
    marginInline: 'auto',
    paddingInline: '16px',
    // Use larger padding on small+ viewports
    // (kept inline to avoid Tailwind dependency)
    ...(style || {}),
  }

  return (
    <div style={mergedStyle} {...props}>
      {children}
    </div>
  )
}


