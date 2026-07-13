import { SHELL_NAV_ITEMS } from '@/shared/constants/navigation'
import { useAuth } from '@/shared/hooks/useAuth'
import { ShellFrame } from '@/shared/layout'

export function AppLayout() {
  const { user } = useAuth()

  const profile = {
    role: user?.name ?? 'Usuario SMP',
    campus: user?.role ?? 'Sin rol',
  }

  return <ShellFrame navItems={SHELL_NAV_ITEMS} profile={profile} />
}
