import { useId } from 'react'
import { Info } from 'lucide-react'
import { formatPriceCZK, getDiscountPercentForQuantity } from './utils/pricing.js'

export default function PriceInfoPopover({ title, unitPrice, hasQuantityOptions = true, maxQuantity = 20 }) {
  const panelId = useId()

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

  return (
    <span className="price-info-trigger">
      <button
        type="button"
        className="btn btn-link btn-sm p-0 align-middle text-secondary price-info-button"
        title="Informace o ceně"
        aria-label={`Informace o ceně: ${title}`}
        aria-describedby={panelId}
      >
        <Info size={16} strokeWidth={2} aria-hidden />
      </button>

      <span id={panelId} className="price-info-panel" role="tooltip">
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
                  <span className="quantity-badge price-info-discount-badge">-{row.discountPercent}%</span>
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
      </span>
    </span>
  )
}
