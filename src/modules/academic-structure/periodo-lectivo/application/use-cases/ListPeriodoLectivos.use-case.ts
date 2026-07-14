import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'

interface ListPeriodoLectivosInput {
  institucionId: string
}

export class ListPeriodoLectivosUseCase {
  private readonly repository: PeriodoLectivoRepository

  constructor(repository: PeriodoLectivoRepository) {
    this.repository = repository
  }

  async execute(input: ListPeriodoLectivosInput) {
    const periodos = await this.repository.listByInstitucion(input.institucionId)

    return periodos.map((periodoLectivo) => periodoLectivo.toPrimitives())
  }
}
