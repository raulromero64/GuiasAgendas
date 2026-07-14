import type { GrupoRepository } from '@/modules/academic-structure/grupo/application/ports/GrupoRepository'
import {
  GrupoCodeAlreadyExistsError,
  GrupoNameAlreadyExistsError,
  GrupoNotFoundError,
} from '@/modules/academic-structure/grupo/domain/Grupo.errors'

interface UpdateGrupoInput {
  id: string
  codigo?: string
  nombre?: string
  capacidadMaxima?: number
  turno?: string
}

export class UpdateGrupoUseCase {
  private readonly repository: GrupoRepository

  constructor(repository: GrupoRepository) {
    this.repository = repository
  }

  async execute(input: UpdateGrupoInput) {
    const grupo = await this.repository.findById(input.id)
    if (!grupo) {
      throw new GrupoNotFoundError(input.id)
    }

    const nextCodigo = input.codigo?.trim().toUpperCase()
    const nextNombre = input.nombre?.trim()

    if (
      nextCodigo &&
      (await this.repository.existsByCodigoInScope({
        institucionId: grupo.institucionId,
        periodoLectivoId: grupo.periodoLectivoId,
        gradoId: grupo.gradoId,
        codigo: nextCodigo,
        excludingGrupoId: grupo.id,
      }))
    ) {
      throw new GrupoCodeAlreadyExistsError(nextCodigo)
    }

    if (
      nextNombre &&
      (await this.repository.existsByNombreInScope({
        institucionId: grupo.institucionId,
        periodoLectivoId: grupo.periodoLectivoId,
        gradoId: grupo.gradoId,
        nombre: nextNombre,
        excludingGrupoId: grupo.id,
      }))
    ) {
      throw new GrupoNameAlreadyExistsError(nextNombre)
    }

    grupo.update({
      codigo: nextCodigo,
      nombre: nextNombre,
      capacidadMaxima: input.capacidadMaxima,
      turno: input.turno,
    })

    await this.repository.save(grupo)

    return grupo.toPrimitives()
  }
}
