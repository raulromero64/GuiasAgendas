import { Navigate, Outlet } from 'react-router-dom'

import { PUBLIC_ENTRY_ROUTE } from '@/shared/constants/identity'
import { useAuth } from '@/shared/hooks/useAuth'

/**
 * Guard de ruta protegido para sesiones IAM activas.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-content-secondary">Cargando contexto de identidad...</div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ENTRY_ROUTE} replace />
  }

  return <Outlet />
}
