import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Badge.css'

export type BadgeVariant = 'success' | 'accent' | 'placeholder'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: React.ReactNode
}

export default function Badge({
  variant = 'success',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn('ds-badge', `ds-badge--${variant}`, className)}
      {...rest}
    >
      {children}
    </span>
  )
}
