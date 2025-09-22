import Link from 'next/link'
import { m } from 'framer-motion'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  size?: 'default' | 'large'
  children: React.ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
  'aria-label'?: string
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'default',
  children,
  className = '',
  disabled = false,
  type = 'button',
  external = false,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const baseClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    className,
    disabled && 'btn--disabled'
  ].filter(Boolean).join(' ')

  const buttonContent = (
    <>
      <span className="btn__text">{children}</span>
      {external && <span className="btn__icon" aria-hidden="true">↗</span>}
    </>
  )

  if (href) {
    if (external) {
      return (
        <m.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          aria-label={ariaLabel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          {buttonContent}
        </m.a>
      )
    }

    return (
      <m.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={href}
          className={baseClasses}
          aria-label={ariaLabel}
          {...props}
        >
          {buttonContent}
        </Link>
      </m.div>
    )
  }

  return (
    <m.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {buttonContent}
    </m.button>
  )
}
