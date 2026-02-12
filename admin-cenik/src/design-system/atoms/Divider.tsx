import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './Divider.css'

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {}

export default function Divider({ className, ...rest }: DividerProps) {
  return <hr className={cn('ds-divider', className)} {...rest} />
}
