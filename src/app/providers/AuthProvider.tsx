import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { AuthContext } from '@/shared/lib/auth-context'
import { authService } from '@/shared/services/auth.service'
import {
  hasPermission,
  isAuthorized,
  resolveEffectivePermissions,
} from '@/shared/security/authorization.engine'
import type { AuthService } from '@/shared/services/auth.service'
import type { AuthContextValue, AuthSnapshot } from '@/shared/types/identity'

interface AuthProviderProps extends PropsWithChildren {
  service?: AuthService
}

/**
 * Provider IAM base para orquestar sesion, usuario y permisos.
 */
export function AuthProvider({ children, service = authService }: AuthProviderProps) {
  const [authSnapshot, setAuthSnapshot] = useState<AuthSnapshot>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    async function bootstrapIdentity() {
      const currentSession = await service.getCurrentSession()
      const currentUser = currentSession ? await service.getCurrentUser(currentSession) : null

      if (currentSession && currentUser) {
        setAuthSnapshot({
          user: currentUser,
          session: currentSession,
          isAuthenticated: true,
          isLoading: false,
        })
        return
      }

      setAuthSnapshot({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }

    void bootstrapIdentity()
  }, [service])

  const permissions = useMemo(() => {
    if (!authSnapshot.user) {
      return []
    }

    return resolveEffectivePermissions({
      role: authSnapshot.user.role,
      permissionClaims: authSnapshot.user.permissionClaims,
    })
  }, [authSnapshot.user])

  const contextValue: AuthContextValue = {
    ...authSnapshot,
    permissions,
    hasPermission: (permission) => hasPermission(permissions, permission),
    isAuthorized: (policy) => isAuthorized(permissions, policy),
    signOut: async () => {
      await service.signOut()
      setAuthSnapshot({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      })
    },
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
