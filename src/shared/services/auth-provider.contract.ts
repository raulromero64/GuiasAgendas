import type { Session, User } from '@/shared/types/identity'

/**
 * Contrato unico para proveedores IAM concretos.
 */
export interface IAuthProvider {
  getCurrentSession: () => Promise<Session | null>
  getCurrentUser: (session: Session) => Promise<User | null>
  signOut: () => Promise<void>
}
