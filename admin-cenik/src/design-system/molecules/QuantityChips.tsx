import Chip from '../atoms/Chip'
import { cn } from '../utils/cn'
import './QuantityChips.css'

export interface QuantityOption {
  label: string
  discount?: string
}

export interface QuantityChipsProps {
  options: QuantityOption[]
  selectedIndex: number | null
  onSelect: (index: number) => void
  'aria-label'?: string
  /** If true, no top padding (e.g. in table row) */
  compact?: boolean
  className?: string
}

export default function QuantityChips({
  options,
  selectedIndex,
  onSelect,
  'aria-label': ariaLabel = 'Množství',
  compact,
  className,
}: QuantityChipsProps) {
  return (
    <div
      className={cn(
        'ds-quantity-chips',
        compact && 'ds-quantity-chips--compact',
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((opt, i) => (
        <Chip
          key={i}
          selected={selectedIndex === i}
          badge={opt.discount}
          onClick={() => onSelect(i)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  )
}
