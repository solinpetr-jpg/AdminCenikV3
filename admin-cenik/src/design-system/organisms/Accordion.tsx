import { type ReactNode, useState } from 'react'
import { cn } from '../utils/cn'
import IconWrapper from '../atoms/IconWrapper'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import './Accordion.css'

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ds-accordion-chevron"
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

export interface AccordionProps {
  id: string
  title: string
  summary?: ReactNode
  icon?: ReactNode
  expanded?: boolean
  defaultExpanded?: boolean
  onToggle?: (expanded: boolean) => void
  children: ReactNode
  /** If true, header is not clickable (e.g. "Položky objednávky" always open) */
  staticHeader?: boolean
  className?: string
}

export default function Accordion({
  id,
  title,
  summary,
  icon,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  children,
  staticHeader,
  className,
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded
  const setExpanded = (v: boolean) => {
    if (!isControlled) setInternalExpanded(v)
    onToggle?.(v)
  }

  const contentId = `${id}-content`
  const headingId = `${id}-heading`

  return (
    <div
      className={cn(
        'ds-accordion',
        expanded && 'ds-accordion--open',
        className
      )}
    >
      <div
        role={staticHeader ? undefined : 'button'}
        tabIndex={staticHeader ? undefined : 0}
        aria-expanded={staticHeader ? true : expanded}
        aria-controls={contentId}
        id={headingId}
        className={cn(
          'ds-accordion-header',
          !staticHeader && 'ds-accordion-header--clickable'
        )}
        onClick={staticHeader ? undefined : () => setExpanded(!expanded)}
        onKeyDown={
          staticHeader
            ? undefined
            : (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setExpanded(!expanded)
                }
              }
        }
      >
        <div className="ds-accordion-header-inner">
          {icon != null && (
            <IconWrapper size={40}>{icon}</IconWrapper>
          )}
          <div className="ds-accordion-header-text">
            <Heading level={3} as="h2" className="ds-accordion-title">
              {title}
            </Heading>
            {summary != null && (
              <Text variant="bodySm" className="ds-accordion-summary" muted>
                {summary}
              </Text>
            )}
          </div>
        </div>
        {!staticHeader && (
          <div className="ds-accordion-chevron-wrap">
            <Chevron expanded={expanded} />
          </div>
        )}
      </div>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        className={cn(
          'ds-accordion-content',
          expanded && 'ds-accordion-content--open'
        )}
      >
        {children}
      </div>
    </div>
  )
}
