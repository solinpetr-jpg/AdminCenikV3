import OrderPage from './OrderPage.jsx'
import DesignSystemPage from './DesignSystemPage.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isDesignSystemPage = normalizedPath === '/designsystem'

  return (
    <CartProvider>
      {isDesignSystemPage ? <DesignSystemPage /> : <OrderPage />}
    </CartProvider>
  )
}
