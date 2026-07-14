import { Navigate, Outlet } from 'react-router-dom'

import { DASHBOARD_ENTRY_ROUTE, PUBLIC_ENTRY_ROUTE } from '@/shared/constants/identity'
import { useAuth } from '@/shared/hooks/useAuth'
import { useAuthorization } from '@/shared/hooks/useAuthorization'
import type { AuthorizationPolicy } from '@/shared/types/identity'

interface AuthorizationGuardProps {
  policy?: AuthorizationPolicy
}

/**
 * Guard unico para autenticacion y autorizacion por permisos.
 */
export function AuthorizationGuard({ policy }: AuthorizationGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const { isAuthorized } = useAuthorization()

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-content-secondary">Cargando contexto de identidad...</div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ENTRY_ROUTE} replace />
  }

  if (!isAuthorized(policy)) {
    return <Navigate to={DASHBOARD_ENTRY_ROUTE} replace />
  }

  return <Outlet />
}
