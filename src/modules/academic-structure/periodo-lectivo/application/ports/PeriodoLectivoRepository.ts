import type { PeriodoLectivo } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo'

export interface PeriodoLectivoRepository {
  save: (periodoLectivo: PeriodoLectivo) => Promise<void>
  findById: (id: string) => Promise<PeriodoLectivo | null>
  findActiveByInstitucion: (institucionId: string) => Promise<PeriodoLectivo | null>
  listByInstitucion: (institucionId: string) => Promise<PeriodoLectivo[]>
}
