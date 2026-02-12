import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './CardSurface.css'

export interface CardSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlight' | 'selected'
}

export default function CardSurface({
  variant = 'default',
  className,
  ...rest
}: CardSurfaceProps) {
  return (
    <div
      className={cn('ds-card-surface', variant !== 'default' && `ds-card-surface--${variant}`, className)}
      {...rest}
    />
  )
}
