import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
import { Grado } from '@/modules/academic-structure/grado/domain/Grado'
import {
  GradoCodeAlreadyExistsError,
  GradoNameAlreadyExistsError,
} from '@/modules/academic-structure/grado/domain/Grado.errors'

interface CreateGradoInput {
  id: string
  institucionId: string
  periodoLectivoId: string
  nivelId: string
  codigo: string
  nombre: string
  orden: number
  activarAlCrear?: boolean
}

export class CreateGradoUseCase {
  private readonly repository: GradoRepository
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker

  constructor(
    repository: GradoRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
  }

  async execute(input: CreateGradoInput) {
    await this.referentialIntegrityChecker.assertGradoScope({
      institucionId: input.institucionId,
      periodoLectivoId: input.periodoLectivoId,
      nivelId: input.nivelId,
    })

    const normalizedCodigo = normalizeCatalogCode(input.codigo)
    const normalizedNombre = normalizeCatalogName(input.nombre)

    if (
      await this.repository.existsByCodigoInScope({
        institucionId: input.institucionId,
        periodoLectivoId: input.periodoLectivoId,
        nivelId: input.nivelId,
        codigo: normalizedCodigo,
      })
    ) {
      throw new GradoCodeAlreadyExistsError(normalizedCodigo)
    }

    if (
      await this.repository.existsByNombreInScope({
        institucionId: input.institucionId,
        periodoLectivoId: input.periodoLectivoId,
        nivelId: input.nivelId,
        nombre: normalizedNombre,
      })
    ) {
      throw new GradoNameAlreadyExistsError(normalizedNombre)
    }

    const grado = Grado.create({
      ...input,
      codigo: normalizedCodigo,
      nombre: normalizedNombre,
    })

    await this.repository.save(grado)

    return grado.toPrimitives()
  }
}
