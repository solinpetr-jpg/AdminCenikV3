import { useState, useEffect } from 'react'
import { brigadyServices } from './data/brigadyServices'
import { useCart } from './contexts/CartContext'
import PriceInfoPopover from './PriceInfoPopover'
import { formatPriceCZK, getDiscountForQuantity, quantityFromLabel } from './utils/pricing'
import type { BasicAdService } from './types'

const SERVICE_ID_PREFIX = 'brigady-'

interface BrigadyRowProps {
  service: BasicAdService
  quantity: number
  setQuantity: (v: number) => void
  index: number
}

function BrigadyRow({ service, quantity, setQuantity, index }: BrigadyRowProps) {
  const { addOrUpdateItem, updateItemQuantity, getItemQuantity } = useCart()
  const hasQuantityOptions = (service.quantityOptions?.length ?? 0) > 0
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState<number | null>(null)
  const showStepper = quantity > 0
  const serviceId = `${SERVICE_ID_PREFIX}${service.id}`

  const cartQuantity = getItemQuantity(serviceId)
  useEffect(() => {
    if (cartQuantity !== quantity) {
      setQuantity(cartQuantity)
      if (cartQuantity === 0) {
        setSelectedQuantityIndex(null)
      } else {
        syncSelectionFromStepper(cartQuantity)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQuantity])

  const minQtyForDiscount =
    hasQuantityOptions && service.quantityOptions?.length
      ? Math.min(...service.quantityOptions.map((opt) => quantityFromLabel(opt.label)))
      : 0
  const showAddMoreForDiscount =
    hasQuantityOptions && quantity > 0 && quantity < minQtyForDiscount
  const discountInfo = hasQuantityOptions ? getDiscountForQuantity(quantity) : null
  const discountText = discountInfo
    ? `Sleva ${Math.abs(discountInfo.percent)}% (${discountInfo.label})`
    : null

  const totalPrice = service.priceCZK * quantity
  const discountedPrice = discountInfo
    ? Math.round(totalPrice * (1 + discountInfo.percent / 100))
    : null

  const handleQuantityClick = (i: number) => {
    if (!hasQuantityOptions || !service.quantityOptions) return
    setSelectedQuantityIndex(i)
    const qty = quantityFromLabel(service.quantityOptions[i].label)
    setQuantity(qty)
  }

  const updateCartQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      updateItemQuantity(serviceId, 0)
      setSelectedQuantityIndex(null)
    } else {
      const cartQty = getItemQuantity(serviceId)
      if (cartQty === 0) {
        addOrUpdateItem({
          serviceId,
          name: service.title,
          unitPriceWithoutVat: service.priceCZK,
          quantity: newQuantity,
          discountPercent: 0,
          validityDays: '365',
        })
      } else {
        updateItemQuantity(serviceId, newQuantity)
      }
    }
  }

  const handleAddClick = () => {
    let newQuantity: number
    if (hasQuantityOptions && selectedQuantityIndex != null && service.quantityOptions) {
      newQuantity = quantityFromLabel(service.quantityOptions[selectedQuantityIndex].label)
      setQuantity(newQuantity)
    } else {
      newQuantity = 1
      setQuantity(newQuantity)
    }
    updateCartQuantity(newQuantity)
  }

  const syncSelectionFromStepper = (value: number) => {
    if (!hasQuantityOptions || !service.quantityOptions) return
    const minQty = Math.min(...service.quantityOptions.map((opt) => quantityFromLabel(opt.label)))
    if (value < minQty) {
      setSelectedQuantityIndex(null)
      return
    }
    const idx = service.quantityOptions.findIndex((opt) => quantityFromLabel(opt.label) === value)
    if (idx >= 0) setSelectedQuantityIndex(idx)
    if (value === 0) setSelectedQuantityIndex(null)
  }

  return (
    <div
      className="premium-service-row-wrapper w-100"
      style={{
        backgroundColor: cartQuantity > 0 ? '#F9FAFD' : 'white',
        transition: 'background-color 0.2s ease',
      }}
    >
      <div
        className={`premium-service-row premium-service-row--grid px-3 ${
          index === 0 ? 'premium-service-row--first' : ''
        }`}
      >
        <div className="premium-service-row-title d-flex flex-column min-w-0">
          <div className="d-flex align-items-center gap-2">
            <span className="premium-service-title">{service.title}</span>
            {cartQuantity > 0 ? (
              <span className="premium-service-order-badge">Přidáno</span>
            ) : (
              <span className="premium-service-order-badge premium-service-order-badge--placeholder" aria-hidden />
            )}
          </div>
          {service.subtitle && (
            <span className="card-subtitle-text mt-0">{service.subtitle}</span>
          )}
        </div>

        <div className="premium-service-row-right">
          <div
            className={`discount-label package-card-discount-note premium-service-discount-note${!discountText && !showAddMoreForDiscount ? ' premium-service-discount-note--placeholder' : ''}${showAddMoreForDiscount ? ' premium-service-add-for-discount-note' : ''}`}
            aria-hidden={!discountText && !showAddMoreForDiscount}
          >
            {discountText ?? (showAddMoreForDiscount ? 'Přidejte 3+ ks pro slevu' : null)}
          </div>
          {hasQuantityOptions && service.quantityOptions ? (
            <div
              className="d-flex flex-wrap gap-2 align-items-center flex-shrink-0"
              role="group"
              aria-label="Množství"
            >
              {service.quantityOptions.map((opt, i) => (
                <div key={i} className="quantity-option-wrapper">
                  {opt.discount && (
                    <span className="quantity-badge" aria-hidden>
                      {opt.discount}
                    </span>
                  )}
                  <button
                    type="button"
                    className={`quantity-option ${selectedQuantityIndex === i ? 'active' : ''}`}
                    onClick={() => handleQuantityClick(i)}
                    aria-pressed={selectedQuantityIndex === i}
                  >
                    {opt.label}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="premium-service-quantity-placeholder" aria-hidden />
          )}
          <div className="premium-service-price-block text-end">
            <div
              className="package-card-price-old"
              style={{ visibility: discountedPrice != null ? 'visible' : 'hidden' }}
            >
              {formatPriceCZK(totalPrice)}
            </div>
            <div className="d-flex align-items-center justify-content-end gap-2">
              <span className="package-card-price">
                {formatPriceCZK(
                  discountedPrice ?? (quantity > 0 ? totalPrice : service.priceCZK)
                )}
              </span>
              <PriceInfoPopover
                title={service.title}
                unitPrice={service.priceCZK}
                hasQuantityOptions={hasQuantityOptions}
              />
            </div>
            <div className="small text-muted">{service.vatNote ?? 'bez DPH'}</div>
          </div>

          <div className="premium-service-cta-wrapper">
            {showStepper ? (
              <div className="stepper flex-shrink-0" role="group" aria-label="Počet">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => {
                    const v = Math.max(0, quantity - 1)
                    setQuantity(v)
                    syncSelectionFromStepper(v)
                    updateCartQuantity(v)
                  }}
                  disabled={quantity <= 0}
                  aria-label="Snížit počet"
                >
                  −
                </button>
                <input
                  type="number"
                  className="stepper-input"
                  min={0}
                  value={quantity}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10)
                    const val = Number.isNaN(v) || v < 0 ? 0 : v
                    setQuantity(val)
                    syncSelectionFromStepper(val)
                    updateCartQuantity(val)
                  }}
                  aria-label={`Počet: ${service.title}`}
                />
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => {
                    const newQty = quantity + 1
                    setQuantity(newQty)
                    syncSelectionFromStepper(newQty)
                    updateCartQuantity(newQty)
                  }}
                  aria-label="Zvýšit počet"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-danger rounded-pill flex-shrink-0 btn-cta btn-cta--primary"
                onClick={handleAddClick}
              >
                <span className="btn-cta__icon" aria-hidden>+</span>
                <span className="btn-cta__label">Přidat</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BrigadySectionContent() {
  const [quantities, setQuantities] = useState(brigadyServices.map(() => 0))

  const setQuantity = (index: number, value: number) => {
    setQuantities((prev) => {
      const next = [...prev]
      next[index] = Math.max(0, value)
      return next
    })
  }

  return (
    <div className="brigady-section">
      {brigadyServices.map((service, index) => (
        <BrigadyRow
          key={service.id}
          service={service}
          quantity={quantities[index]}
          setQuantity={(v) => setQuantity(index, v)}
          index={index}
        />
      ))}
    </div>
  )
}
