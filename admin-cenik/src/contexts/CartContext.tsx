import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem } from '../types'

export type CartContextValue = {
  cartItems: CartItem[]
  addOrUpdateItem: (item: CartItem) => void
  removeItem: (serviceId: string) => void
  updateItemQuantity: (serviceId: string, quantity: number) => void
  updateItemDiscount: (serviceId: string, discountPercent: number) => void
  clearCart: () => void
  getItemQuantity: (serviceId: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addOrUpdateItem = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.serviceId === item.serviceId)
      const normalizedItem: CartItem = { ...item, validityDays: '365' }
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], ...normalizedItem }
        return updated
      }
      return [...prev, normalizedItem]
    })
  }, [])

  const removeItem = useCallback((serviceId: string) => {
    setCartItems((prev) => prev.filter((item) => item.serviceId !== serviceId))
  }, [])

  const updateItemQuantity = useCallback(
    (serviceId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(serviceId)
        return
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.serviceId === serviceId ? { ...item, quantity, validityDays: '365' } : item
        )
      )
    },
    [removeItem]
  )

  const updateItemDiscount = useCallback((serviceId: string, discountPercent: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId ? { ...item, discountPercent, validityDays: '365' } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getItemQuantity = useCallback(
    (serviceId: string) => cartItems.find((i) => i.serviceId === serviceId)?.quantity ?? 0,
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

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
