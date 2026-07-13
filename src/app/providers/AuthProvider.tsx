import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { MOCK_AUTH_SESSION, MOCK_AUTH_USER } from '@/shared/constants/identity'
import { AuthContext } from '@/shared/lib/auth-context'
import type { AuthService } from '@/shared/services/auth.service'
import { sessionService } from '@/shared/services/session.service'
import type { AuthContextValue, AuthSnapshot } from '@/shared/types/identity'
import { hasPermission, resolveRolePermissions } from '@/shared/utils/identity'

const authService: AuthService = {
  async getCurrentSession() {
    return sessionService.getSession()
  },
  async signOut() {
    sessionService.clearSession()
  },
}

/**
 * Provider IAM base para orquestar sesion, usuario y permisos.
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const [authSnapshot, setAuthSnapshot] = useState<AuthSnapshot>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    async function bootstrapIdentity() {
      const currentSession = await authService.getCurrentSession()

      if (currentSession) {
        setAuthSnapshot({
          user: MOCK_AUTH_USER,
          session: currentSession,
          isAuthenticated: true,
          isLoading: false,
        })
        return
      }

      // Sesion mock temporal hasta integrar proveedor real en proximo sprint.
      sessionService.saveSession(MOCK_AUTH_SESSION)
      setAuthSnapshot({
        user: MOCK_AUTH_USER,
        session: MOCK_AUTH_SESSION,
        isAuthenticated: true,
        isLoading: false,
      })
    }

    void bootstrapIdentity()
  }, [])

  const permissions = useMemo(
    () => (authSnapshot.user ? resolveRolePermissions(authSnapshot.user.role) : []),
    [authSnapshot.user]
  )

  const contextValue: AuthContextValue = {
    ...authSnapshot,
    permissions,
    hasPermission: (permission) => hasPermission(permissions, permission),
    signOut: async () => {
      await authService.signOut()
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
