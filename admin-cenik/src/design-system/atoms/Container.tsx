import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Container.css'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'page'
}

export default function Container({
  maxWidth = 'page',
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn('ds-container', maxWidth !== 'page' && `ds-container--${maxWidth}`, className)}
      {...rest}
    />
  )
}
