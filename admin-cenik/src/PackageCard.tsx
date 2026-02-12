import { useState, useEffect } from 'react'
import { useCart } from './contexts/CartContext'
import PriceInfoPopover from './PriceInfoPopover'
import { formatPriceCZK, getDiscountForQuantity, quantityFromLabel } from './utils/pricing'
import type { TopPackage } from './types'

interface PackageCardProps {
  package: TopPackage
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const { addOrUpdateItem, updateItemQuantity, getItemQuantity } = useCart()
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState<number | null>(null)
  const [stepperValue, setStepperValue] = useState(0)
  const [pendingZeroConfirm, setPendingZeroConfirm] = useState(false)

  const cartQuantity = getItemQuantity(`top-${pkg.id}`)
  useEffect(() => {
    if (cartQuantity !== stepperValue && !pendingZeroConfirm) {
      setStepperValue(cartQuantity)
      if (cartQuantity === 0) {
        setSelectedQuantityIndex(null)
        setPendingZeroConfirm(false)
      } else {
        syncQuantitySelection(cartQuantity)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQuantity])

  const showStepper = stepperValue > 0 || pendingZeroConfirm

  const handleAddClick = () => {
    let qty: number
    let index: number | null

    if (selectedQuantityIndex != null) {
      index = selectedQuantityIndex
      const opt = pkg.quantityOptions[index]
      qty = quantityFromLabel(opt?.label ?? '1')
    } else {
      qty = 1
      index = null
    }

    setSelectedQuantityIndex(index)
    setStepperValue(qty)
    setPendingZeroConfirm(false)

    addOrUpdateItem({
      serviceId: `top-${pkg.id}`,
      name: pkg.title,
      unitPriceWithoutVat: pkg.priceCZK,
      quantity: qty,
      discountPercent: 0,
      validityDays: '365',
    })
  }

  const syncQuantitySelection = (value: number) => {
    if (value === 0) {
      setSelectedQuantityIndex(null)
      return
    }
    const minQty = Math.min(...pkg.quantityOptions.map((opt) => quantityFromLabel(opt.label)))
    if (value < minQty) {
      setSelectedQuantityIndex(null)
      return
    }
    const idx = pkg.quantityOptions.findIndex((opt) => quantityFromLabel(opt.label) === value)
    if (idx >= 0) setSelectedQuantityIndex(idx)
  }

  const updateCartQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      updateItemQuantity(`top-${pkg.id}`, 0)
      setSelectedQuantityIndex(null)
      setPendingZeroConfirm(false)
    } else {
      addOrUpdateItem({
        serviceId: `top-${pkg.id}`,
        name: pkg.title,
        unitPriceWithoutVat: pkg.priceCZK,
        quantity: newQuantity,
        discountPercent: 0,
        validityDays: '365',
      })
      syncQuantitySelection(newQuantity)
    }
  }

