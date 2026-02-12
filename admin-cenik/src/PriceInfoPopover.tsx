import { useId, useRef, useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { Info } from 'lucide-react'
import { formatPriceCZK, getDiscountPercentForQuantity } from './utils/pricing'

function getPortalRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  return document.body
}

function usePanelPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [positionReady, setPositionReady] = useState(false)

  useLayoutEffect(() => {
    if (!isOpen) {
      setPositionReady(false)
      return
    }
    if (!triggerRef.current) return

    const update = () => {
      const el = triggerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const panelMaxH = Math.min(vh * 0.85, 520)
      const panelW = Math.min(440, vw - 24)
      const margin = 16

      let left = rect.left - panelW - margin
      left = Math.max(margin, Math.min(vw - panelW - margin, left))

      const iconCenterY = rect.top + rect.height / 2
      let top = iconCenterY - panelMaxH / 2
      const minTop = margin
      const maxTop = Math.max(minTop, vh - panelMaxH - margin)
      top = Math.max(minTop, Math.min(maxTop, top))

      setPosition({ left, top })
      setPositionReady(true)
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [isOpen, triggerRef])

  return { ...position, positionReady }
}

interface PriceInfoPopoverProps {
  title: string
  unitPrice: number
  hasQuantityOptions?: boolean
  maxQuantity?: number
}

export default function PriceInfoPopover({
  title,
  unitPrice,
  hasQuantityOptions = true,
  maxQuantity = 20,
}: PriceInfoPopoverProps) {
  const panelId = useId()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didIncrementBodyRef = useRef(false)
  const { left, top, positionReady } = usePanelPosition(triggerRef, isOpen)

  const open = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (typeof document !== 'undefined') {
      document.body.dataset.priceInfoOpen = (
        Number(document.body.dataset.priceInfoOpen || 0) + 1
      ).toString()
      document.documentElement.style.overflow = 'visible'
      document.body.style.overflow = 'visible'
      didIncrementBodyRef.current = true
    }
    setIsOpen(true)
  }

  const close = (delay = 0) => {
    const doClose = () => {
      setIsOpen(false)
      if (typeof document !== 'undefined' && didIncrementBodyRef.current) {
        didIncrementBodyRef.current = false
        const n = Math.max(0, Number(document.body.dataset.priceInfoOpen || 1) - 1)
        document.body.dataset.priceInfoOpen = n.toString()
        if (n === 0) {
          document.documentElement.style.overflow = ''
          document.body.style.overflow = ''
        }
      }
    }
    if (delay) {
      closeTimeoutRef.current = setTimeout(doClose, delay)
    } else {
      doClose()
    }
  }

  useLayoutEffect(() => {
    return () => {
      if (didIncrementBodyRef.current && typeof document !== 'undefined') {
        didIncrementBodyRef.current = false
        const n = Math.max(0, Number(document.body.dataset.priceInfoOpen || 1) - 1)
        document.body.dataset.priceInfoOpen = n.toString()
        if (n === 0) {
          document.documentElement.style.overflow = ''
          document.body.style.overflow = ''
        }
      }
    }
  }, [])

  const rows = Array.from({ length: maxQuantity }, (_, index) => {
    const quantity = index + 1
    const totalBeforeDiscount = unitPrice * quantity
    const discountPercent = hasQuantityOptions ? getDiscountPercentForQuantity(quantity) : 0
    const totalAfterDiscount = Math.round(totalBeforeDiscount * (1 - discountPercent / 100))

    return {
      quantityLabel: `${quantity} ks`,
      totalBeforeDiscount: formatPriceCZK(totalBeforeDiscount),
      discountPercent,
      totalAfterDiscount: formatPriceCZK(totalAfterDiscount),
    }
  })

  const portalTarget = getPortalRoot()

  const panelContent = (
    <div
      id={panelId}
      className="price-info-panel price-info-panel--portal"
      role="tooltip"
      style={{
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 2147483647,
      }}
      onMouseEnter={open}
      onMouseLeave={() => close(150)}
    >
      <span className="price-info-title">{title}</span>
      <span className="price-info-header">
        <span>Počet</span>
        <span>Cena před slevou</span>
        <span>Sleva</span>
        <span>Cena po slevě</span>
      </span>
      <span className="price-info-rows">
        {rows.map((row) => (
          <span
            key={row.quantityLabel}
            className={`price-info-row ${row.discountPercent > 0 ? 'price-info-row--discounted' : ''}`}
          >
            <span>{row.quantityLabel}</span>
            <span>{row.totalBeforeDiscount}</span>
            <span>
              {row.discountPercent > 0 ? (
                <span className="quantity-badge price-info-discount-badge">
                  -{row.discountPercent}%
                </span>
              ) : (
                <span className="price-info-no-discount">-</span>
              )}
            </span>
            <span>{row.totalAfterDiscount}</span>
          </span>
        ))}
      </span>
      <span className="price-info-footnote">
        Sleva se automaticky uplatňuje podle zvoleného množství.
      </span>
    </div>
  )

  return (
    <span
      ref={triggerRef}
      className="price-info-trigger"
      onMouseEnter={open}
      onMouseLeave={() => close(150)}
    >
      <button
        type="button"
        className="btn btn-link btn-sm p-0 align-middle text-secondary price-info-button"
        title="Informace o ceně"
        aria-label={`Informace o ceně: ${title}`}
        aria-describedby={panelId}
        onFocus={open}
        onBlur={() => close(100)}
      >
        <Info size={16} strokeWidth={2} aria-hidden />
      </button>

      {isOpen && positionReady && portalTarget && createPortal(panelContent, portalTarget)}
    </span>
  )
}
