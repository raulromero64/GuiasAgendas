import { SESSION_STORAGE_KEY } from '@/shared/constants/identity'
import type { Session } from '@/shared/types/identity'

/**
 * Gestion local de sesion para infraestructura IAM base.
 */
export const sessionService = {
  getSession(): Session | null {
    const rawSession = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!rawSession) {
      return null
    }

    try {
      return JSON.parse(rawSession) as Session
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }
  },

  saveSession(session: Session) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  },

  clearSession() {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  },
}
