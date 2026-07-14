import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'
import {
  GradoCodeAlreadyExistsError,
  GradoNameAlreadyExistsError,
  GradoNotFoundError,
} from '@/modules/academic-structure/grado/domain/Grado.errors'

interface UpdateGradoInput {
  id: string
  codigo?: string
  nombre?: string
  orden?: number
}

export class UpdateGradoUseCase {
  private readonly repository: GradoRepository

  constructor(repository: GradoRepository) {
    this.repository = repository
  }

  async execute(input: UpdateGradoInput) {
    const grado = await this.repository.findById(input.id)
    if (!grado) {
      throw new GradoNotFoundError(input.id)
    }

    const nextCodigo = input.codigo?.trim().toUpperCase()
    const nextNombre = input.nombre?.trim()

    if (
      nextCodigo &&
      (await this.repository.existsByCodigoInScope({
        institucionId: grado.institucionId,
        periodoLectivoId: grado.periodoLectivoId,
        nivelId: grado.nivelId,
        codigo: nextCodigo,
        excludingGradoId: grado.id,
      }))
    ) {
      throw new GradoCodeAlreadyExistsError(nextCodigo)
    }

    if (
      nextNombre &&
      (await this.repository.existsByNombreInScope({
        institucionId: grado.institucionId,
        periodoLectivoId: grado.periodoLectivoId,
        nivelId: grado.nivelId,
        nombre: nextNombre,
        excludingGradoId: grado.id,
      }))
    ) {
      throw new GradoNameAlreadyExistsError(nextNombre)
    }

    grado.update({
      codigo: nextCodigo,
      nombre: nextNombre,
      orden: input.orden,
    })

    await this.repository.save(grado)

    return grado.toPrimitives()
  }
}
