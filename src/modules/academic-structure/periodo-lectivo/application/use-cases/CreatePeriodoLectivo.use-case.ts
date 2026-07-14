import { PeriodoLectivoAlreadyActiveError } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'
import { PeriodoLectivo } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo'
import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'

interface CreatePeriodoLectivoInput {
  id: string
  institucionId: string
  nombre: string
  fechaInicio: Date
  fechaFin: Date
  activarAlCrear?: boolean
  actorId?: string
  reason?: string
}

export class CreatePeriodoLectivoUseCase {
  private readonly repository: PeriodoLectivoRepository

  constructor(repository: PeriodoLectivoRepository) {
    this.repository = repository
  }

  async execute(input: CreatePeriodoLectivoInput) {
    if (input.activarAlCrear) {
      const activePeriodo = await this.repository.findActiveByInstitucion(input.institucionId)
      if (activePeriodo) {
        throw new PeriodoLectivoAlreadyActiveError()
      }
    }

    const periodoLectivo = PeriodoLectivo.create(input)

    if (input.activarAlCrear) {
      periodoLectivo.markAsActive({ actorId: input.actorId, reason: input.reason })
    }

    await this.repository.save(periodoLectivo)

    return periodoLectivo.toPrimitives()
  }
}
