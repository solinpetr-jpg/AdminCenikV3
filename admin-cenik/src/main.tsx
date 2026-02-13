import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './design-system/tokens.css'
import './index.css'
import App from './App'

const AUTH_KEY = 'admin-cenik-auth'

function GateOrApp() {
  const [unlocked, setUnlocked] = useState(() => typeof sessionStorage !== 'undefined' && sessionStorage.getItem(AUTH_KEY) === '1')

  useEffect(() => {
    const onUnlock = () => setUnlocked(true)
    window.addEventListener('admin-cenik-unlocked', onUnlock)
    return () => window.removeEventListener('admin-cenik-unlocked', onUnlock)
  }, [])

  if (!unlocked) return null
  return <App />
}

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <GateOrApp />
    </StrictMode>
  )
}
