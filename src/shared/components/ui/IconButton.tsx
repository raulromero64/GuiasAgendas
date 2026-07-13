import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/shared/utils/cn'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label: string
}

/**
 * Boton iconico reusable para acciones de cabecera.
 */
export function IconButton({ className, icon: Icon, label, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'rounded-md border border-border-subtle bg-surface-panel p-2 text-content-secondary shadow-sm transition hover:bg-neutral-100',
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}
