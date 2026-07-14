import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'

interface ListNivelesInput {
  institucionId: string
}

export class ListNivelesUseCase {
  private readonly repository: NivelRepository

  constructor(repository: NivelRepository) {
    this.repository = repository
  }

  async execute(input: ListNivelesInput) {
    const niveles = await this.repository.listByInstitucion(input.institucionId)

    return niveles.map((nivel) => nivel.toPrimitives()).sort((a, b) => a.orden - b.orden)
  }
}
