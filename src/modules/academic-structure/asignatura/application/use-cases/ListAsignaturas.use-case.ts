import type { AsignaturaRepository } from '@/modules/academic-structure/asignatura/application/ports/AsignaturaRepository'

interface ListAsignaturasInput {
  institucionId: string
}

export class ListAsignaturasUseCase {
  private readonly repository: AsignaturaRepository

  constructor(repository: AsignaturaRepository) {
    this.repository = repository
  }

  async execute(input: ListAsignaturasInput) {
    const asignaturas = await this.repository.listByInstitucion(input.institucionId)

    return asignaturas
      .map((asignatura) => asignatura.toPrimitives())
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }
}
