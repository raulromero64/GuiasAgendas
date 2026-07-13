import { Bell, Search } from 'lucide-react'

import { APP_NAME, APP_SHORT } from '@/shared/constants/app'
import type { HeaderProfile } from '@/shared/types/ui'
import { IconButton, Input } from '@/shared/components/ui'
import { useActiveRouteLabel } from '@/shared/hooks/useActiveRouteLabel'
import type { NavItem } from '@/shared/types/ui'

interface ShellHeaderProps {
  profile: HeaderProfile
  navItems: NavItem[]
}

/**
 * Header reusable del shell administrativo.
 */
export function ShellHeader({ navItems, profile }: ShellHeaderProps) {
  const activeLabel = useActiveRouteLabel(navItems)

  return (
    <header className="sticky top-0 z-20 border-b border-border-subtle/80 bg-surface-panel/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            {APP_SHORT}
          </p>
          <h1 className="truncate text-lg font-semibold text-content-primary">{APP_NAME}</h1>
          <p className="text-xs text-content-muted">{activeLabel}</p>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block md:w-56">
            <Input placeholder="Buscar" aria-label="Buscar" />
          </div>

          <IconButton icon={Search} label="Buscar" className="md:hidden" />
          <IconButton icon={Bell} label="Notificaciones" />

          <div className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-panel px-3 py-2 shadow-sm">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-500 to-brand-700" />
            <div className="hidden text-left md:block">
              <p className="text-xs font-semibold text-content-primary">{profile.role}</p>
              <p className="text-[11px] text-content-muted">{profile.campus}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
