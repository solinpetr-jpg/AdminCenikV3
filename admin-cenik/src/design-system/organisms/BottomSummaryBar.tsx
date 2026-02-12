import { type ReactNode } from 'react'
import IconWrapper from '../atoms/IconWrapper'
import Button from '../atoms/Button'
import { cn } from '../utils/cn'
import './BottomSummaryBar.css'

export interface BottomSummaryBarProps {
  title: string
  subtitle?: string
  priceLabel?: string
  priceValue: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
  count?: number
  className?: string
}

export default function BottomSummaryBar({
  title,
  subtitle,
  priceLabel = 'bez DPH',
  priceValue,
  actionLabel = 'Zobrazit detail',
  onAction,
  icon,
  count = 0,
  className,
}: BottomSummaryBarProps) {
  return (
    <div className={cn('ds-bottom-summary-bar', className)} role="banner">
      <div className="ds-bottom-summary-bar-inner">
        <div className="ds-bottom-summary-bar-left">
          <div className="ds-bottom-summary-bar-icon-wrap">
            {icon}
            {count > 0 && (
              <span className="ds-bottom-summary-bar-count">{count}</span>
            )}
          </div>
          <div className="ds-bottom-summary-bar-text">
            <div className="ds-bottom-summary-bar-title">{title}</div>
            {subtitle != null && (
              <div className="ds-bottom-summary-bar-subtitle" title={subtitle}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <div className="ds-bottom-summary-bar-right">
          <div className="ds-bottom-summary-bar-price">
            <span className="ds-bottom-summary-bar-price-value">{priceValue}</span>
            <span className="ds-bottom-summary-bar-price-label">{priceLabel}</span>
          </div>
          <Button
            variant="secondary"
            onClick={onAction}
            rightIcon={
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
