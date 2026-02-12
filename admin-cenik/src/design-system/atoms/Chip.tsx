import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Chip.css'

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  selected?: boolean
  badge?: string
  children: React.ReactNode
}

export default function Chip({
  selected = false,
  badge,
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <div className="ds-chip-wrapper">
      {badge && (
        <span className="ds-chip-badge" aria-hidden>
          {badge}
        </span>
      )}
      <button
        type="button"
        className={cn('ds-chip', selected && 'ds-chip--selected', className)}
        aria-pressed={selected}
        {...rest}
      >
        {children}
      </button>
    </div>
  )
}
