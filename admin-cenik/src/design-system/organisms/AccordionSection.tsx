import { useState, type ReactNode } from 'react'
import { Info } from 'lucide-react'
import Accordion from './Accordion'
import IconWrapper from '../atoms/IconWrapper'
import Text from '../atoms/Text'
import QuantityChips from '../molecules/QuantityChips'
import Price from '../molecules/Price'
import Button from '../atoms/Button'
import Stepper from '../atoms/Stepper'
import Badge from '../atoms/Badge'
import PricingHintTable from './PricingHintTable'
import { formatPriceCZK, getDiscountForQuantity } from '../utils/pricing'
import type { QuantityOption } from '../molecules/QuantityChips'
import { cn } from '../utils/cn'
import './AccordionSection.css'

function quantityFromLabel(label: string): number {
  const n = parseInt(label.replace(/\D/g, ''), 10)
  return Number.isNaN(n) || n < 1 ? 1 : n
}

export interface AccordionSectionRowProps {
  title: string
  subtitle?: string
  unitPrice: number
  vatNote?: string
  quantityOptions: QuantityOption[]
  quantity: number
  onQuantityChange: (q: number) => void
  onAdd: (q: number) => void
}

function AccordionSectionRow({
  title,
  subtitle,
  unitPrice,
  vatNote = 'bez DPH',
  quantityOptions,
  quantity,
  onQuantityChange,
  onAdd,
}: AccordionSectionRowProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hintOpen, setHintOpen] = useState(false)
  const hasOptions = quantityOptions.length > 0
  const showStepper = quantity > 0
  const minQty = hasOptions
    ? Math.min(...quantityOptions.map((o) => quantityFromLabel(o.label)))
    : 0
  const showAddMore = hasOptions && quantity > 0 && quantity < minQty
  const discountInfo = hasOptions ? getDiscountForQuantity(quantity) : null
  const discountText = discountInfo
    ? `Sleva ${Math.abs(discountInfo.percent)}% (${discountInfo.label})`
    : null
  const totalPrice = unitPrice * quantity
  const discountedTotal =
    discountInfo != null
      ? Math.round(totalPrice * (1 + discountInfo.percent / 100))
      : null
  const displayPrice = discountedTotal ?? totalPrice

  const handleChipSelect = (index: number) => {
    setSelectedIndex(index)
    onAdd(quantityFromLabel(quantityOptions[index].label))
  }

  return (
    <>
      <div
        className={cn(
          'ds-accordion-section-row',
          quantity > 0 && 'ds-accordion-section-row--selected'
        )}
      >
        <div className="ds-accordion-section-row-inner">
          <div className="ds-accordion-section-row-title-block">
            <div className="ds-accordion-section-row-title-row">
              <span className="ds-accordion-section-row-title">{title}</span>
              {quantity > 0 ? (
                <Badge variant="success">Přidáno</Badge>
              ) : (
                <span className="ds-accordion-section-badge-ph" aria-hidden />
              )}
            </div>
            {subtitle && (
              <Text variant="bodySm" muted as="span" className="ds-accordion-section-row-subtitle">
                {subtitle}
              </Text>
            )}
          </div>
          <div className="ds-accordion-section-row-right">
            <div
              className={cn(
                'ds-accordion-section-discount-note',
                showAddMore && 'ds-accordion-section-discount-note--hint'
              )}
            >
              {discountText ?? (showAddMore ? 'Přidejte 3+ ks pro slevu' : null)}
            </div>
            {hasOptions ? (
              <QuantityChips
                options={quantityOptions}
                selectedIndex={selectedIndex}
                onSelect={handleChipSelect}
                compact
              />
            ) : (
              <div className="ds-accordion-section-qty-ph" aria-hidden />
            )}
            <div className="ds-accordion-section-price-block">
              {discountedTotal != null && quantity > 0 && (
                <div className="ds-accordion-section-price-old">
                  {formatPriceCZK(totalPrice)}
                </div>
              )}
              <div className="ds-accordion-section-price-row">
                <Price
                  value={formatPriceCZK(quantity > 0 ? displayPrice : unitPrice)}
                  size="md"
                />
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
              <Text variant="bodySm" muted as="span">{vatNote}</Text>
            </div>
            <div className="ds-accordion-section-cta-wrap">
              {showStepper ? (
                <Stepper
                  value={quantity}
                  onChange={onQuantityChange}
                  min={0}
                  aria-label={`Počet: ${title}`}
                />
              ) : (
                <Button
                  variant="primary"
                  onClick={() =>
                    onAdd(
                      hasOptions && selectedIndex != null
                        ? quantityFromLabel(quantityOptions[selectedIndex].label)
                        : 1
                    )
                  }
                  leftIcon={<span aria-hidden>+</span>}
                >
                  Přidat
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <PricingHintTable
        open={hintOpen}
        onClose={() => setHintOpen(false)}
        title={title}
        unitPrice={unitPrice}
        hasQuantityOptions={hasOptions}
      />
    </>
  )
}

export interface AccordionSectionProps {
  id: string
  title: string
  summary?: string
  icon: ReactNode
  rows: Array<{
    title: string
    subtitle?: string
    unitPrice: number
    vatNote?: string
    quantityOptions: QuantityOption[]
  }>
  /** Per-row quantity (controlled from parent for docs) */
  quantities?: number[]
  onQuantityChange?: (rowIndex: number, quantity: number) => void
  defaultExpanded?: boolean
  singleOpen?: boolean
  className?: string
}

export default function AccordionSection({
  id,
  title,
  summary,
  icon,
  rows,
  quantities: controlledQuantities,
  onQuantityChange,
  defaultExpanded = false,
  className,
}: AccordionSectionProps) {
  const [internalQuantities, setInternalQuantities] = useState(
    () => rows.map(() => 0)
  )
  const quantities = controlledQuantities ?? internalQuantities
  const setQuantity = (index: number, value: number) => {
    if (controlledQuantities != null) {
      onQuantityChange?.(index, value)
    } else {
      setInternalQuantities((prev) => {
        const next = [...prev]
        next[index] = Math.max(0, value)
        return next
      })
    }
  }
  const selectedCount = quantities.filter((q) => q > 0).length
  const summaryText =
    summary ??
    `${rows.length} položek • ${selectedCount} vybráno`

  return (
    <Accordion
      id={id}
      title={title}
      summary={summaryText}
      icon={icon}
      defaultExpanded={defaultExpanded}
      className={cn('ds-accordion-section', className)}
    >
      {rows.map((row, index) => (
        <AccordionSectionRow
          key={index}
          title={row.title}
          subtitle={row.subtitle}
          unitPrice={row.unitPrice}
          vatNote={row.vatNote}
          quantityOptions={row.quantityOptions}
          quantity={quantities[index] ?? 0}
          onQuantityChange={(q) => setQuantity(index, q)}
          onAdd={(q) => setQuantity(index, q)}
        />
      ))}
    </Accordion>
  )
}
