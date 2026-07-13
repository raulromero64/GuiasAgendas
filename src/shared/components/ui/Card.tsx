import type { PropsWithChildren } from 'react'

import { cn } from '@/shared/utils/cn'

interface CardProps extends PropsWithChildren {
  className?: string
}

/**
 * Contenedor visual reusable para bloques de informacion.
 */
export function Card({ children, className }: CardProps) {
  return (
    <article
      className={cn(
        'rounded-lg border border-border-subtle bg-surface-panel p-4 shadow-sm',
        className
      )}
    >
      {children}
    </article>
  )
}
