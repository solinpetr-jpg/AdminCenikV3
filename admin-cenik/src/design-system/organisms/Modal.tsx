import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'
import { Button } from '../atoms/Button'
import './Modal.css'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  /** Optional close button aria-label */
  closeLabel?: string
  className?: string
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  closeLabel = 'Zavřít',
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  const content = (
    <>
      <div
        className="ds-modal-backdrop"
        aria-hidden
        onClick={onClose}
      />
      <div
        className={cn('ds-modal', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ds-modal-title"
        aria-describedby={subtitle ? 'ds-modal-subtitle' : undefined}
      >
        <div className="ds-modal-header">
          <div className="ds-modal-title-wrap">
            <h2 id="ds-modal-title" className="ds-modal-title">
              {title}
            </h2>
            <button
              type="button"
              className="ds-modal-close"
              onClick={onClose}
              aria-label={closeLabel}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {subtitle && (
            <p id="ds-modal-subtitle" className="ds-modal-subtitle">
              {subtitle}
            </p>
          )}
        </div>
        <div className="ds-modal-body">{children}</div>
        {footer != null && <div className="ds-modal-footer">{footer}</div>}
      </div>
    </>
  )

  return typeof document !== 'undefined'
    ? createPortal(content, document.body)
    : null
}
