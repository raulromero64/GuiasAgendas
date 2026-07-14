import { AUTH_PROVIDER } from '@/shared/constants/app'
import type { IAuthProvider } from '@/shared/services/auth-provider.contract'
import { Auth0Provider } from '@/shared/services/providers/Auth0Provider'
import { DevelopmentAuthProvider } from '@/shared/services/providers/DevelopmentAuthProvider'

export type AuthProviderKey = 'auth0' | 'development'

const authProviderRegistry: Record<AuthProviderKey, IAuthProvider> = {
  auth0: new Auth0Provider(),
  development: new DevelopmentAuthProvider(),
}

/**
 * Selecciona el proveedor IAM segun configuracion centralizada.
 */
export function createAuthProvider(): IAuthProvider {
  const provider = authProviderRegistry[AUTH_PROVIDER]
  if (!provider) {
    throw new Error(
      `Invalid VITE_AUTH_PROVIDER value: ${String(AUTH_PROVIDER)}. Expected one of: ${Object.keys(authProviderRegistry).join(', ')}`
    )
  }

  return provider
}
