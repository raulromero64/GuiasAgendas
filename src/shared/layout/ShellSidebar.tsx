import { NavLink } from 'react-router-dom'

import { Badge } from '@/shared/components/ui'
import { CURRENT_PHASE, CURRENT_SPRINT } from '@/shared/constants/app'
import type { NavItem } from '@/shared/types/ui'
import { cn } from '@/shared/utils/cn'

interface ShellSidebarProps {
  navItems: NavItem[]
}

/**
 * Sidebar reusable con navegacion principal de plataforma.
 */
export function ShellSidebar({ navItems }: ShellSidebarProps) {
  return (
    <aside className="border-r border-border-subtle bg-surface-panel/75 p-4 md:p-5">
      <div className="mb-6 rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-neutral-100 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          {CURRENT_PHASE}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <p className="text-sm text-content-secondary">School Management Platform</p>
          <Badge tone="info">{CURRENT_SPRINT}</Badge>
        </div>
      </div>

      <nav className="space-y-1.5">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                isActive
                  ? 'bg-brand-700 text-surface-panel shadow-md'
                  : 'text-content-secondary hover:bg-neutral-100 hover:text-content-primary'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