  const handleStepperChange = (delta: number) => {
    const newValue = Math.max(0, stepperValue + delta)
    setStepperValue(newValue)
    setPendingZeroConfirm(false)
    updateCartQuantity(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    const newValue = Number.isNaN(val) || val < 0 ? 0 : val
    setStepperValue(newValue)
    if (newValue === 0) {
      setPendingZeroConfirm(true)
    } else {
      setPendingZeroConfirm(false)
    }
    updateCartQuantity(newValue)
  }

  const handleStepperKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && stepperValue === 0) {
      setPendingZeroConfirm(false)
      setSelectedQuantityIndex(null)
    }
  }

  const selectedQuantityOption =
    selectedQuantityIndex != null ? pkg.quantityOptions[selectedQuantityIndex] : null

  const hasQuantityOptions = pkg.quantityOptions?.length > 0
  const minQtyForDiscount = hasQuantityOptions
    ? Math.min(...pkg.quantityOptions.map((opt) => quantityFromLabel(opt.label)))
    : 0
  const showAddMoreForDiscount =
    hasQuantityOptions && stepperValue > 0 && stepperValue < minQtyForDiscount
  const discountInfo = hasQuantityOptions ? getDiscountForQuantity(stepperValue) : null
  const discountText = discountInfo
    ? `Sleva ${Math.abs(discountInfo.percent)}% (${discountInfo.label})`
    : null

  const totalPrice = pkg.priceCZK * stepperValue
  const discountedPrice = discountInfo
    ? Math.round(totalPrice * (1 + discountInfo.percent / 100))
    : null

  return (
    <div
      className={`card h-100 position-relative package-card${pkg.isFavorite ? ' package-card--favorite' : ''}`}
      style={{
        backgroundColor: cartQuantity > 0 ? '#F9FAFD' : 'white',
        transition: 'background-color 0.2s ease',
      }}
    >
      {pkg.isFavorite && (
        <span
          className="badge rounded-pill position-absolute package-card-favorite-badge"
          style={{ fontWeight: 900 }}
          aria-hidden
        >
          NEJOBLÍBENĚJŠÍ
        </span>
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-2 flex-wrap mb-1 package-card-header-row">
          <h5 className="card-title mb-0">{pkg.title}</h5>
          {showStepper ? (
            <span className="premium-service-order-badge">Přidáno</span>
          ) : (
            <span className="premium-service-order-badge premium-service-order-badge--placeholder" aria-hidden />
          )}
        </div>
        <p className="card-subtitle-text mb-4">{pkg.subtitle}</p>

        <span className="card-quantity-label">MNOŽSTVÍ</span>
        <div className="d-flex flex-wrap gap-2 mb-0" role="group" aria-label="Množství">
          {pkg.quantityOptions.map((opt, i) => (
            <div key={i} className="quantity-option-wrapper">
              {opt.discount && (
                <span className="quantity-badge" aria-hidden>
                  {opt.discount}
                </span>
              )}
              <button
                type="button"
                className={`quantity-option ${selectedQuantityIndex === i ? 'active' : ''}`}
                onClick={() => {
                  const selectedQty = quantityFromLabel(opt.label)
                  setSelectedQuantityIndex(i)
                  setStepperValue(selectedQty)
                  setPendingZeroConfirm(false)
                  updateCartQuantity(selectedQty)
                }}
                aria-pressed={selectedQuantityIndex === i}
              >
                {opt.label}
              </button>
            </div>
          ))}
        </div>

        <div
          className={`package-card-discount-note mt-4 mb-3${showAddMoreForDiscount ? ' package-card-add-for-discount-note' : ''}`}
        >
          {discountText ?? (showAddMoreForDiscount ? 'Přidejte 3+ ks pro slevu' : null)}
        </div>

        <div className="d-flex justify-content-between align-items-end gap-2 package-card-actions-row">
          {showStepper ? (
            <div className="stepper flex-shrink-0" role="group" aria-label="Počet">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => handleStepperChange(-1)}
                disabled={stepperValue <= 0}
                aria-label="Snížit počet"
              >
                −
              </button>
              <input
                type="number"
                className="stepper-input"
                min={0}
                value={stepperValue}
                onChange={handleInputChange}
                onKeyDown={handleStepperKeyDown}
                aria-label="Počet kusů"
              />
              <button
                type="button"
                className="stepper-btn"
                onClick={() => handleStepperChange(1)}
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
          <div className="package-card-price-block">
            {discountedPrice != null ? (
              <>
                <div className="package-card-price-old">{formatPriceCZK(totalPrice)}</div>
                <div className="d-flex align-items-center justify-content-start gap-2">
                  <div className="package-card-price">{formatPriceCZK(discountedPrice)}</div>
                  <PriceInfoPopover
                    title={pkg.title}
                    unitPrice={pkg.priceCZK}
                    hasQuantityOptions={hasQuantityOptions}
                  />
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-start gap-1">
                <span className="package-card-price">
                  {formatPriceCZK(stepperValue > 0 ? totalPrice : pkg.priceCZK)}
                </span>
                <PriceInfoPopover
                  title={pkg.title}
                  unitPrice={pkg.priceCZK}
                  hasQuantityOptions={hasQuantityOptions}
                />
              </div>
            )}
            <div className="small text-muted">{pkg.vatNote}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
