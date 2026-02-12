import { ShieldCheck, Briefcase } from 'lucide-react'
import { useRole, type Role } from './contexts/RoleContext'

function Segment({
  active,
  icon: Icon,
  label,
  onClick,
  onKeyDown,
  'aria-pressed': ariaPressed,
}: {
  active: boolean
  icon: typeof ShieldCheck
  label: string
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  'aria-pressed': boolean
}) {
  return (
    <button
      type="button"
      className={`role-switch-segment ${active ? 'role-switch-segment--active' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-pressed={ariaPressed}
      aria-label={label}
    >
      <Icon size={18} strokeWidth={2.25} aria-hidden />
      <span>{label}</span>
    </button>
  )
}

export default function RoleSwitchBar() {
  const { role, setRole } = useRole()

  const handleKeyDown = (e: React.KeyboardEvent, targetRole: Role) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setRole(targetRole)
    }
  }

  const adminActive = role === 'admin'
  const salesActive = role === 'sales'

  return (
    <div className="role-switch-bar" role="region" aria-label="Výběr role">
      <span className="role-switch-label">ROLE:</span>
      <div className="role-switch-pill" role="group" aria-label="Přepínač rolí">
        <Segment
          active={adminActive}
          icon={ShieldCheck}
          label="Admin"
          onClick={() => setRole('admin')}
          onKeyDown={(e) => handleKeyDown(e, 'admin')}
          aria-pressed={adminActive}
        />
        <Segment
          active={salesActive}
          icon={Briefcase}
          label="Obchodník"
          onClick={() => setRole('sales')}
          onKeyDown={(e) => handleKeyDown(e, 'sales')}
          aria-pressed={salesActive}
        />
      </div>
      <span className="role-switch-description" aria-live="polite">
        {role === 'admin' ? '(Administrátorský pohled)' : '(Zjednodušený pohled pro obchodníky)'}
      </span>
    </div>
  )
}
