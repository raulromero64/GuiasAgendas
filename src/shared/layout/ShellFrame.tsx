import type { HeaderProfile, NavItem } from '@/shared/types/ui'

import { ShellContent } from '@/shared/layout/ShellContent'
import { ShellFooter } from '@/shared/layout/ShellFooter'
import { ShellHeader } from '@/shared/layout/ShellHeader'
import { ShellSidebar } from '@/shared/layout/ShellSidebar'

interface ShellFrameProps {
  navItems: NavItem[]
  profile: HeaderProfile
}

/**
 * Estructura reusable del shell administrativo SMP.
 */
export function ShellFrame({ navItems, profile }: ShellFrameProps) {
  return (
    <div className="min-h-screen bg-app-gradient">
      <ShellHeader navItems={navItems} profile={profile} />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[260px_1fr] md:gap-6 md:px-6 md:py-6">
        <ShellSidebar navItems={navItems} />
        <main>
          <ShellContent />
          <ShellFooter />
        </main>
      </div>
    </div>
  )
}
