import type { ReactNode } from 'react'
import RoleSwitchBar from './RoleSwitchBar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="role-switch-bar-wrap">
        <div className="container order-page-container">
          <RoleSwitchBar />
        </div>
      </div>
      {children}
    </>
  )
}
