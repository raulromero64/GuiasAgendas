import type { GrupoRepository } from '@/modules/academic-structure/grupo/application/ports/GrupoRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
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
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker

  constructor(
    repository: GrupoRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
  }

  async execute(input: CreateGrupoInput) {
    await this.referentialIntegrityChecker.assertGrupoScope({
      institucionId: input.institucionId,
      periodoLectivoId: input.periodoLectivoId,
      nivelId: input.nivelId,
      gradoId: input.gradoId,
    })

    const normalizedCodigo = normalizeCatalogCode(input.codigo)
    const normalizedNombre = normalizeCatalogName(input.nombre)

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
