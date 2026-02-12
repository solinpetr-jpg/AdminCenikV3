import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Stack.css'

export type StackDirection = 'vertical' | 'horizontal'
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection
  gap?: StackGap
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  wrap?: boolean
}

export default function Stack({
  direction = 'vertical',
  gap = 4,
  align,
  justify,
  wrap,
  className,
  ...rest
}: StackProps) {
  return (
    <div
      className={cn(
        'ds-stack',
        `ds-stack--${direction}`,
        `ds-stack--gap-${gap}`,
        align && `ds-stack--align-${align}`,
        justify && `ds-stack--justify-${justify}`,
        wrap && 'ds-stack--wrap',
        className
      )}
      {...rest}
    />
  )
}
