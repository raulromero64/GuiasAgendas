import type { InputHTMLAttributes } from 'react'

import { cn } from '@/shared/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * Input base reusable para formularios de plataforma.
 */
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-border-strong bg-surface-panel px-3 py-2 text-sm text-content-primary placeholder:text-content-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100',
        className
      )}
      {...props}
    />
  )
}
