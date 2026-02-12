import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'
import { formatPriceCZK, getDiscountPercentForQuantity } from '../utils/pricing'
import './PricingHintTable.css'

const FOOTER_TEXT =
  'Sleva se automaticky uplatňuje podle zvoleného množství.'

export interface PricingHintTableProps {
  open: boolean
  onClose: () => void
  title: string
  unitPrice: number
  hasQuantityOptions?: boolean
  maxQuantity?: number
  closeLabel?: string
}

function useFocusTrap(open: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || !containerRef.current) return
    const el = containerRef.current
    const focusables = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    el.addEventListener('keydown', handleKeyDown)
    return () => el.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return containerRef
}

export default function PricingHintTable({
  open,
  onClose,
  title,
  unitPrice,
  hasQuantityOptions = true,
  maxQuantity = 20,
  closeLabel = 'Zavřít',
}: PricingHintTableProps) {
  const containerRef = useFocusTrap(open, onClose)

  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  const rows = Array.from({ length: maxQuantity }, (_, i) => {
    const quantity = i + 1
    const totalBefore = unitPrice * quantity
    const discountPercent = hasQuantityOptions ? getDiscountPercentForQuantity(quantity) : 0
    const totalAfter = Math.round(totalBefore * (1 - discountPercent / 100))
    return {
      quantityLabel: `${quantity} ks`,
      totalBefore: formatPriceCZK(totalBefore),
      discountPercent,
      totalAfter: formatPriceCZK(totalAfter),
    }
  })

  const content = (
    <>
      <div
        className="ds-pricing-hint-backdrop"
        aria-hidden
        onClick={onClose}
      />
      <div
        ref={containerRef}
        className="ds-pricing-hint-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ds-pricing-hint-title"
      >
        <div className="ds-pricing-hint-header">
          <h2 id="ds-pricing-hint-title" className="ds-pricing-hint-title">
            {title}
          </h2>
          <button
            type="button"
            className="ds-pricing-hint-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="ds-pricing-hint-table-wrap">
          <table className="ds-pricing-hint-table">
            <thead>
              <tr>
                <th>Počet</th>
                <th>Cena před slevou</th>
                <th>Sleva</th>
                <th>Cena po slevě</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.quantityLabel}
                  className={cn(row.discountPercent > 0 && 'ds-pricing-hint-row--discounted')}
                >
                  <td>{row.quantityLabel}</td>
                  <td>{row.totalBefore}</td>
                  <td>
                    {row.discountPercent > 0 ? (
                      <span className="ds-pricing-hint-discount-badge">-{row.discountPercent}%</span>
                    ) : (
                      <span className="ds-pricing-hint-no-discount">-</span>
                    )}
                  </td>
                  <td>{row.totalAfter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ds-pricing-hint-footer">{FOOTER_TEXT}</p>
      </div>
    </>
  )

  return typeof document !== 'undefined'
    ? createPortal(content, document.body)
    : null
}
