import { type ReactNode } from 'react'
import { cn } from '../utils/cn'
import './Price.css'

export interface PriceProps {
  value: string | number
  size?: 'lg' | 'md' | 'sm'
  suffix?: ReactNode
  className?: string
}

export default function Price({
  value,
  size = 'lg',
  suffix,
  className,
}: PriceProps) {
  return (
    <span className={cn('ds-price', `ds-price--${size}`, className)}>
      <span className="ds-price__value">{value}</span>
      {suffix != null && <span className="ds-price__suffix">{suffix}</span>}
    </span>
  )
}
