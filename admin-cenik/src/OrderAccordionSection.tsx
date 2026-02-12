import { useState, type ReactNode } from 'react'
import { FileText, Briefcase, Puzzle } from 'lucide-react'
import { pluralPoložka } from './utils/czechPlural'

const categoryIconProps = { size: 20, color: '#1B3C98' as const }
const iconDocument = <FileText {...categoryIconProps} aria-hidden />
const iconBriefcase = <Briefcase {...categoryIconProps} aria-hidden />
const iconPuzzle = <Puzzle {...categoryIconProps} aria-hidden />

const ICONS: Record<string, JSX.Element> = {
  document: iconDocument,
  briefcase: iconBriefcase,
  puzzle: iconPuzzle,
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-secondary"
      aria-hidden
      style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
    >
      <path
        d="M5 12.5L10 7.5L15 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface OrderAccordionSectionProps {
  id: string
  title: string
  iconType?: 'document' | 'briefcase' | 'puzzle'
  itemCount: number
  defaultExpanded?: boolean
  children: ReactNode
}

export default function OrderAccordionSection({
  id,
  title,
  iconType = 'document',
  itemCount,
  defaultExpanded = false,
  children,
}: OrderAccordionSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const contentId = `${id}-content`
  const headingId = `${id}-heading`

  return (
    <div
      className={`order-accordion-section rounded overflow-hidden shadow-sm ${expanded ? 'order-accordion-section--open' : ''}`}
    >
      <button
        type="button"
        className="premium-section-header w-100 d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 text-start"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-controls={contentId}
        id={headingId}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
            aria-hidden
          >
            {ICONS[iconType] ?? ICONS.document}
          </div>
          <h2 className="premium-section-title mb-0">{title}</h2>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="premium-section-summary">
            {itemCount} {pluralPoložka(itemCount)}
          </span>
          <Chevron expanded={expanded} />
        </div>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        className={`premium-section-content ${expanded ? 'premium-section-content--open' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}
