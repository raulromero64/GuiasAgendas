import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'

interface ListGradosInput {
  institucionId: string
  periodoLectivoId: string
  nivelId: string
}

export class ListGradosUseCase {
  private readonly repository: GradoRepository

  constructor(repository: GradoRepository) {
    this.repository = repository
  }

  async execute(input: ListGradosInput) {
    const grados = await this.repository.listByNivelAndPeriodo({
      institucionId: input.institucionId,
      periodoLectivoId: input.periodoLectivoId,
      nivelId: input.nivelId,
    })

    return grados.map((grado) => grado.toPrimitives()).sort((a, b) => a.orden - b.orden)
  }
}
