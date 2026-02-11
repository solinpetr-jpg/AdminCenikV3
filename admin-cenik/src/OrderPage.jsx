import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Crown, FileText, Receipt, ShoppingCart, Gift, FileCheck, FileX, Save } from 'lucide-react'
import TopPackagesSection from './TopPackagesSection.jsx'
import PremiumServicesAccordion from './PremiumServicesAccordion.jsx'
import OrderAccordionSection from './OrderAccordionSection.jsx'
import BasicAdsSectionContent from './BasicAdsSectionContent.jsx'
import OrderItemsCart from './OrderItemsCart.jsx'
import { useCart } from './contexts/CartContext.jsx'
import { formatPriceCZK } from './utils/pricing.js'
import { pluralPoložka } from './utils/czechPlural.js'

const CATEGORY_ICON_PROPS = { size: 20, color: '#1B3C98' }

const VARIANT_DISCOUNT_OPTIONS = [
  { label: 'Bez slevy', value: 0 },
  { label: '10 %', value: 10 },
  { label: '15 %', value: 15 },
  { label: '20 %', value: 20 },
  { label: '30 %', value: 30 },
]

const Chevron = ({ expanded }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-secondary"
    aria-hidden
    style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
  >
    <path
      d="M5 12.5L10 7.5L15 12.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function OrderPage() {
  const { cartItems, addOrUpdateItem, clearCart } = useCart()
  const [billingExpanded, setBillingExpanded] = useState(false)
  const [isSaveOfferModalOpen, setIsSaveOfferModalOpen] = useState(false)
  const [isSendOfferModalOpen, setIsSendOfferModalOpen] = useState(false)
  const [isMaxVariantsLimitModalOpen, setIsMaxVariantsLimitModalOpen] = useState(false)
  const [isDeleteVariantModalOpen, setIsDeleteVariantModalOpen] = useState(false)
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false)
  const [pendingDeleteVariantId, setPendingDeleteVariantId] = useState(null)
  const [variantName, setVariantName] = useState('Varianta 1')
  const [variantNote, setVariantNote] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [selectedVariantIds, setSelectedVariantIds] = useState([])
  const [uiToasts, setUiToasts] = useState([])
  const [savedVariants, setSavedVariants] = useState([])
  const [expandedVariantIds, setExpandedVariantIds] = useState([])
  const [openVariantMenuId, setOpenVariantMenuId] = useState(null)
  const variantMenuRef = useRef(null)

  const hasOrderItems = cartItems.some((item) => item.quantity > 0)

  const activeCartItems = cartItems.filter((item) => item.quantity > 0)
  const cartItemCount = activeCartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartItemsNames = activeCartItems.map((item) => item.name)
  const cartTotalWithoutVat = activeCartItems.reduce(
    (sum, item) =>
      sum + item.unitPriceWithoutVat * item.quantity * (1 - (item.discountPercent || 0) / 100),
    0
  )

  let orderItemsSummary = ''
  if (cartItemsNames.length === 0) {
    orderItemsSummary = 'Košík je prázdný'
  } else if (cartItemsNames.length === 1) {
    orderItemsSummary = cartItemsNames[0]
  } else if (cartItemsNames.length === 2) {
    orderItemsSummary = `${cartItemsNames[0]}, ${cartItemsNames[1]}`
  } else {
    orderItemsSummary = `${cartItemsNames[0]}, ${cartItemsNames[1]}…`
  }
  const remainingNoteChars = 150 - variantNote.length
  const canSaveVariant =
    hasOrderItems &&
    variantName.trim().length > 0 &&
    variantNote.length <= 150 &&
    savedVariants.length < 3
  const hasSavedVariants = savedVariants.length > 0
  const isClientEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())
  const canSendOffer = isClientEmailValid && selectedVariantIds.length > 0

  /* Lišta se zobrazí jen když jsme NAD sekcí Položky objednávky (sekce je pod viewportem). Na sekci nebo pod ní = skrytá. */
  const [isOrderItemsReached, setIsOrderItemsReached] = useState(false)

  useEffect(() => {
    setSavedVariants((prev) => {
      const filtered = prev.filter((variant) => variant.items.length > 0)
      return filtered.length === prev.length ? prev : filtered
    })
  }, [savedVariants])

  useEffect(() => {
    setExpandedVariantIds((prev) => {
      const validIds = new Set(savedVariants.map((variant) => variant.id))
      const filtered = prev.filter((id) => validIds.has(id))
      return filtered.length === prev.length ? prev : filtered
    })
  }, [savedVariants])

  useEffect(() => {
    if (!openVariantMenuId) return undefined
    const handleClickOutside = (event) => {
      if (variantMenuRef.current && !variantMenuRef.current.contains(event.target)) {
        setOpenVariantMenuId(null)
      }
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenVariantMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openVariantMenuId])

  useEffect(() => {
    const target = document.getElementById('order-items-heading')
    if (!target) return undefined

    const check = () => {
      const rect = target.getBoundingClientRect()
      const viewportBottom = window.innerHeight
      const reached = rect.top <= viewportBottom
      setIsOrderItemsReached(reached)
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)

    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  const openSaveOfferModal = () => {
    if (!hasOrderItems) return
    if (savedVariants.length >= 3) {
      setIsMaxVariantsLimitModalOpen(true)
      return
    }
    setVariantName(`Varianta ${savedVariants.length + 1}`)
    setVariantNote('')
    setIsSaveOfferModalOpen(true)
  }

  const closeSaveOfferModal = () => {
    setIsSaveOfferModalOpen(false)
  }

  const openSendOfferModal = () => {
    if (!hasSavedVariants) return
    setClientEmail('')
    setSelectedVariantIds([])
    setIsSendOfferModalOpen(true)
  }

  const closeSendOfferModal = () => {
    setIsSendOfferModalOpen(false)
  }

  const pushToast = (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setUiToasts((prev) => [...prev, { id, ...toast }])
    window.setTimeout(() => {
      setUiToasts((prev) => prev.filter((item) => item.id !== id))
    }, 5000)
  }

  const handleSaveOfferVariant = () => {
    if (!canSaveVariant) return

    const newVariantId = `variant-${Date.now()}`
    const snapshotItems = cartItems.map((item) => ({
      serviceId: item.serviceId,
      name: item.name,
      quantity: item.quantity,
      discountPercent: item.discountPercent,
      unitPriceWithoutVat: item.unitPriceWithoutVat,
      validityDays: '365',
    }))

    setSavedVariants((prev) => [
      ...prev,
      {
        id: newVariantId,
        name: variantName.trim(),
        note: variantNote.trim(),
        items: snapshotItems,
        sentToClient: false,
        addedToOrder: false,
      },
    ])
    setIsSaveOfferModalOpen(false)
    pushToast({
      title: 'Varianta uložena',
      message: `Varianta „${variantName.trim()}“ byla uložena.`,
    })
  }

  const toggleSavedVariant = (variantId) => {
    setExpandedVariantIds((prev) =>
      prev.includes(variantId) ? prev.filter((id) => id !== variantId) : [...prev, variantId]
    )
  }

  const closeDeleteVariantModal = () => {
    setIsDeleteVariantModalOpen(false)
    setPendingDeleteVariantId(null)
  }

  const deleteSavedVariant = (variantId) => {
    setSavedVariants((prev) => prev.filter((variant) => variant.id !== variantId))
    setExpandedVariantIds((prev) => prev.filter((id) => id !== variantId))
  }

  const confirmDeleteVariant = () => {
    if (!pendingDeleteVariantId) return
    const deletedVariant = savedVariants.find((variant) => variant.id === pendingDeleteVariantId)
    deleteSavedVariant(pendingDeleteVariantId)
    closeDeleteVariantModal()
    pushToast({
      title: 'Varianta smazána',
      message: `Varianta ${deletedVariant?.name ?? ''} byla úspěšně smazána.`,
    })
  }

  const openVariantDeleteMenuAction = (variantId) => {
    setOpenVariantMenuId(null)
    setPendingDeleteVariantId(variantId)
    setIsDeleteVariantModalOpen(true)
  }

  const toggleVariantForSend = (variantId) => {
    setSelectedVariantIds((prev) =>
      prev.includes(variantId) ? prev.filter((id) => id !== variantId) : [...prev, variantId]
    )
  }

  const handleSendOffer = () => {
    if (!canSendOffer) return
    const selectedCount = selectedVariantIds.length
    const variantWord =
      selectedCount === 1 ? 'varianta' : selectedCount >= 2 && selectedCount <= 4 ? 'varianty' : 'variant'

    setSavedVariants((prev) =>
      prev.map((variant) =>
        selectedVariantIds.includes(variant.id)
          ? { ...variant, sentToClient: true, addedToOrder: false }
          : variant
      )
    )
    pushToast({
      title: 'Nabídka odeslána',
      message: `Cenová nabídka (${selectedCount} ${variantWord}) byla odeslána na ${clientEmail.trim()}.`,
    })
    setIsSendOfferModalOpen(false)
    setClientEmail('')
    setSelectedVariantIds([])
  }

  const handleCreateOrder = () => {
    if (!hasOrderItems) return
    pushToast({
      title: 'Objednávka vytvořena',
      message: 'Objednávka byla úspěšně vytvořena.',
    })
  }

  const updateSavedVariantItem = (variantId, serviceId, updater) => {
    setSavedVariants((prev) =>
      prev.map((variant) => {
        if (variant.id !== variantId) return variant
        const updatedItems = variant.items
          .map((item) => (item.serviceId === serviceId ? updater(item) : item))
          .filter((item) => item.quantity > 0)
        return { ...variant, items: updatedItems }
      })
    )
  }

  const handleSavedVariantQuantityChange = (variantId, serviceId, delta) => {
    const variant = savedVariants.find((savedVariant) => savedVariant.id === variantId)
    if (!variant) return

    const item = variant.items.find((savedItem) => savedItem.serviceId === serviceId)
    if (!item) return

    const nextQuantity = Math.max(0, item.quantity + delta)
    if (nextQuantity > 0) {
      updateSavedVariantItem(variantId, serviceId, (currentItem) => ({
        ...currentItem,
        quantity: nextQuantity,
      }))
      return
    }

    if (variant.items.length === 1) {
      setPendingDeleteVariantId(variantId)
      setIsDeleteVariantModalOpen(true)
      return
    }

    setSavedVariants((prev) =>
      prev.map((savedVariant) => {
        if (savedVariant.id !== variantId) return savedVariant
        return {
          ...savedVariant,
          items: savedVariant.items.filter((savedItem) => savedItem.serviceId !== serviceId),
        }
      })
    )
  }

  const handleSavedVariantDiscountChange = (variantId, serviceId, discountPercent) => {
    updateSavedVariantItem(variantId, serviceId, (item) => ({
      ...item,
      discountPercent,
    }))
  }

  const applySavedVariant = (variant) => {
    clearCart()
    variant.items.forEach((item) => {
      addOrUpdateItem(item)
    })
    setSavedVariants((prev) =>
      prev.map((savedVariant) => ({
        ...savedVariant,
        addedToOrder: savedVariant.id === variant.id,
        sentToClient: savedVariant.id === variant.id ? false : savedVariant.sentToClient,
      }))
    )
    pushToast({
      title: 'Varianta přidána',
      message: `Varianta ${variant.name} byla přidána do objednávky.`,
    })
  }

  return (
    <main className="min-vh-100 bg-light">
      <div className="container order-page-container pt-4 pt-md-5">
        <h1 className="order-page-title mb-2">Objednávka služeb</h1>
        <p className="order-page-subtitle mb-4 mb-md-5">
          Vyberte si z našich balíčků a služeb pro efektivní nábor zaměstnanců
        </p>

        <section id="top-packages">
          <div className="row align-items-center mb-3">
            <div className="col-auto">
              <div
                className="rounded d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
                aria-hidden
              >
                <Crown {...CATEGORY_ICON_PROPS} aria-hidden />
              </div>
            </div>
            <div className="col">
              <h2 className="heading-h2 mb-0">TOP balíčky</h2>
            </div>
          </div>
          <TopPackagesSection />
        </section>

        <section className="order-page-section-gap">
          <PremiumServicesAccordion />
        </section>

        <section className="order-page-section-gap">
          <OrderAccordionSection
            id="zakladni-inzerce"
            title="Základní inzerce pro Práci"
            iconType="document"
            itemCount={5}
          >
            <BasicAdsSectionContent />
          </OrderAccordionSection>
        </section>

        <section className="order-page-section-gap">
          <OrderAccordionSection
            id="brigady"
            title="Brigády"
            iconType="briefcase"
            itemCount={8}
          >
            <div className="py-3 px-3 premium-service-row">
              <span className="premium-service-title text-muted">Obsah sekce bude doplněn</span>
            </div>
          </OrderAccordionSection>
        </section>

        <section className="order-page-section-gap">
          <OrderAccordionSection
            id="dalsi-produkty"
            title="Další produkty"
            iconType="puzzle"
            itemCount={7}
          >
            <div className="py-3 px-3 premium-service-row">
              <span className="premium-service-title text-muted">Obsah sekce bude doplněn</span>
            </div>
          </OrderAccordionSection>
        </section>

        <section className="order-page-section-gap">
          <OrderItemsCart onRequestClearCart={() => setIsClearCartModalOpen(true)} />
        </section>

        {savedVariants.length > 0 && (
          <section className="order-page-section-gap saved-offers-section">
            <div className="saved-offers-header">
              <div className="saved-offers-title-wrap">
                <span className="saved-offers-title">Uložené varianty nabídky</span>
                <span className="saved-offers-count">{savedVariants.length}/3</span>
              </div>
            </div>

            <div className="saved-offers-list">
              {savedVariants.map((variant, index) => {
                const variantItemCount = variant.items.reduce((sum, item) => sum + item.quantity, 0)
                return (
                <article
                  key={variant.id}
                  className={`saved-offer-card saved-offer-accordion ${expandedVariantIds.includes(variant.id) ? 'saved-offer-accordion--open' : ''}`}
                >
                  <div
                    className="saved-offer-accordion-header"
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedVariantIds.includes(variant.id)}
                    aria-controls={`saved-variant-content-${variant.id}`}
                    aria-label={expandedVariantIds.includes(variant.id) ? 'Sbalit variantu' : 'Rozbalit variantu'}
                    onClick={() => toggleSavedVariant(variant.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleSavedVariant(variant.id)
                      }
                    }}
                  >
                    <div className="saved-offer-card-left">
                      <span className="saved-offer-index-badge">{index + 1}</span>
                      <div className="saved-offer-meta">
                        <div className="saved-offer-name-row">
                          <h3 className="saved-offer-name heading-h2">{variant.name}</h3>
                          <div className="saved-offer-badges-slot" aria-hidden="true">
                            {!variant.sentToClient && variant.addedToOrder && (
                              <span className="saved-offer-added-badge premium-service-order-badge">
                                Přidáno do objednávky
                              </span>
                            )}
                            {variant.sentToClient && (
                              <span className="saved-offer-sent-badge premium-service-order-badge">
                                Odesláno klientovi
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="saved-offer-items mb-0">{variantItemCount} {pluralPoložka(variantItemCount)}</p>
                        <p className="saved-offer-price package-card-price mb-0">
                          {formatPriceCZK(
                            variant.items.reduce(
                              (sum, item) => sum + item.unitPriceWithoutVat * item.quantity * (1 - item.discountPercent / 100),
                              0
                            )
                          )}{' '}
                          <span>bez DPH</span>
                        </p>
                      </div>
                    </div>

                    <div className="saved-offer-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="btn saved-offer-apply-btn"
                        onClick={() => applySavedVariant(variant)}
                      >
                        <i className="bi bi-cart" aria-hidden="true"></i>
                        Přidat do objednávky
                      </button>

                      <button
                        type="button"
                        className="btn saved-offer-icon-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSavedVariant(variant.id)
                        }}
                        aria-label={expandedVariantIds.includes(variant.id) ? 'Sbalit variantu' : 'Rozbalit variantu'}
                      >
                        <Chevron expanded={expandedVariantIds.includes(variant.id)} />
                      </button>

                      <div className="saved-offer-menu-wrapper" ref={openVariantMenuId === variant.id ? variantMenuRef : null}>
                        <button
                          type="button"
                          className="btn saved-offer-icon-btn"
                          aria-label="Další akce"
                          aria-haspopup="menu"
                          aria-expanded={openVariantMenuId === variant.id}
                          onClick={() =>
                            setOpenVariantMenuId((current) => (current === variant.id ? null : variant.id))
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                          </svg>
                        </button>
                        {openVariantMenuId === variant.id && (
                          <div className="saved-offer-dropdown-menu" role="menu">
                            <button
                              type="button"
                              className="saved-offer-dropdown-item saved-offer-dropdown-item--danger"
                              role="menuitem"
                              onClick={() => openVariantDeleteMenuAction(variant.id)}
                            >
                              <i className="bi bi-trash" aria-hidden="true"></i>
                              Smazat objednávku
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedVariantIds.includes(variant.id) && (
                    <div id={`saved-variant-content-${variant.id}`} className="saved-offer-accordion-content">
                      <div className="saved-offer-variant-items-title">Položky varianty {index + 1}</div>

                      <div className="saved-offer-items-list">
                        {variant.items.map((item) => {
                          const itemTotal = item.unitPriceWithoutVat * item.quantity * (1 - item.discountPercent / 100)
                          return (
                            <div key={`${variant.id}-${item.serviceId}`} className="saved-offer-item-row">
                              <div className="saved-offer-item-main">
                                <div className="saved-offer-item-name premium-service-title">{item.name}</div>
                                <div className="saved-offer-item-unit-price">{formatPriceCZK(item.unitPriceWithoutVat)}/ks</div>
                              </div>

                              <div className="saved-offer-item-controls">
                                <div className="stepper" role="group" aria-label={`Množství položky ${item.name}`}>
                                  <button
                                    type="button"
                                    className="stepper-btn"
                                    onClick={() => handleSavedVariantQuantityChange(variant.id, item.serviceId, -1)}
                                    aria-label="Snížit počet"
                                  >
                                    −
                                  </button>
                                  <input
                                    type="number"
                                    className="stepper-input"
                                    min={0}
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <button
                                    type="button"
                                    className="stepper-btn"
                                    onClick={() => handleSavedVariantQuantityChange(variant.id, item.serviceId, 1)}
                                    aria-label="Zvýšit počet"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="saved-offer-item-total package-card-price">{formatPriceCZK(itemTotal)}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <div className="saved-offer-total-row">
                        <span>Celkem bez DPH</span>
                        <strong className="package-card-price">
                          {formatPriceCZK(
                            variant.items.reduce(
                              (sum, item) => sum + item.unitPriceWithoutVat * item.quantity * (1 - item.discountPercent / 100),
                              0
                            )
                          )}
                        </strong>
                      </div>
                    </div>
                  )}
                </article>
              );
              })}
            </div>
          </section>
        )}

        {/* Fakturační údaje */}
        <section className="order-page-section-gap">
          <div className={`order-accordion-section rounded overflow-hidden shadow-sm ${billingExpanded ? 'order-accordion-section--open' : ''}`}>
            <button
              type="button"
              className="premium-section-header w-100 d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 text-start"
              onClick={() => setBillingExpanded((e) => !e)}
              aria-expanded={billingExpanded}
              aria-controls="billing-content"
              id="billing-heading"
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
                  aria-hidden
                >
                  <Receipt {...CATEGORY_ICON_PROPS} aria-hidden />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h2 className="premium-section-title mb-0">Fakturační údaje</h2>
                  <span className="premium-section-summary" style={{ marginTop: '0', marginBottom: '0' }}>
                    Vyžadováno pro vytvoření objednávky
                  </span>
                </div>
              </div>
              <Chevron expanded={billingExpanded} />
            </button>

            {/* Formulář */}
            <div
              id="billing-content"
              role="region"
              aria-labelledby="billing-heading"
              className={`premium-section-content ${billingExpanded ? 'premium-section-content--open' : ''}`}
            >
              <form className="py-3">
                {/* Firma či jméno */}
                <div className="mb-3">
                  <label className="form-label">
                    Firma či jméno <span className="text-danger">*</span>
                  </label>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Lead - HR Services s.r.o."
                        required
                      />
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="fillCompanyDetails"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="fillCompanyDetails">
                          Vyplnit firemní údaje (IČO, DIČ)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IČO a DIČ */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      IČO <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="09415637"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      DIČ <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="CZ09415637"
                      required
                    />
                  </div>
                </div>

                {/* Ulice a Město */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Ulice a č.p. <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Zvonářka 408/16"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Město <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Brno"
                      required
                    />
                  </div>
                </div>

                {/* PSČ a Stát */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      PSČ <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="61700"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Stát <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" defaultValue="CZ" required>
                      <option value="CZ">Česká republika</option>
                      <option value="SK">Slovensko</option>
                    </select>
                  </div>
                </div>

                {/* E-mail a Telefon */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      E-mail <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue="nela.hrazdirova@lead-project.cz"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Telefon <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      defaultValue="+420739665967"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {hasOrderItems && !isOrderItemsReached &&
          createPortal(
            <div className="order-items-bottom-bar" role="banner">
              <div className="order-items-bottom-bar-inner">
                <div className="order-items-bottom-bar-left">
                  <div className="order-items-bottom-bar-icon-wrapper position-relative">
                    <ShoppingCart {...CATEGORY_ICON_PROPS} aria-hidden />
                    {cartItemCount > 0 && (
                      <span className="order-items-bottom-bar-count-badge">{cartItemCount}</span>
                    )}
                  </div>
                  <div className="order-items-bottom-bar-text">
                    <div className="order-items-bottom-bar-title">Položky objednávky</div>
                    <div
                      className="order-items-bottom-bar-subtitle text-truncate"
                      title={cartItemsNames.join(', ')}
                    >
                      {orderItemsSummary}
                    </div>
                  </div>
                </div>

                <div className="order-items-bottom-bar-right">
                  <div className="order-items-bottom-bar-price">
                    <span className="order-items-bottom-bar-price-value">{formatPriceCZK(cartTotalWithoutVat, 2)}</span>
                    <span className="order-items-bottom-bar-price-label">bez DPH</span>
                  </div>
                  <button
                    type="button"
                    className="btn order-items-bottom-bar-button"
                    onClick={() => {
                      const headingEl = document.getElementById('order-items-heading')
                      if (headingEl) {
                        headingEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }}
                  >
                    Zobrazit detail
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none" className="ms-2" aria-hidden>
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>,
            document.getElementById('order-items-bar-root') ?? document.body
          )}

        {/* Možnosti objednávky */}
        <section className="order-page-section-gap">
          <div className="order-accordion-section rounded overflow-hidden shadow-sm order-accordion-section--open">
            <div
              className="premium-section-header w-100 d-flex align-items-center justify-content-between flex-wrap gap-2"
              id="options-heading"
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
                  aria-hidden
                >
                  <FileText {...CATEGORY_ICON_PROPS} aria-hidden />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h2 className="premium-section-title mb-0">Možnosti objednávky</h2>
                  <span className="premium-section-summary" style={{ marginTop: '0', marginBottom: '0' }}>
                    Vyžadováno pro vytvoření objednávky
                  </span>
                </div>
              </div>
            </div>
              
            {/* Označení objednávky */}
            <div
              id="options-content"
              role="region"
              aria-labelledby="options-heading"
              className="premium-section-content premium-section-content--open"
            >
              <div className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                <div className="mb-4">
                <label className="form-label d-flex align-items-center">
                  Označení objednávky
                </label>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Např. Kampaň Q1 2025"
                      />
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        title="Uložit"
                        aria-label="Uložit"
                      >
                        <Save size={20} color="#dc3545" aria-hidden />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Možnosti */}
              <div className="d-flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                >
                  <Gift size={18} strokeWidth={2} aria-hidden />
                  Darovat zdarma
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                >
                  <FileCheck size={18} strokeWidth={2} aria-hidden />
                  S konečnou fakturou
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                >
                  <FileX size={18} strokeWidth={2} aria-hidden />
                  Bez faktury
                </button>
              </div>
                </div>
              </div>
            </div>
        </section>

        {/* Tlačítka akcí */}
        <section className="order-page-section-gap order-actions-section">
          <div className="d-flex justify-content-end gap-4 order-actions-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary order-action-btn-secondary d-flex align-items-center"
              onClick={openSaveOfferModal}
              disabled={!hasOrderItems}
              aria-disabled={!hasOrderItems}
            >
              {/* Font Awesome 6 Regular - File Lines (fa-file-lines) - outline */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
                <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm48 256a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm112-16H144c-8.8 0-16 7.2-16 16s7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16zm0 64H144c-8.8 0-16 7.2-16 16s7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16zm0 64H144c-8.8 0-16 7.2-16 16s7.2 16 16 16h80c8.8 0 16-7.2 16-16s-7.2-16-16-16z"/>
              </svg>
              Uložit cenovou nabídku
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary order-action-btn-secondary d-flex align-items-center"
              disabled={!hasSavedVariants}
              aria-disabled={!hasSavedVariants}
              onClick={openSendOfferModal}
            >
              {/* Font Awesome 6 Solid - Arrow Right (fa-arrow-right) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
              </svg>
              Odeslat cenovou nabídku
            </button>
            <button
              type="button"
              className="btn btn-primary order-action-btn-primary d-flex align-items-center"
              disabled={!hasOrderItems}
              aria-disabled={!hasOrderItems}
              onClick={handleCreateOrder}
            >
              Vytvořit objednávku
            </button>
          </div>
        </section>
      </div>

      {uiToasts.length > 0 && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1400 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {uiToasts.map((toast) => (
            <div key={toast.id} className="toast show border-0 shadow-sm" role="status">
              <div className="d-flex align-items-start">
                <div className="toast-body pe-2">
                  <div className="fw-semibold mb-1">{toast.title}</div>
                  <div className="text-secondary">{toast.message}</div>
                </div>
                <button
                  type="button"
                  className="btn-close me-2 mt-2"
                  aria-label="Zavřít"
                  onClick={() => setUiToasts((prev) => prev.filter((item) => item.id !== toast.id))}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isClearCartModalOpen && (
        <div
          className="delete-variant-modal-backdrop"
          role="presentation"
          onClick={() => setIsClearCartModalOpen(false)}
        >
          <div
            className="delete-variant-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-cart-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="clear-cart-modal-title" className="delete-variant-modal-title">
              Vymazat všechny položky?
            </h3>
            <p className="delete-variant-modal-text">
              Tato akce odstraní všechny položky z aktuální objednávky. Uložené varianty nabídek zůstanou nedotčeny.
            </p>
            <div className="delete-variant-modal-actions">
              <button
                type="button"
                className="btn delete-variant-modal-cancel"
                onClick={() => setIsClearCartModalOpen(false)}
              >
                Zrušit
              </button>
              <button
                type="button"
                className="btn delete-variant-modal-confirm"
                onClick={() => {
                  clearCart()
                  setIsClearCartModalOpen(false)
                }}
              >
                Vymazat vše
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteVariantModalOpen && (
        <div
          className="delete-variant-modal-backdrop"
          role="presentation"
          onClick={closeDeleteVariantModal}
        >
          <div
            className="delete-variant-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-variant-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="delete-variant-modal-title" className="delete-variant-modal-title">
              Smazat objednávku?
            </h3>
            <p className="delete-variant-modal-text">
              Tato objednávka obsahuje poslední položku. Jejím odebráním se smaže celá varianta.
            </p>
            <div className="delete-variant-modal-actions">
              <button
                type="button"
                className="btn delete-variant-modal-cancel"
                onClick={closeDeleteVariantModal}
              >
                Zrušit
              </button>
              <button
                type="button"
                className="btn delete-variant-modal-confirm"
                onClick={confirmDeleteVariant}
              >
                Smazat objednávku
              </button>
            </div>
          </div>
        </div>
      )}

      {isSendOfferModalOpen && (
        <div
          className="send-offer-modal-backdrop"
          role="presentation"
          onClick={closeSendOfferModal}
        >
          <div
            className="send-offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="send-offer-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="send-offer-modal-header">
              <div>
                <h3 id="send-offer-modal-title" className="send-offer-modal-title">
                  Odeslat cenovou nabídku
                </h3>
                <p className="send-offer-modal-subtitle">
                  Vyberte varianty, které chcete odeslat klientovi k porovnání.
                </p>
              </div>
              <button
                type="button"
                className="send-offer-modal-close"
                onClick={closeSendOfferModal}
                aria-label="Zavřít"
              >
                ×
              </button>
            </div>

            <div className="send-offer-modal-body">
              <label htmlFor="client-email-input" className="send-offer-label">
                E-mail klienta
              </label>
              <input
                id="client-email-input"
                type="email"
                className="form-control send-offer-input"
                placeholder="klient@firma.cz"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />

              <div className="send-offer-variants-label">Varianty k odeslání</div>
              <div className="send-offer-variants-list">
                {savedVariants.map((variant) => {
                  const itemCount = variant.items.reduce((sum, item) => sum + item.quantity, 0)
                  const totalWithoutVat = variant.items.reduce(
                    (sum, item) =>
                      sum + item.unitPriceWithoutVat * item.quantity * (1 - item.discountPercent / 100),
                    0
                  )
                  const isSelected = selectedVariantIds.includes(variant.id)

                  return (
                    <label key={variant.id} className={`send-offer-variant-item ${isSelected ? 'send-offer-variant-item--selected' : ''}`}>
                      <input
                        type="checkbox"
                        className="form-check-input send-offer-variant-checkbox"
                        checked={isSelected}
                        onChange={() => toggleVariantForSend(variant.id)}
                      />
                      <span className="send-offer-variant-content">
                        <span className="send-offer-variant-name">{variant.name}</span>
                        <span className="send-offer-variant-meta">
                          {itemCount} {pluralPoložka(itemCount)} • {formatPriceCZK(totalWithoutVat)}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="send-offer-modal-footer">
              <button type="button" className="btn send-offer-btn-cancel" onClick={closeSendOfferModal}>
                Zrušit
              </button>
              <button
                type="button"
                className="btn send-offer-btn-primary"
                disabled={!canSendOffer}
                onClick={handleSendOffer}
              >
                Odeslat ({selectedVariantIds.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {isMaxVariantsLimitModalOpen && (
        <div
          className="save-offer-modal-backdrop"
          role="presentation"
          onClick={() => setIsMaxVariantsLimitModalOpen(false)}
        >
          <div
            className="save-offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="max-variants-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="save-offer-modal-header">
              <div className="save-offer-modal-title-wrap">
                <div>
                  <h3 id="max-variants-modal-title" className="save-offer-modal-title">
                    Uložit variantu nabídky
                  </h3>
                  <p className="save-offer-modal-subtitle">
                    Dosáhli jste maximálního počtu variant (3). Odstraňte existující variantu pro uložení nové.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="save-offer-modal-close"
                onClick={() => setIsMaxVariantsLimitModalOpen(false)}
                aria-label="Zavřít"
              >
                ×
              </button>
            </div>

            <div className="save-offer-modal-footer">
              <button
                type="button"
                className="btn save-offer-btn-cancel"
                onClick={() => setIsMaxVariantsLimitModalOpen(false)}
              >
                Zrušit
              </button>
            </div>
          </div>
        </div>
      )}

      {isSaveOfferModalOpen && (
        <div
          className="save-offer-modal-backdrop"
          role="presentation"
          onClick={closeSaveOfferModal}
        >
          <div
            className="save-offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-offer-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="save-offer-modal-header">
              <div className="save-offer-modal-title-wrap">
                <div>
                  <h3 id="save-offer-modal-title" className="save-offer-modal-title">Uložit variantu nabídky</h3>
                  <p className="save-offer-modal-subtitle">Uložte aktuální výběr produktů jako variantu cenové nabídky.</p>
                </div>
              </div>
              <button type="button" className="save-offer-modal-close" onClick={closeSaveOfferModal} aria-label="Zavřít">
                ×
              </button>
            </div>

            <div className="save-offer-modal-body">
              <label htmlFor="variant-name-input" className="save-offer-label">Název varianty</label>
              <input
                id="variant-name-input"
                type="text"
                className="form-control save-offer-input"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
              />

              <label htmlFor="variant-note-input" className="save-offer-label">
                Poznámka <span className="save-offer-optional">(volitelná)</span>
              </label>
              <textarea
                id="variant-note-input"
                className="form-control save-offer-textarea"
                placeholder="Interní poznámka k variantě..."
                value={variantNote}
                onChange={(e) => setVariantNote(e.target.value.slice(0, 150))}
              />
              <div className="save-offer-note-counter">{remainingNoteChars}/150</div>

              <div className="save-offer-saved-count">Uloženo variant: {savedVariants.length}/3</div>
            </div>

            <div className="save-offer-modal-footer">
              <button type="button" className="btn save-offer-btn-cancel" onClick={closeSaveOfferModal}>
                Zrušit
              </button>
              <button
                type="button"
                className="btn save-offer-btn-primary"
                onClick={handleSaveOfferVariant}
                disabled={!canSaveVariant}
              >
                Uložit variantu
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
