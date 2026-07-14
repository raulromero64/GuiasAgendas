import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'
import { GradoNotFoundError } from '@/modules/academic-structure/grado/domain/Grado.errors'
import type { EstadoGrado } from '@/modules/academic-structure/grado/domain/Grado'

interface SetGradoStatusInput {
  id: string
  status: EstadoGrado
}

export class SetGradoStatusUseCase {
  private readonly repository: GradoRepository

  constructor(repository: GradoRepository) {
    this.repository = repository
  }

  async execute(input: SetGradoStatusInput) {
    const grado = await this.repository.findById(input.id)
    if (!grado) {
      throw new GradoNotFoundError(input.id)
    }

    if (input.status === 'activo') {
      grado.activate()
    } else {
      grado.inactivate()
    }

    await this.repository.save(grado)

    return grado.toPrimitives()
  }
}
