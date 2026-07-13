import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'
import type { ButtonVariant } from '@/shared/types/ui'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

/**
 * Boton reusable con variantes visuales para acciones UI.
 */
export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-brand-700 text-surface-panel hover:bg-brand-800',
    secondary: 'bg-brand-500 text-surface-panel hover:bg-brand-600',
    ghost: 'bg-transparent text-content-secondary hover:bg-brand-50',
    outline:
      'border border-border-strong bg-surface-panel text-content-secondary hover:bg-neutral-100',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:ring-offset-surface-panel',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
