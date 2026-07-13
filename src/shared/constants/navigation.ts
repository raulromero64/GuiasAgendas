import { BookOpenCheck, CalendarDays, GraduationCap, LayoutDashboard, Settings } from 'lucide-react'

import type { NavItem } from '@/shared/types/ui'

/**
 * Navegacion base reusable para shell administrativo.
 */
export const SHELL_NAV_ITEMS: NavItem[] = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/academico', label: 'Academico', icon: BookOpenCheck },
  { to: '/app/estudiantes', label: 'Estudiantes', icon: GraduationCap },
  { to: '/app/agenda', label: 'Agenda', icon: CalendarDays },
  { to: '/app/configuracion', label: 'Configuracion', icon: Settings },
]
