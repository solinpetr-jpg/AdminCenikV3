import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useId,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'
import './Tooltip.css'

/** Tooltip: first click opens, second click or click outside closes. Keyboard accessible. */
export interface TooltipProps {
  trigger: ReactNode
  children: ReactNode
  title?: string
  /** Optional id for the panel (for aria-describedby) */
  id?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  triggerClassName?: string
}

export default function Tooltip({
  trigger,
  children,
  title,
  id: idProp,
  position = 'bottom',
  className,
  triggerClassName,
}: TooltipProps) {
  const generatedId = useId()
  const panelId = idProp ?? `ds-tooltip-${generatedId}`
  const [open, setOpen] = useState(false)
  const [clickLocked, setClickLocked] = useState(false)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  const toggleClick = () => {
    setClickLocked((prev) => {
      const next = !prev
      setOpen(next)
      return next
    })
  }

  const openIfNotLocked = () => {
    if (!clickLocked) setOpen(true)
  }

  const closeIfNotLocked = () => {
    if (!clickLocked) setOpen(false)
  }

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return
    const el = triggerRef.current
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const panelWidth = 320
    let top = rect.bottom + 8
    let left = rect.left
    if (position === 'top') {
      top = rect.top - 8
    }
    left = Math.min(Math.max(8, left), vw - panelWidth - 8)
    setCoords({ top, left })
  }, [open, position])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      )
        return
      setClickLocked(false)
      setOpen(false)
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClickLocked(false)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const panel = (
    <div
      id={panelId}
      ref={panelRef}
      role="tooltip"
      className={cn(
        'ds-tooltip-panel',
        `ds-tooltip-panel--${position}`,
        className
      )}
      style={{ top: coords.top, left: coords.left }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
    </div>
  )

  const triggerEl = (
    <span
      ref={triggerRef}
      className={cn('ds-tooltip-trigger', triggerClassName)}
      onMouseEnter={openIfNotLocked}
      onMouseLeave={closeIfNotLocked}
    >
      <span
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-describedby={open ? panelId : undefined}
        title={title}
        onClick={toggleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleClick()
          }
        }}
        className="ds-tooltip-trigger-btn"
      >
        {trigger}
      </span>
      {open &&
        typeof document !== 'undefined' &&
        createPortal(panel, document.body)}
    </span>
  )

  return triggerEl
}
