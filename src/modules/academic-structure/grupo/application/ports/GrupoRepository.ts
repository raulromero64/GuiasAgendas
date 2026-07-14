import type { Grupo } from '@/modules/academic-structure/grupo/domain/Grupo'

export interface GrupoRepository {
  save: (grupo: Grupo) => Promise<void>
  findById: (id: string) => Promise<Grupo | null>
  listByGradoAndPeriodo: (params: {
    institucionId: string
    periodoLectivoId: string
    gradoId: string
  }) => Promise<Grupo[]>
  existsByCodigoInScope: (params: {
    institucionId: string
    periodoLectivoId: string
    gradoId: string
    codigo: string
    excludingGrupoId?: string
  }) => Promise<boolean>
  existsByNombreInScope: (params: {
    institucionId: string
    periodoLectivoId: string
    gradoId: string
    nombre: string
    excludingGrupoId?: string
  }) => Promise<boolean>
}
