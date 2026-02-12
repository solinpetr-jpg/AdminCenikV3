import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react'

export type Role = 'admin' | 'sales'

const STORAGE_KEY = 'admin-cenik-role'

function getStoredRole(): Role {
  if (typeof window === 'undefined') return 'admin'
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === 'admin' || raw === 'sales') return raw
  return 'admin'
}

type RoleContextValue = {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(getStoredRole)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, role)
  }, [role])

  const setRole = useCallback((next: Role) => {
    setRoleState(next)
  }, [])

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}

export function isSales(role: Role): boolean {
  return role === 'sales'
}

/** Podmíněné renderování podle role. Děti se zobrazí jen pokud aktuální role je v allow. */
export function RoleGate({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const { role } = useRole()
  if (!allow.includes(role)) return null
  return <>{children}</>
}
