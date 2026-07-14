import { useAuth } from '@/shared/hooks/useAuth'

/**
 * Hook dedicado al consumo de autorizacion desde React.
 */
export function useAuthorization() {
  const { permissions, hasPermission, isAuthorized } = useAuth()

  return {
    permissions,
    hasPermission,
    isAuthorized,
  }
}
