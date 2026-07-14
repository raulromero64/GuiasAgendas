import type { Auth0Client, User as Auth0User } from '@auth0/auth0-spa-js'

import { AUTH0_CONFIG } from '@/shared/constants/app'
import { sessionService } from '@/shared/services/session.service'
import type { IAuthProvider } from '@/shared/services/auth-provider.contract'
import type { RoleKey, Session, User } from '@/shared/types/identity'

let auth0ClientPromise: Promise<Auth0Client> | null = null

function getRequiredConfigValue(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing required Auth0 environment variable: ${key}`)
  }

  return value
}

function getAuth0Client(): Promise<Auth0Client> {
  if (auth0ClientPromise) {
    return auth0ClientPromise
  }

  auth0ClientPromise = import('@auth0/auth0-spa-js').then(({ createAuth0Client }) =>
    createAuth0Client({
      domain: getRequiredConfigValue(AUTH0_CONFIG.domain, 'VITE_AUTH0_DOMAIN'),
      clientId: getRequiredConfigValue(AUTH0_CONFIG.clientId, 'VITE_AUTH0_CLIENT_ID'),
      authorizationParams: {
        redirect_uri: getRequiredConfigValue(AUTH0_CONFIG.redirectUri, 'VITE_AUTH0_REDIRECT_URI'),
        audience: AUTH0_CONFIG.audience,
        scope: getRequiredConfigValue(AUTH0_CONFIG.scope, 'VITE_AUTH0_SCOPE'),
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    })
  )

  return auth0ClientPromise
}

function resolveRoleFromClaims(claims: Auth0User): RoleKey {
  const roleClaimKey = getRequiredConfigValue(AUTH0_CONFIG.roleClaim, 'VITE_AUTH0_ROLE_CLAIM')
  const roleClaimValue = claims[roleClaimKey]

  if (
    roleClaimValue === 'super_admin' ||
    roleClaimValue === 'admin' ||
    roleClaimValue === 'coordinator' ||
    roleClaimValue === 'teacher' ||
    roleClaimValue === 'student'
  ) {
    return roleClaimValue
  }

  return 'student'
}

function resolvePermissionClaims(claims: Auth0User): string[] {
  const permissionsClaimKey = getRequiredConfigValue(
    AUTH0_CONFIG.permissionsClaim,
    'VITE_AUTH0_PERMISSIONS_CLAIM'
  )
  const claimValue = claims[permissionsClaimKey]

  if (!Array.isArray(claimValue)) {
    return []
  }

  return claimValue.filter((item): item is string => typeof item === 'string')
}

function mapExpiryDate(expiresInSeconds?: number) {
  const expiresAt = Date.now() + (expiresInSeconds ?? 3600) * 1000
  return new Date(expiresAt).toISOString()
}

/**
 * Proveedor IAM oficial basado en Auth0.
 */
export class Auth0Provider implements IAuthProvider {
  async getCurrentSession() {
    const client = await getAuth0Client()

    const searchParams = new URLSearchParams(window.location.search)
    const hasAuthCallback = searchParams.has('code') && searchParams.has('state')

    if (hasAuthCallback) {
      await client.handleRedirectCallback()
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    const isAuthenticated = await client.isAuthenticated()
    if (!isAuthenticated) {
      sessionService.clearSession()
      return null
    }

    const tokenResponse = await client.getTokenSilently({
      detailedResponse: true,
    })

    const currentSession: Session = {
      token: tokenResponse.access_token,
      startedAt: new Date().toISOString(),
      expiresAt: mapExpiryDate(tokenResponse.expires_in),
    }

    sessionService.saveSession(currentSession)
    return currentSession
  }

  async getCurrentUser(session: Session) {
    void session

    const client = await getAuth0Client()
    const profile = await client.getUser()

    if (!profile || typeof profile.sub !== 'string' || typeof profile.email !== 'string') {
      return null
    }

    const profileName =
      typeof profile.name === 'string'
        ? profile.name
        : typeof profile.nickname === 'string'
          ? profile.nickname
          : profile.email

    const user: User = {
      id: profile.sub,
      name: profileName,
      email: profile.email,
      role: resolveRoleFromClaims(profile),
      permissionClaims: resolvePermissionClaims(profile),
    }

    return user
  }

  async signOut() {
    const client = await getAuth0Client()

    await client.logout({
      logoutParams: {
        returnTo: AUTH0_CONFIG.redirectUri,
      },
    })

    sessionService.clearSession()
  }
}
