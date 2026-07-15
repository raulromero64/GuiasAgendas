import type { Nivel } from '@/modules/academic-structure/nivel/domain/Nivel'

export interface NivelRepository {
  save: (nivel: Nivel) => Promise<void>
  findById: (id: string) => Promise<Nivel | null>
  listByInstitucion: (institucionId: string) => Promise<Nivel[]>
  existsByCodigoInInstitucion: (params: {
    institucionId: string
    codigo: string
    excludingNivelId?: string
  }) => Promise<boolean>
  existsByNombreInInstitucion: (params: {
    institucionId: string
    nombre: string
    excludingNivelId?: string
  }) => Promise<boolean>
}
