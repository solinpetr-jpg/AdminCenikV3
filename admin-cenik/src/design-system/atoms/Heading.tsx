import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Heading.css'

export type HeadingLevel = 1 | 2 | 3 | 4

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  /** Visual style override (defaults to level) */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

const tagByLevel: Record<HeadingLevel, 'h1' | 'h2' | 'h3' | 'h4'> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
}

export default function Heading({
  level = 1,
  as,
  className,
  ...rest
}: HeadingProps) {
  const Tag = as ?? tagByLevel[level]
  return (
    <Tag
      className={cn('ds-heading', `ds-heading--${level}`, className)}
      {...rest}
    />
  )
}
