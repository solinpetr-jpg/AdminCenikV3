import { useState, useEffect, useMemo } from 'react'
import { dalsiProduktyServices, type DalsiProduktItem } from './data/dalsiProduktyServices'
import { useCart } from './contexts/CartContext'
import { useRole } from './contexts/RoleContext'

const SERVICE_ID_PREFIX = 'dalsi-'

/** ID položek skrytých v roli Obchodník: Služba na objednávku, Balíček kreditů na Facebook/Instagram */
const HIDDEN_FOR_SALES_IDS: readonly number[] = [1, 2]

function DalsiProduktRow({
  item,
  quantity,
  setQuantity,
  index,
}: {
  item: DalsiProduktItem
  quantity: number
  setQuantity: (v: number) => void
  index: number
}) {
  const { addOrUpdateItem, updateItemQuantity, getItemQuantity } = useCart()
  const serviceId = `${SERVICE_ID_PREFIX}${item.id}`
  const cartQuantity = getItemQuantity(serviceId)
  const showStepper = quantity > 0

  useEffect(() => {
    if (cartQuantity !== quantity) {
      setQuantity(cartQuantity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQuantity])

  const updateCartQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      updateItemQuantity(serviceId, 0)
    } else {
      if (cartQuantity === 0) {
        addOrUpdateItem({
          serviceId,
          name: item.title,
          unitPriceWithoutVat: item.priceCZK,
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
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    updateCartQuantity(newQuantity)
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
            <span className="premium-service-title">{item.title}</span>
            {cartQuantity > 0 ? (
              <span className="premium-service-order-badge">Přidáno</span>
            ) : (
              <span className="premium-service-order-badge premium-service-order-badge--placeholder" aria-hidden />
            )}
          </div>
        </div>

        <div className="premium-service-row-right">
          <div
            className="discount-label package-card-discount-note premium-service-discount-note premium-service-discount-note--placeholder"
            aria-hidden
          />
          <div className="premium-service-quantity-placeholder" aria-hidden />
          <div className="premium-service-price-block text-end">
            <div className="package-card-price-old" style={{ visibility: 'hidden' as const }}>
              {item.priceDisplay}
            </div>
            <div className="d-flex align-items-center justify-content-end gap-2">
              <span className="package-card-price">{item.priceDisplay}</span>
            </div>
            <div className="small text-muted">bez DPH</div>
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
                    updateCartQuantity(val)
                  }}
                  aria-label={`Počet: ${item.title}`}
                />
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => {
                    const newQty = quantity + 1
                    setQuantity(newQty)
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
                aria-label={`Přidat ${item.title}`}
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

export default function DalsiProduktySectionContent() {
  const { role } = useRole()
  const [quantities, setQuantities] = useState(dalsiProduktyServices.map(() => 0))

  const visibleServices = useMemo(
    () =>
      role === 'sales'
        ? dalsiProduktyServices.filter((s) => !HIDDEN_FOR_SALES_IDS.includes(s.id))
        : dalsiProduktyServices,
    [role]
  )

  const setQuantity = (index: number, value: number) => {
    setQuantities((prev) => {
      const next = [...prev]
      next[index] = Math.max(0, value)
      return next
    })
  }

  return (
    <div className="dalsi-produkty-section">
      {visibleServices.map((item, visibleIndex) => {
        const fullIndex = dalsiProduktyServices.findIndex((s) => s.id === item.id)
        return (
          <DalsiProduktRow
            key={item.id}
            item={item}
            quantity={quantities[fullIndex]}
            setQuantity={(v) => setQuantity(fullIndex, v)}
            index={visibleIndex}
          />
        )
      })}
    </div>
  )
}
