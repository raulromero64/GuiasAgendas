import type { Grado } from '@/modules/academic-structure/grado/domain/Grado'

export interface GradoRepository {
  save: (grado: Grado) => Promise<void>
  findById: (id: string) => Promise<Grado | null>
  listByNivelAndPeriodo: (params: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
  }) => Promise<Grado[]>
  existsByCodigoInScope: (params: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
    codigo: string
    excludingGradoId?: string
  }) => Promise<boolean>
  existsByNombreInScope: (params: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
    nombre: string
    excludingGradoId?: string
  }) => Promise<boolean>
}
