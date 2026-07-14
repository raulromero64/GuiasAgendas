import { sessionService } from '@/shared/services/session.service'
import type { IAuthProvider } from '@/shared/services/auth-provider.contract'
import type { Session, User } from '@/shared/types/identity'

const DEVELOPMENT_AUTH_USER: User = {
  id: 'usr-admin-cervantes',
  name: 'Administrador SMP',
  email: 'admin@smp.local',
  role: 'admin',
}

function createDevelopmentSession(): Session {
  const startedAt = new Date().toISOString()

  return {
    token: 'dev-session-token',
    startedAt,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
  }
}

/**
 * Proveedor IAM de desarrollo para infraestructura local.
 */
export class DevelopmentAuthProvider implements IAuthProvider {
  async getCurrentSession() {
    const currentSession = sessionService.getSession()
    if (currentSession) {
      return currentSession
    }

    const developmentSession = createDevelopmentSession()
    sessionService.saveSession(developmentSession)
    return developmentSession
  }

  async getCurrentUser(session: Session) {
    void session
    return DEVELOPMENT_AUTH_USER
  }

  async signOut() {
    sessionService.clearSession()
  }
}
