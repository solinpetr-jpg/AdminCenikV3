import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OrderPage from './OrderPage'
import AppLayout from './AppLayout'
import { CartProvider } from './contexts/CartContext'
import { RoleProvider } from './contexts/RoleContext'
import DocLayout from './design-system/docs/DocLayout'
import DocHome from './design-system/docs/pages/DocHome'
import FoundationsPage from './design-system/docs/pages/FoundationsPage'
import ButtonDoc from './design-system/docs/pages/ButtonDoc'
import HeadingDoc from './design-system/docs/pages/HeadingDoc'
import BadgeDoc from './design-system/docs/pages/BadgeDoc'
import ChipDoc from './design-system/docs/pages/ChipDoc'
import StepperDoc from './design-system/docs/pages/StepperDoc'
import TooltipDoc from './design-system/docs/pages/TooltipDoc'
import QuantityChipsDoc from './design-system/docs/pages/QuantityChipsDoc'
import PriceDoc from './design-system/docs/pages/PriceDoc'
import AccordionDoc from './design-system/docs/pages/AccordionDoc'
import AccordionSectionDoc from './design-system/docs/pages/AccordionSectionDoc'
import ModalDoc from './design-system/docs/pages/ModalDoc'
import PricingCardDoc from './design-system/docs/pages/PricingCardDoc'
import PricingHintTableDoc from './design-system/docs/pages/PricingHintTableDoc'
import PricingLayoutExample from './design-system/docs/pages/PricingLayoutExample'

export default function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <CartProvider>
                  <OrderPage />
                </CartProvider>
              </AppLayout>
            }
          />
          <Route path="/design-system" element={<AppLayout><DocLayout /></AppLayout>}>
          <Route index element={<DocHome />} />
          <Route path="foundations" element={<FoundationsPage />} />
          <Route path="atoms/button" element={<ButtonDoc />} />
          <Route path="atoms/heading" element={<HeadingDoc />} />
          <Route path="atoms/badge" element={<BadgeDoc />} />
          <Route path="atoms/chip" element={<ChipDoc />} />
          <Route path="atoms/stepper" element={<StepperDoc />} />
          <Route path="atoms/tooltip" element={<TooltipDoc />} />
          <Route path="molecules/quantity-chips" element={<QuantityChipsDoc />} />
          <Route path="molecules/price" element={<PriceDoc />} />
          <Route path="organisms/accordion" element={<AccordionDoc />} />
          <Route path="organisms/accordion-section" element={<AccordionSectionDoc />} />
          <Route path="organisms/modal" element={<ModalDoc />} />
          <Route path="organisms/pricing-card" element={<PricingCardDoc />} />
          <Route path="organisms/pricing-hint-table" element={<PricingHintTableDoc />} />
          <Route path="examples/pricing-layout" element={<PricingLayoutExample />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  )
}
