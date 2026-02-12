import { Outlet, Link, useLocation } from 'react-router-dom'
import { Container, Stack, Heading, Text } from '../index'
import './DocLayout.css'

const NAV = [
  { path: '/design-system', label: 'Úvod' },
  { path: '/design-system/foundations', label: 'Foundations' },
  { path: '/design-system/atoms/button', label: 'Atoms / Button' },
  { path: '/design-system/atoms/heading', label: 'Atoms / Heading' },
  { path: '/design-system/atoms/badge', label: 'Atoms / Badge' },
  { path: '/design-system/atoms/chip', label: 'Atoms / Chip' },
  { path: '/design-system/atoms/stepper', label: 'Atoms / Stepper' },
  { path: '/design-system/atoms/tooltip', label: 'Atoms / Tooltip' },
  { path: '/design-system/molecules/quantity-chips', label: 'Molecules / QuantityChips' },
  { path: '/design-system/molecules/price', label: 'Molecules / Price' },
  { path: '/design-system/organisms/accordion', label: 'Organisms / Accordion' },
  { path: '/design-system/organisms/accordion-section', label: 'Organisms / Accordion Section' },
  { path: '/design-system/organisms/modal', label: 'Organisms / Modal' },
  { path: '/design-system/organisms/pricing-card', label: 'Organisms / Pricing Card' },
  { path: '/design-system/organisms/pricing-hint-table', label: 'Organisms / Pricing Hint Table' },
  { path: '/design-system/examples/pricing-layout', label: 'Examples / Pricing layout' },
]

export default function DocLayout() {
  const location = useLocation()

  return (
    <div className="ds-doc">
      <aside className="ds-doc-sidebar">
        <div className="ds-doc-sidebar-header">
          <Link to="/" className="ds-doc-back">
            ← Zpět na objednávku
          </Link>
        </div>
        <nav className="ds-doc-nav">
          {NAV.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`ds-doc-nav-link ${location.pathname === item.path ? 'ds-doc-nav-link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="ds-doc-main">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}
