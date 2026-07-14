import type { GrupoRepository } from '@/modules/academic-structure/grupo/application/ports/GrupoRepository'

interface ListGruposInput {
  institucionId: string
  periodoLectivoId: string
  gradoId: string
}

export class ListGruposUseCase {
  private readonly repository: GrupoRepository

  constructor(repository: GrupoRepository) {
    this.repository = repository
  }

  async execute(input: ListGruposInput) {
    const grupos = await this.repository.listByGradoAndPeriodo({
      institucionId: input.institucionId,
      periodoLectivoId: input.periodoLectivoId,
      gradoId: input.gradoId,
    })

    return grupos
      .map((grupo) => grupo.toPrimitives())
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }
}
