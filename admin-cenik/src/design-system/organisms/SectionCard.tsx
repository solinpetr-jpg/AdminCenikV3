import { type ReactNode } from 'react'
import CardSurface from '../atoms/CardSurface'
import { cn } from '../utils/cn'
import './SectionCard.css'

export interface SectionCardProps {
  children: ReactNode
  /** Card with items in cart uses softer background */
  highlighted?: boolean
  className?: string
}

export default function SectionCard({
  children,
  highlighted,
  className,
}: SectionCardProps) {
  return (
    <CardSurface
      variant={highlighted ? 'selected' : 'default'}
      className={cn('ds-section-card', className)}
    >
      {children}
    </CardSurface>
  )
}
