import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'

interface GetActivePeriodoLectivoInput {
  institucionId: string
}

export class GetActivePeriodoLectivoUseCase {
  private readonly repository: PeriodoLectivoRepository

  constructor(repository: PeriodoLectivoRepository) {
    this.repository = repository
  }

  async execute(input: GetActivePeriodoLectivoInput) {
    const periodoLectivo = await this.repository.findActiveByInstitucion(input.institucionId)
    return periodoLectivo?.toPrimitives() ?? null
  }
}
