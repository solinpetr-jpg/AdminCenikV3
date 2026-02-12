import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils/cn'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost-danger'
export type ButtonSize = 'md' | 'sm'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  children?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  leftIcon,
  rightIcon,
  fullWidth,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'ds-btn',
        `ds-btn--${variant}`,
        size !== 'md' && `ds-btn--${size}`,
        fullWidth && 'ds-btn--full',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <span className="ds-btn__icon ds-btn__icon--left" aria-hidden>{leftIcon}</span>}
      {children != null && <span className="ds-btn__label">{children}</span>}
      {rightIcon && <span className="ds-btn__icon ds-btn__icon--right" aria-hidden>{rightIcon}</span>}
    </button>
  )
}
