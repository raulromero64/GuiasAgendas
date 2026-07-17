import { BookOpenCheck, CalendarDays, GraduationCap, LayoutDashboard, Settings } from 'lucide-react'

import type { NavItem } from '@/shared/types/ui'

/**
 * Navegacion base reusable para shell administrativo.
 */
export const SHELL_NAV_ITEMS: NavItem[] = [
  { to: '/app', label: 'Home', icon: LayoutDashboard },
  { to: '/app/academico', label: 'Academics', icon: BookOpenCheck },
  { to: '/app/estudiantes', label: 'Students', icon: GraduationCap },
  { to: '/app/agenda', label: 'Agenda', icon: CalendarDays },
  { to: '/app/configuracion', label: 'Configuracion', icon: Settings },
]
