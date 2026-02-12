import { useId, useState, useCallback } from 'react'
import { useCart } from './contexts/CartContext'
import { useRole } from './contexts/RoleContext'
import { formatPriceCZK } from './utils/pricing'
import { Package, ShoppingCart, CircleX, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import EditableCell from './EditableCell'
import ValueEditModal from './ValueEditModal'

type EditableField = 'itemName' | 'validity' | 'unitPrice' | 'totalWithoutVat' | 'budget'

interface RowEdits {
  itemName?: string
  validity?: string
  unitPrice?: string
  totalWithoutVat?: string
  budget?: string
}

const DPH_INFO_TEXT =
  'DPH se počítá podle sazby platné v zemi zákazníka (v ČR 21%) a celková částka se průběžně přepočítává podle vybraných položek.'

const DISCOUNT_OPTIONS = [
  { label: 'Bez slevy', value: 0 },
  { label: '10 %', value: 10 },
  { label: '15 %', value: 15 },
  { label: '20 %', value: 20 },
  { label: '30 %', value: 30 },
]

const VAT_RATE = 0.21
const VALIDITY_DAYS = '365'

const BUNDLE_NAMES_WRAP_AFTER_PLUS = [
  'Inzerát práce 30 + SuperBoost',
  'Inzerát práce 30 + Facebook',
  'Inzerát práce 30 + FIXACE 7 Plus',
  'Inzerát práce 30 + Banner do kraje',
]

const ITEM_NAMES_WRAP_BEFORE: Record<string, string> = {
  'Zobrazení nabídky práce v rámci celé ČR': ' v rámci celé ČR',
}

function formatItemNameForDisplay(
  name: string
): string | { wrap: true; line1: string; line2: string } {
  if (!name) return name
  const breakBefore = ITEM_NAMES_WRAP_BEFORE[name]
  if (breakBefore != null) {
    const idx = name.indexOf(breakBefore)
    if (idx !== -1) {
      return { wrap: true, line1: name.slice(0, idx).trimEnd(), line2: name.slice(idx).trimStart() }
    }
  }
  if (!BUNDLE_NAMES_WRAP_AFTER_PLUS.includes(name)) return name
  const idx = name.indexOf(' + ')
  if (idx === -1) return name
  const beforePlus = name.slice(0, idx)
  const afterPlus = name.slice(idx)
  return { wrap: true, line1: beforePlus, line2: afterPlus }
}

interface OrderItemsCartProps {
  onRequestClearCart: () => void
}

export default function OrderItemsCart({ onRequestClearCart }: OrderItemsCartProps) {
  const dphPanelId = useId()
  const { role } = useRole()
  const { cartItems, updateItemQuantity, updateItemDiscount, removeItem } = useCart()
  /** Admin = editovatelné buňky + sloupec Sleva. Žádná výjimka pro typ položky ani cenu 0 Kč. */
  const isAdmin = role === 'admin'
  const showDiscountColumn = isAdmin

  const [rowEdits, setRowEdits] = useState<Record<string, RowEdits>>({})
  const [editModal, setEditModal] = useState<{
    serviceId: string | null
    field: EditableField | null
  }>({ serviceId: null, field: null })

  /** Jedna logika pro všechny řádky – včetně „Služba na objednávku“ (cena 0 Kč). Žádný guard na nulovou cenu ani na typ položky. */
  const getDisplayValue = useCallback(
    (
      serviceId: string,
      field: EditableField,
      item: { name: string; unitPriceWithoutVat: number; quantity: number; discountPercent: number },
      totalWithoutVat: number
    ): string => {
      const edits = rowEdits[serviceId]
      const unitPrice = Number(item.unitPriceWithoutVat) || 0
      const total = Number(totalWithoutVat) || 0
      switch (field) {
        case 'itemName':
          return edits?.itemName ?? item.name
        case 'validity':
          return edits?.validity ?? VALIDITY_DAYS
        case 'unitPrice':
          return edits?.unitPrice ?? formatPriceCZK(unitPrice, 2)
        case 'totalWithoutVat':
          return edits?.totalWithoutVat ?? formatPriceCZK(total, 2)
        case 'budget':
          return edits?.budget ?? formatPriceCZK(total, 2)
        default:
          return ''
      }
    },
    [rowEdits]
  )

  const normalizedCartItems = cartItems.map((item) => ({
    ...item,
    validityDays: VALIDITY_DAYS,
    discountPercent: item.discountPercent ?? 0,
  }))

  const handleQuantityChange = (serviceId: string, delta: number) => {
    const item = cartItems.find((i) => i.serviceId === serviceId)
    if (!item) return
    const newQuantity = Math.max(0, item.quantity + delta)
    updateItemQuantity(serviceId, newQuantity)
  }

  const handleQuantityInput = (serviceId: string, value: string) => {
    const numValue = parseInt(value, 10)
    const newQuantity = Number.isNaN(numValue) || numValue < 0 ? 0 : numValue
    updateItemQuantity(serviceId, newQuantity)
  }

  const totals = normalizedCartItems.reduce(
    (acc, item) => {
      const totalWithoutVat =
        item.unitPriceWithoutVat * item.quantity * (1 - (item.discountPercent ?? 0) / 100)
      acc.totalWithoutVat += totalWithoutVat
      return acc
    },
    { totalWithoutVat: 0 }
  )

  const vat = totals.totalWithoutVat * VAT_RATE
  const totalWithVat = totals.totalWithoutVat + vat

  const itemCount = normalizedCartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="order-accordion-section rounded overflow-hidden shadow-sm order-accordion-section--open">
      <div
        className="premium-section-header w-100 d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 text-start order-items-cart-header"
        id="order-items-heading"
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded d-flex align-items-center justify-content-center flex-shrink-0 position-relative"
            style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
            aria-hidden
          >
            <ShoppingCart size={20} color="#1B3C98" aria-hidden />
            {itemCount > 0 && (
              <span className="order-items-cart-count-badge">{itemCount}</span>
            )}
          </div>
          <h2 className="premium-section-title mb-0">Položky objednávky</h2>
        </div>
        <div className="d-flex align-items-center gap-2">
          {normalizedCartItems.length > 0 && (
            <button
              type="button"
              className="btn btn-link text-danger p-0 d-flex align-items-center gap-1"
              onClick={onRequestClearCart}
              style={{ textDecoration: 'none' }}
            >
              <CircleX size={16} aria-hidden />
              <span className="small">Vymazat vše</span>
            </button>
          )}
        </div>
      </div>

      <div
        id="order-items-content"
        role="region"
        aria-labelledby="order-items-heading"
        className="premium-section-content premium-section-content--open"
      >
        {normalizedCartItems.length === 0 ? (
          <div className="order-items-cart-empty-state py-5 px-3 text-center">
            <div className="order-items-cart-empty-state-icon-wrap">
              <motion.div
                className="order-items-cart-empty-state-icon-inner"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              >
                <Package
                  className="order-items-cart-empty-state-package"
                  size={48}
                  color="#1B3C98"
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>
            <p className="text-muted mb-2 order-items-cart-empty-state-title">
              Vaše objednávka je zatím prázdná
            </p>
            <p className="small text-muted mb-3">
              Začněte výběrem služby nebo balíčku výše na stránce.
            </p>
            <button
              type="button"
              className="btn order-items-cart-browse-packages-btn"
              onClick={() => {
                const el = document.getElementById('top-packages')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              Prohlédnout balíčky
              <span className="order-items-cart-browse-packages-arrow" aria-hidden> ↑</span>
            </button>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table align-middle mb-0 order-items-cart table-order-items">
                <colgroup>
                  <col className="col-item" style={{ width: showDiscountColumn ? 'calc(22% - 16px)' : 'calc(46% - 16px)' }} />
                  {showDiscountColumn && <col className="col-discount" style={{ width: '24%' }} />}
                  <col className="col-validity" style={{ width: '7%' }} />
                  <col className="col-quantity" style={{ width: '9%' }} />
                  <col className="col-unit-price" style={{ width: '11%' }} />
                  <col className="col-total-without-vat" style={{ width: '11%' }} />
                  <col className="col-budget" style={{ width: '11%' }} />
                  <col className="col-actions" style={{ width: '7%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="col-item" style={{ textAlign: 'left' }}>
                      Položka
                    </th>
                    {showDiscountColumn && <th className="col-discount">Sleva</th>}
                    <th className="col-validity" style={{ textAlign: 'center' }}>
                      Platnost
                    </th>
                    <th className="col-quantity">Množství</th>
                    <th className="col-unit-price" style={{ textAlign: 'right' }}>
                      Cena za kus
                    </th>
                    <th className="col-total-without-vat" style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', textAlign: 'right' }}>Celkem bez DPH</span>
                    </th>
                    <th className="col-budget" style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', textAlign: 'right' }}>Celkový budget</span>
                    </th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Všechny řádky (včetně „Služba na objednávku“ s cenou 0 Kč) používají EditableCell stejně – Admin modré linky, Obchodník read-only */}
                  {normalizedCartItems.map((item) => {
                    const totalWithoutVat =
                      item.unitPriceWithoutVat *
                      item.quantity *
                      (1 - (item.discountPercent ?? 0) / 100)
                    return (
                      <tr key={item.serviceId}>
                        <td className="col-item">
                          {role === 'admin' && item.name === 'Služba na objednávku' ? (
                            <EditableCell
                              value={getDisplayValue(
                                item.serviceId,
                                'itemName',
                                item,
                                totalWithoutVat
                              )}
                              isEditable={true}
                              onEdit={() =>
                                setEditModal({ serviceId: item.serviceId, field: 'itemName' })
                              }
                              align="left"
                              valueClassName="item-name premium-service-title order-items-cart-item-name-link"
                            />
                          ) : (
                            <span className="item-name premium-service-title" style={{ fontSize: '16px' }}>
                              {(() => {
                                const formatted = formatItemNameForDisplay(item.name)
                                if (typeof formatted === 'string') return formatted
                                return (
                                  <>
                                    {formatted.line1}
                                    <br />
                                    {formatted.line2}
                                  </>
                                )
                              })()}
                            </span>
                          )}
                        </td>
                        {showDiscountColumn && (
                          <td className="col-discount">
                            <div
                              className="d-flex gap-1 align-items-center flex-nowrap"
                              role="group"
                              aria-label="Sleva"
                            >
                              {DISCOUNT_OPTIONS.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  className={`quantity-option ${item.discountPercent === option.value ? 'active' : ''}`}
                                  onClick={() => updateItemDiscount(item.serviceId, option.value)}
                                  aria-pressed={item.discountPercent === option.value}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </td>
                        )}
                        <td className="col-validity" style={{ textAlign: 'center' }}>
                          <EditableCell
                            value={getDisplayValue(
                              item.serviceId,
                              'validity',
                              item,
                              totalWithoutVat
                            )}
                            isEditable={role === 'admin'}
                            onEdit={() =>
                              setEditModal({ serviceId: item.serviceId, field: 'validity' })
                            }
                            align="center"
                            valueClassName="text-muted"
                          />
                        </td>
                        <td className="col-quantity">
                          <div className="stepper" role="group" aria-label="Počet">
                            <button
                              type="button"
                              className="stepper-btn"
                              onClick={() => handleQuantityChange(item.serviceId, -1)}
                              disabled={item.quantity <= 0}
                              aria-label="Snížit počet"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              className="stepper-input"
                              min={0}
                              value={item.quantity}
                              onChange={(e) => handleQuantityInput(item.serviceId, e.target.value)}
                              aria-label={`Počet: ${item.name}`}
                            />
                            <button
                              type="button"
                              className="stepper-btn"
                              onClick={() => handleQuantityChange(item.serviceId, 1)}
                              aria-label="Zvýšit počet"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="col-unit-price" style={{ textAlign: 'right' }}>
                          <EditableCell
                            value={getDisplayValue(
                              item.serviceId,
                              'unitPrice',
                              item,
                              totalWithoutVat
                            )}
                            isEditable={role === 'admin'}
                            onEdit={() =>
                              setEditModal({ serviceId: item.serviceId, field: 'unitPrice' })
                            }
                            align="right"
                            valueClassName="package-card-price"
                          />
                        </td>
                        <td className="col-total-without-vat" style={{ textAlign: 'right' }}>
                          <EditableCell
                            value={getDisplayValue(
                              item.serviceId,
                              'totalWithoutVat',
                              item,
                              totalWithoutVat
                            )}
                            isEditable={role === 'admin'}
                            onEdit={() =>
                              setEditModal({
                                serviceId: item.serviceId,
                                field: 'totalWithoutVat',
                              })
                            }
                            align="right"
                            valueClassName="package-card-price"
                          />
                        </td>
                        <td className="col-budget" style={{ textAlign: 'right' }}>
                          <EditableCell
                            value={getDisplayValue(
                              item.serviceId,
                              'budget',
                              item,
                              totalWithoutVat
                            )}
                            isEditable={role === 'admin'}
                            onEdit={() =>
                              setEditModal({ serviceId: item.serviceId, field: 'budget' })
                            }
                            align="right"
                            valueClassName="package-card-price"
                          />
                        </td>
                        <td className="col-actions" style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn btn-link text-danger p-0"
                            onClick={() => removeItem(item.serviceId)}
                            aria-label="Odstranit položku"
                            style={{ margin: '0 auto', display: 'block' }}
                          >
                            <CircleX size={16} aria-hidden />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <ValueEditModal
              open={editModal.serviceId != null && editModal.field != null}
              currentValue={
                editModal.serviceId && editModal.field
                  ? (() => {
                      const item = normalizedCartItems.find(
                        (i) => i.serviceId === editModal.serviceId
                      )
                      if (!item) return ''
                      const total =
                        item.unitPriceWithoutVat *
                        item.quantity *
                        (1 - (item.discountPercent ?? 0) / 100)
                      return getDisplayValue(
                        editModal.serviceId,
                        editModal.field,
                        item,
                        total
                      )
                    })()
                  : ''
              }
              onConfirm={(newValue) => {
                const serviceId = editModal.serviceId
                const field = editModal.field
                if (serviceId == null || field == null) return
                setRowEdits((prev) => ({
                  ...prev,
                  [serviceId]: {
                    ...prev[serviceId],
                    [field]: newValue,
                  },
                }))
                setEditModal({ serviceId: null, field: null })
              }}
              onClose={() => setEditModal({ serviceId: null, field: null })}
            />
            <div className="order-items-cart-footer-wrapper">
              <div className="order-items-cart-footer-row">
                <div className="order-items-cart-footer-block">
                  <div className="order-items-cart-footer-label">Celkem bez DPH</div>
                  <div className="order-items-cart-footer-value">
                    {formatPriceCZK(totals.totalWithoutVat, 2)}
                  </div>
                </div>

                <div className="order-items-cart-footer-block">
                  <div className="order-items-cart-footer-label d-flex align-items-center gap-2">
                    DPH
                    <span className="dph-info-trigger">
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 align-middle text-secondary order-items-cart-info-icon dph-info-button"
                        aria-label="Informace o DPH"
                        aria-describedby={dphPanelId}
                      >
                        <Info size={14} strokeWidth={2} aria-hidden />
                      </button>
                      <span id={dphPanelId} className="dph-info-panel" role="tooltip">
                        {DPH_INFO_TEXT}
                      </span>
                    </span>
                  </div>
                  <div className="order-items-cart-footer-value">{formatPriceCZK(vat, 2)}</div>
                </div>

                <div className="order-items-cart-footer-block order-items-cart-footer-block--total">
                  <div className="order-items-cart-footer-label">Celkem k zaplacení</div>
                  <div className="order-items-cart-footer-value order-items-cart-footer-value--total">
                    {formatPriceCZK(totalWithVat, 2)}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
