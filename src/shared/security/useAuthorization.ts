import { useAuth } from '@/shared/hooks/useAuth'

export function useAuthorization() {
  const { permissions, hasPermission, isAuthorized } = useAuth()

  return {
    permissions,
    hasPermission,
    isAuthorized,
  }
}
