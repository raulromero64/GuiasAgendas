import type { Session } from '@/shared/types/identity'

/**
 * Contrato de servicio IAM para futuras integraciones (Firebase/Supabase).
 */
export interface AuthService {
  getCurrentSession: () => Promise<Session | null>
  signOut: () => Promise<void>
}
