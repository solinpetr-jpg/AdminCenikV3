import type { ReactNode } from 'react'
import RoleSwitchBar from './RoleSwitchBar'

const AUTH_STORAGE_KEY = 'admin-cenik-auth'

function handleLogout() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY)
  window.location.reload()
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const isProtected = sessionStorage.getItem(AUTH_STORAGE_KEY) === '1'

  return (
    <>
      <div className="role-switch-bar-wrap">
        <div className="container order-page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <RoleSwitchBar />
          {isProtected && (
            <button
              type="button"
              onClick={handleLogout}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                color: '#6b7280',
                background: 'transparent',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Odhlásit
            </button>
          )}
        </div>
      </div>
      {children}
    </>
  )
}
