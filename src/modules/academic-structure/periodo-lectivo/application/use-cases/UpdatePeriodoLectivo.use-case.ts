import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'
import { PeriodoLectivoNotFoundError } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'

interface UpdatePeriodoLectivoInput {
  id: string
  nombre?: string
  fechaInicio?: Date
  fechaFin?: Date
  actorId?: string
  reason?: string
}

export class UpdatePeriodoLectivoUseCase {
  private readonly repository: PeriodoLectivoRepository

  constructor(repository: PeriodoLectivoRepository) {
    this.repository = repository
  }

  async execute(input: UpdatePeriodoLectivoInput) {
    const periodoLectivo = await this.repository.findById(input.id)
    if (!periodoLectivo) {
      throw new PeriodoLectivoNotFoundError(input.id)
    }

    periodoLectivo.update({
      nombre: input.nombre,
      fechaInicio: input.fechaInicio,
      fechaFin: input.fechaFin,
    })

    await this.repository.save(periodoLectivo)

    return periodoLectivo.toPrimitives()
  }
}
