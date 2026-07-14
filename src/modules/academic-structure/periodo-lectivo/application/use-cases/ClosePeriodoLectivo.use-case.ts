import type { AcademicProcessStatusChecker } from '@/modules/academic-structure/periodo-lectivo/application/ports/AcademicProcessStatusChecker'
import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'
import { PeriodoLectivoNotFoundError } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'

interface ClosePeriodoLectivoInput {
  id: string
  actorId?: string
  reason?: string
}

export class ClosePeriodoLectivoUseCase {
  private readonly repository: PeriodoLectivoRepository
  private readonly academicProcessStatusChecker: AcademicProcessStatusChecker

  constructor(
    repository: PeriodoLectivoRepository,
    academicProcessStatusChecker: AcademicProcessStatusChecker
  ) {
    this.repository = repository
    this.academicProcessStatusChecker = academicProcessStatusChecker
  }

  async execute(input: ClosePeriodoLectivoInput) {
    const periodoLectivo = await this.repository.findById(input.id)
    if (!periodoLectivo) {
      throw new PeriodoLectivoNotFoundError(input.id)
    }

    const hasPendingAcademicProcesses =
      await this.academicProcessStatusChecker.hasPendingAcademicProcesses(input.id)

    periodoLectivo.close({
      hasPendingAcademicProcesses,
      actorId: input.actorId,
      reason: input.reason,
    })
    await this.repository.save(periodoLectivo)

    return periodoLectivo.toPrimitives()
  }
}
