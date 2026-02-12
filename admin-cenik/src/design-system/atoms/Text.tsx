import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Text.css'

export type TextVariant = 'body' | 'bodySm' | 'label' | 'muted' | 'price'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant
  as?: 'span' | 'p' | 'div'
  muted?: boolean
}

export default function Text({
  variant = 'body',
  as: Component = 'span',
  muted,
  className,
  ...rest
}: TextProps) {
  return (
    <Component
      className={cn(
        'ds-text',
        `ds-text--${variant}`,
        muted && 'ds-text--muted',
        className
      )}
      {...rest}
    />
  )
}
