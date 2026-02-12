import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './IconWrapper.css'

export interface IconWrapperProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  children: React.ReactNode
}

export default function IconWrapper({
  size = 40,
  className,
  children,
  ...rest
}: IconWrapperProps) {
  return (
    <div
      className={cn('ds-icon-wrapper', className)}
      style={{ width: size, height: size }}
      {...rest}
    >
      {children}
    </div>
  )
}
