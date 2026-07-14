import type { IAuthProvider } from '@/shared/services/auth-provider.contract'
import { createAuthProvider } from '@/shared/services/auth-provider.factory'
import type { Session, User } from '@/shared/types/identity'

/**
 * Contrato de servicio IAM para futuras integraciones (Firebase/Supabase).
 */
export interface AuthService {
  getCurrentSession: () => Promise<Session | null>
  getCurrentUser: (session: Session) => Promise<User | null>
  signOut: () => Promise<void>
}

/**
 * Servicio de autenticacion desacoplado por contrato de proveedor.
 */
export function createAuthService(provider: IAuthProvider): AuthService {
  return {
    getCurrentSession: () => provider.getCurrentSession(),
    getCurrentUser: (session) => provider.getCurrentUser(session),
    signOut: () => provider.signOut(),
  }
}

export const authService = createAuthService(createAuthProvider())
