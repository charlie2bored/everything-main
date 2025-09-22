import Link from 'next/link'
import { forwardRef } from 'react'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  disabled?: boolean
  className?: string
  'aria-label'?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, href, onClick, variant = 'primary', disabled = false, className = '', type = 'button', ...props }, ref) => {
    const baseClasses = 'btn'
    const variantClasses = {
      primary: 'btn--primary',
      ghost: 'btn--ghost'
    }
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...props}
        >
          <span className="btn__text">{children}</span>
        </Link>
      )
    }

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        <span className="btn__text">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button