import type { GrupoRepository } from '@/modules/academic-structure/grupo/application/ports/GrupoRepository'
import { GrupoNotFoundError } from '@/modules/academic-structure/grupo/domain/Grupo.errors'
import type { EstadoGrupo } from '@/modules/academic-structure/grupo/domain/Grupo'

interface SetGrupoStatusInput {
  id: string
  status: EstadoGrupo
}

export class SetGrupoStatusUseCase {
  private readonly repository: GrupoRepository

  constructor(repository: GrupoRepository) {
    this.repository = repository
  }

  async execute(input: SetGrupoStatusInput) {
    const grupo = await this.repository.findById(input.id)
    if (!grupo) {
      throw new GrupoNotFoundError(input.id)
    }

    if (input.status === 'activo') {
      grupo.activate()
    } else {
      grupo.inactivate()
    }

    await this.repository.save(grupo)

    return grupo.toPrimitives()
  }
}
