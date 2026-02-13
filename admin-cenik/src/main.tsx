import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './design-system/tokens.css'
import './index.css'
import App from './App'

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
