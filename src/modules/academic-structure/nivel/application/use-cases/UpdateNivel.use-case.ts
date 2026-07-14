import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'
import {
  NivelCodeAlreadyExistsError,
  NivelNameAlreadyExistsError,
  NivelNotFoundError,
} from '@/modules/academic-structure/nivel/domain/Nivel.errors'

interface UpdateNivelInput {
  id: string
  codigo?: string
  nombre?: string
  orden?: number
}

export class UpdateNivelUseCase {
  private readonly repository: NivelRepository

  constructor(repository: NivelRepository) {
    this.repository = repository
  }

  async execute(input: UpdateNivelInput) {
    const nivel = await this.repository.findById(input.id)
    if (!nivel) {
      throw new NivelNotFoundError(input.id)
    }

    const nextCodigo = input.codigo?.trim().toUpperCase()
    const nextNombre = input.nombre?.trim()

    if (
      nextCodigo &&
      (await this.repository.existsByCodigoInInstitucion(nivel.institucionId, nextCodigo, nivel.id))
    ) {
      throw new NivelCodeAlreadyExistsError(nextCodigo)
    }

    if (
      nextNombre &&
      (await this.repository.existsByNombreInInstitucion(nivel.institucionId, nextNombre, nivel.id))
    ) {
      throw new NivelNameAlreadyExistsError(nextNombre)
    }

    nivel.update({
      codigo: nextCodigo,
      nombre: nextNombre,
      orden: input.orden,
    })

    await this.repository.save(nivel)

    return nivel.toPrimitives()
  }
}
