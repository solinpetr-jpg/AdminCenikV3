import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Přidat nebo aktualizovat položku v košíku
  const addOrUpdateItem = useCallback((item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.serviceId === item.serviceId)
      // Vždy nastavit validityDays na '365'
      const normalizedItem = { ...item, validityDays: '365' }
      if (existingIndex >= 0) {
        // Aktualizovat existující položku
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], ...normalizedItem }
        return updated
      } else {
        // Přidat novou položku
        return [...prev, normalizedItem]
      }
    })
  })

  // Odstranit položku z košíku
  const removeItem = useCallback((serviceId) => {
    setCartItems((prev) => prev.filter((item) => item.serviceId !== serviceId))
  })

  // Aktualizovat množství položky
  const updateItemQuantity = useCallback((serviceId, quantity) => {
    if (quantity <= 0) {
      // Odstranit položku pokud je množství 0
      removeItem(serviceId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId ? { ...item, quantity, validityDays: '365' } : item
      )
    )
  }, [removeItem])

  // Aktualizovat slevu položky
  const updateItemDiscount = useCallback((serviceId, discountPercent) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId ? { ...item, discountPercent, validityDays: '365' } : item
      )
    )
  })

  // Vymazat celý košík
  const clearCart = useCallback(() => {
    setCartItems([])
  })

  // Získat množství položky podle serviceId
  const getItemQuantity = useCallback(
    (serviceId) => {
      const item = cartItems.find((i) => i.serviceId === serviceId)
      return item?.quantity || 0
    },
    [cartItems]
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addOrUpdateItem,
        updateItemQuantity,
        updateItemDiscount,
        removeItem,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
