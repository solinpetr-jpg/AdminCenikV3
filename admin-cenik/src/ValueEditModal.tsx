import { useEffect, useRef, useState } from 'react'
import { Modal, Button } from './design-system'

const MODAL_CLASS = 'value-edit-modal'

export interface ValueEditModalProps {
  open: boolean
  currentValue: string
  onConfirm: (value: string) => void
  onClose: () => void
}

function useFocusTrap(open: boolean) {
  useEffect(() => {
    if (!open) return
    const el = document.querySelector<HTMLElement>(`.${MODAL_CLASS}`)
    if (!el) return
    const focusables = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    el.addEventListener('keydown', handleKeyDown)
    return () => el.removeEventListener('keydown', handleKeyDown)
  }, [open])
}

export default function ValueEditModal({
  open,
  currentValue,
  onConfirm,
  onClose,
}: ValueEditModalProps) {
  const [inputValue, setInputValue] = useState(currentValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useFocusTrap(open)

  useEffect(() => {
    if (open) {
      setInputValue(currentValue)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open, currentValue])

  const handleConfirm = () => {
    onConfirm(inputValue)
    onClose()
  }

  const handleClose = () => {
    setInputValue(currentValue)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Zadejte hodnotu"
      closeLabel="Zavřít"
      className={MODAL_CLASS}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Zrušit
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Potvrdit
          </Button>
        </>
      }
    >
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Hodnota"
      />
    </Modal>
  )
}
