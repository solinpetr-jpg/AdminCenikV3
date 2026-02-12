import type { ReactNode } from 'react'

export interface EditableCellProps {
  value: string
  /** Admin = clickable link, Obchodník = plain text */
  isEditable: boolean
  onEdit?: () => void
  align?: 'left' | 'right' | 'center'
  className?: string
  /** Optional wrapper (e.g. package-card-price) */
  valueClassName?: string
}

export default function EditableCell({
  value,
  isEditable,
  onEdit,
  align = 'left',
  className,
  valueClassName,
}: EditableCellProps) {
  const alignStyle = { textAlign: align } as const

  /* Read-only: Obchodník nebo když isEditable není explicitně true */
  if (isEditable !== true) {
    return (
      <span
        className={[valueClassName, className].filter(Boolean).join(' ') || undefined}
        style={{ fontSize: '14px', ...alignStyle }}
      >
        {value}
      </span>
    )
  }

  /* Admin: vždy klikatelný link (včetně 0,00 Kč a „Služba na objednávku“) – žádná výjimka */
  return (
    <button
      type="button"
      className={['editable-cell-link', valueClassName, className].filter(Boolean).join(' ').trim() || undefined}
      style={{ ...alignStyle, cursor: 'pointer' }}
      onClick={onEdit}
      aria-label="Upravit hodnotu"
      data-editable="true"
    >
      {value}
    </button>
  )
}
