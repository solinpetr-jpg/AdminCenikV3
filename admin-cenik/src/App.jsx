import { useEffect, useState } from 'react'
import OrderPage from './OrderPage.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import DesignSystemPage from './DesignSystemPage.jsx'

export default function App() {
  const [isDesignSystem, setIsDesignSystem] = useState(
    typeof window !== 'undefined' && window.location.hash === '#design-system',
  )

  useEffect(() => {
    const handleHashChange = () => {
      setIsDesignSystem(window.location.hash === '#design-system')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <CartProvider>
      {isDesignSystem ? <DesignSystemPage /> : <OrderPage />}
    </CartProvider>
  )
}
