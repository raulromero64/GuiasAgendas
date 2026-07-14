import type { GrupoRepository } from '@/modules/academic-structure/grupo/application/ports/GrupoRepository'
import { Grupo } from '@/modules/academic-structure/grupo/domain/Grupo'
import {
  GrupoCodeAlreadyExistsError,
  GrupoNameAlreadyExistsError,
} from '@/modules/academic-structure/grupo/domain/Grupo.errors'

interface CreateGrupoInput {
  id: string
  institucionId: string
  periodoLectivoId: string
  nivelId: string
  gradoId: string
  codigo: string
  nombre: string
  capacidadMaxima: number
  turno: string
  activarAlCrear?: boolean
}

export class CreateGrupoUseCase {
  private readonly repository: GrupoRepository

  constructor(repository: GrupoRepository) {
    this.repository = repository
  }

  async execute(input: CreateGrupoInput) {
    const normalizedCodigo = input.codigo.trim().toUpperCase()
    const normalizedNombre = input.nombre.trim()

    if (
      await this.repository.existsByCodigoInScope({
        institucionId: input.institucionId,
        periodoLectivoId: input.periodoLectivoId,
        gradoId: input.gradoId,
        codigo: normalizedCodigo,
      })
    ) {
      throw new GrupoCodeAlreadyExistsError(normalizedCodigo)
    }

    if (
      await this.repository.existsByNombreInScope({
        institucionId: input.institucionId,
        periodoLectivoId: input.periodoLectivoId,
        gradoId: input.gradoId,
        nombre: normalizedNombre,
      })
    ) {
      throw new GrupoNameAlreadyExistsError(normalizedNombre)
    }

    const grupo = Grupo.create({
      ...input,
      codigo: normalizedCodigo,
      nombre: normalizedNombre,
    })

    await this.repository.save(grupo)

    return grupo.toPrimitives()
  }
}
