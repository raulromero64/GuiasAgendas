import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'
import { NivelNotFoundError } from '@/modules/academic-structure/nivel/domain/Nivel.errors'
import type { EstadoNivel } from '@/modules/academic-structure/nivel/domain/Nivel'

interface SetNivelStatusInput {
  id: string
  status: EstadoNivel
}

export class SetNivelStatusUseCase {
  private readonly repository: NivelRepository

  constructor(repository: NivelRepository) {
    this.repository = repository
  }

  async execute(input: SetNivelStatusInput) {
    const nivel = await this.repository.findById(input.id)
    if (!nivel) {
      throw new NivelNotFoundError(input.id)
    }

    if (input.status === 'activo') {
      nivel.activate()
    } else {
      nivel.inactivate()
    }

    await this.repository.save(nivel)

    return nivel.toPrimitives()
  }
}
