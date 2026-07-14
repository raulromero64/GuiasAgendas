import type { Asignatura } from '@/modules/academic-structure/asignatura/domain/Asignatura'

export interface AsignaturaRepository {
  save: (asignatura: Asignatura) => Promise<void>
  findById: (id: string) => Promise<Asignatura | null>
  listByInstitucion: (institucionId: string) => Promise<Asignatura[]>
  existsByCodigoInInstitucion: (params: {
    institucionId: string
    codigo: string
    excludingAsignaturaId?: string
  }) => Promise<boolean>
  existsByNombreInInstitucion: (params: {
    institucionId: string
    nombre: string
    excludingAsignaturaId?: string
  }) => Promise<boolean>
}
