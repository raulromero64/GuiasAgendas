import type { AsignaturaRepository } from '@/modules/academic-structure/asignatura/application/ports/AsignaturaRepository'
import type { EstadoAsignatura } from '@/modules/academic-structure/asignatura/domain/Asignatura'
import { AsignaturaNotFoundError } from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

interface SetAsignaturaStatusInput {
  id: string
  status: EstadoAsignatura
}

export class SetAsignaturaStatusUseCase {
  private readonly repository: AsignaturaRepository

  constructor(repository: AsignaturaRepository) {
    this.repository = repository
  }

  async execute(input: SetAsignaturaStatusInput) {
    const asignatura = await this.repository.findById(input.id)
    if (!asignatura) {
      throw new AsignaturaNotFoundError(input.id)
    }

    if (input.status === 'activo') {
      asignatura.activate()
    } else {
      asignatura.inactivate()
    }

    await this.repository.save(asignatura)

    return asignatura.toPrimitives()
  }
}
