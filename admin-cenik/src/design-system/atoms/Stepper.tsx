import { type InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Stepper.css'

export interface StepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  disabled?: boolean
  'aria-label'?: string
  decrementLabel?: string
  incrementLabel?: string
  inputLabel?: string
  className?: string
}

export default function Stepper({
  value,
  onChange,
  min = 0,
  disabled,
  'aria-label': ariaLabel = 'Počet',
  decrementLabel = 'Snížit počet',
  incrementLabel = 'Zvýšit počet',
  inputLabel = 'Počet kusů',
  className,
}: StepperProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    const newValue = Number.isNaN(val) || val < min ? min : val
    onChange(newValue)
  }

  return (
    <div
      className={cn('ds-stepper', className)}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="ds-stepper__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label={decrementLabel}
      >
        −
      </button>
      <input
        type="number"
        className="ds-stepper__input"
        min={min}
        value={value}
        onChange={handleInputChange}
        aria-label={inputLabel}
      />
      <button
        type="button"
        className="ds-stepper__btn"
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        aria-label={incrementLabel}
      >
        +
      </button>
    </div>
  )
}
