import { useState } from 'react'
import { Info } from 'lucide-react'
import CardSurface from '../atoms/CardSurface'
import Badge from '../atoms/Badge'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import QuantityChips from '../molecules/QuantityChips'
import Price from '../molecules/Price'
import Button from '../atoms/Button'
import Stepper from '../atoms/Stepper'
import PricingHintTable from './PricingHintTable'
import { formatPriceCZK, getDiscountForQuantity } from '../utils/pricing'
import type { QuantityOption } from '../molecules/QuantityChips'
import { cn } from '../utils/cn'
import './PricingCard.css'

function quantityFromLabel(label: string): number {
  const n = parseInt(label.replace(/\D/g, ''), 10)
  return Number.isNaN(n) || n < 1 ? 1 : n
}

export interface PricingCardProps {
  title: string
  subtitle: string
  unitPrice: number
  vatNote?: string
  favoriteBadge?: boolean
  quantityOptions: QuantityOption[]
  /** Current quantity in cart (0 = show CTA, >0 = show stepper) */
  quantity?: number
  onQuantityChange?: (quantity: number) => void
  onAdd?: (quantity: number) => void
  disabled?: boolean
  loading?: boolean
  /** Visual state: card has items (softer bg) */
  selected?: boolean
  className?: string
}

export default function PricingCard({
  title,
  subtitle,
  unitPrice,
  vatNote = 'bez DPH',
  favoriteBadge,
  quantityOptions,
  quantity = 0,
  onQuantityChange,
  onAdd,
  disabled,
  loading,
  selected,
  className,
}: PricingCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hintOpen, setHintOpen] = useState(false)

  const hasOptions = quantityOptions.length > 0
  const showStepper = quantity > 0
  const minQty = hasOptions
    ? Math.min(...quantityOptions.map((o) => quantityFromLabel(o.label)))
    : 0
  const showAddMoreHint = hasOptions && quantity > 0 && quantity < minQty
  const discountInfo = hasOptions ? getDiscountForQuantity(quantity) : null
  const discountText = discountInfo
    ? `Sleva ${Math.abs(discountInfo.percent)}% (${discountInfo.label})`
    : null
  const totalPrice = unitPrice * quantity
  const discountedTotal =
    discountInfo != null
      ? Math.round(totalPrice * (1 + discountInfo.percent / 100))
      : null

  const handleAdd = () => {
    const qty =
      hasOptions && selectedIndex != null
        ? quantityFromLabel(quantityOptions[selectedIndex].label)
        : 1
    onAdd?.(qty)
  }

  const handleChipSelect = (index: number) => {
    setSelectedIndex(index)
    const qty = quantityFromLabel(quantityOptions[index].label)
    onAdd?.(qty)
  }

  const displayPrice = showStepper
    ? discountedTotal ?? totalPrice
    : unitPrice
  const showOldPrice = discountedTotal != null && quantity > 0

  return (
    <>
      <CardSurface
        variant={selected ? 'selected' : favoriteBadge ? 'highlight' : 'default'}
        className={cn(
          'ds-pricing-card',
          selected && 'ds-pricing-card--selected',
          disabled && 'ds-pricing-card--disabled',
          loading && 'ds-pricing-card--loading',
          className
        )}
      >
        {favoriteBadge && (
          <span className="ds-pricing-card-badge-top" aria-hidden>
            <Badge variant="accent">NEJOBLÍBENĚJŠÍ</Badge>
          </span>
        )}
        <div className="ds-pricing-card-body">
          <div className="ds-pricing-card-header-row">
            <Heading level={4} className="ds-pricing-card-title">
              {title}
            </Heading>
            {showStepper ? (
              <Badge variant="success">Přidáno</Badge>
            ) : (
              <span className="ds-pricing-card-badge-placeholder" aria-hidden />
            )}
          </div>
          <Text as="p" variant="bodySm" muted className="ds-pricing-card-subtitle">
            {subtitle}
          </Text>

          <Text variant="label" as="div" className="ds-pricing-card-quantity-label">
            MNOŽSTVÍ
          </Text>
          <QuantityChips
            options={quantityOptions}
            selectedIndex={selectedIndex}
            onSelect={handleChipSelect}
            compact={false}
          />

          <div
            className={cn(
              'ds-pricing-card-discount-note',
              showAddMoreHint && 'ds-pricing-card-discount-note--hint'
            )}
          >
            {discountText ?? (showAddMoreHint ? 'Přidejte 3+ ks pro slevu' : null)}
          </div>

          <div className="ds-pricing-card-actions-row">
            {showStepper ? (
              <Stepper
                value={quantity}
                onChange={(v) => onQuantityChange?.(v)}
                min={0}
                disabled={disabled}
                aria-label="Počet"
              />
            ) : (
              <Button
                variant="primary"
                onClick={handleAdd}
                disabled={disabled || loading}
                leftIcon={<span aria-hidden>+</span>}
              >
                Přidat
              </Button>
            )}
            <div className="ds-pricing-card-price-block">
              {showOldPrice && (
                <div className="ds-pricing-card-price-old">
                  {formatPriceCZK(totalPrice)}
                </div>
              )}
              <div className="ds-pricing-card-price-row">
                <Price value={formatPriceCZK(displayPrice)} size="lg" />
                <button
                  type="button"
                  className="ds-pricing-card-info-btn"
                  onClick={() => setHintOpen(true)}
                  aria-label={`Informace o ceně: ${title}`}
                  title="Informace o ceně"
                >
                  <Info size={16} strokeWidth={2} aria-hidden />
                </button>
              </div>
              <Text variant="bodySm" muted className="ds-pricing-card-vat-note">
                {vatNote}
              </Text>
            </div>
          </div>
        </div>
      </CardSurface>

      <PricingHintTable
        open={hintOpen}
        onClose={() => setHintOpen(false)}
        title={title}
        unitPrice={unitPrice}
        hasQuantityOptions={hasOptions}
        maxQuantity={20}
      />
    </>
  )
}
