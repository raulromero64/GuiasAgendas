import { useContext } from 'react'

import { AuthContext } from '@/shared/lib/auth-context'

/**
 * Hook reusable para consumir estado IAM desde cualquier layout o componente.
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider')
  }

  return context
}
