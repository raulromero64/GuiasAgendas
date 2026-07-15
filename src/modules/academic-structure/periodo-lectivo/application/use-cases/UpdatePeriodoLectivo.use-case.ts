import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'
import type { OptimisticLockingPolicy } from '@/modules/academic-structure/application/ports/OptimisticLockingPolicy'
import { PeriodoLectivoNotFoundError } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'

interface UpdatePeriodoLectivoInput {
  id: string
  expectedVersion: number
  updatedBy: string
  nombre?: string
  fechaInicio?: Date
  fechaFin?: Date
}

export class UpdatePeriodoLectivoUseCase {
  private readonly repository: PeriodoLectivoRepository
  private readonly optimisticLockingPolicy: OptimisticLockingPolicy

  constructor(
    repository: PeriodoLectivoRepository,
    optimisticLockingPolicy: OptimisticLockingPolicy
  ) {
    this.repository = repository
    this.optimisticLockingPolicy = optimisticLockingPolicy
  }

  async execute(input: UpdatePeriodoLectivoInput) {
    const periodoLectivo = await this.repository.findById(input.id)
    if (!periodoLectivo) {
      throw new PeriodoLectivoNotFoundError(input.id)
    }

    this.optimisticLockingPolicy.assertExpectedVersion({
      aggregateName: 'PeriodoLectivo',
      aggregateId: periodoLectivo.id,
      expectedVersion: input.expectedVersion,
      currentVersion: periodoLectivo.version,
    })

    periodoLectivo.update(
      {
        nombre: input.nombre,
        fechaInicio: input.fechaInicio,
        fechaFin: input.fechaFin,
      },
      {
        actorId: input.updatedBy,
      }
    )

    await this.repository.save(periodoLectivo)

    return periodoLectivo.toPrimitives()
  }
}
