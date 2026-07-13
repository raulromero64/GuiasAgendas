import { createContext } from 'react'

import type { AuthContextValue } from '@/shared/types/identity'

/**
 * Contexto base para estado IAM del SMP.
 */
export const AuthContext = createContext<AuthContextValue | null>(null)
