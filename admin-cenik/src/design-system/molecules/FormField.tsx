import * as React from 'react'
import { type LabelHTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import './FormField.css'

export interface FormFieldProps {
  label: React.ReactNode
  id?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function FormFieldLabel({
  htmlFor,
  className,
  children,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('ds-form-field__label', className)} htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  )
}

export default function FormField({
  label,
  id,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  const fieldId = id ?? `field-${Math.random().toString(36).slice(2)}`
  return (
    <div className={cn('ds-form-field', className)}>
      <FormFieldLabel htmlFor={fieldId}>
        {label}
        {required && <span className="ds-form-field__required" aria-hidden> *</span>}
      </FormFieldLabel>
      {typeof children === 'object' && children !== null && 'type' in children
        ? (
            cloneElementWithId(children as React.ReactElement, fieldId)
          )
        : (
            children
          )}
      {error && (
        <span className="ds-form-field__error" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span className="ds-form-field__hint">{hint}</span>
      )}
    </div>
  )
}

function cloneElementWithId(child: React.ReactElement, id: string): React.ReactNode {
  return React.cloneElement(child, { id })
}
