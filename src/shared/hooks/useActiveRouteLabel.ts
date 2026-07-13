import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import type { NavItem } from '@/shared/types/ui'

/**
 * Resuelve la etiqueta activa segun ruta y items de navegacion.
 */
export function useActiveRouteLabel(navItems: NavItem[]) {
  const { pathname } = useLocation()

  return useMemo(() => {
    const active = navItems.find((item) =>
      item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
    )
    return active?.label ?? 'Dashboard'
  }, [pathname, navItems])
}
