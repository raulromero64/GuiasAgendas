import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
import { Nivel } from '@/modules/academic-structure/nivel/domain/Nivel'
import {
  NivelCodeAlreadyExistsError,
  NivelNameAlreadyExistsError,
} from '@/modules/academic-structure/nivel/domain/Nivel.errors'

interface CreateNivelInput {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  orden: number
  activarAlCrear?: boolean
}

export class CreateNivelUseCase {
  private readonly repository: NivelRepository
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker

  constructor(
    repository: NivelRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
  }

  async execute(input: CreateNivelInput) {
    await this.referentialIntegrityChecker.assertInstitutionScope(input.institucionId)

    const normalizedCodigo = normalizeCatalogCode(input.codigo)
    const normalizedNombre = normalizeCatalogName(input.nombre)

    if (
      await this.repository.existsByCodigoInInstitucion({
        institucionId: input.institucionId,
        codigo: normalizedCodigo,
      })
    ) {
      throw new NivelCodeAlreadyExistsError(normalizedCodigo)
    }

    if (
      await this.repository.existsByNombreInInstitucion({
        institucionId: input.institucionId,
        nombre: normalizedNombre,
      })
    ) {
      throw new NivelNameAlreadyExistsError(normalizedNombre)
    }

    const nivel = Nivel.create({
      ...input,
      codigo: normalizedCodigo,
      nombre: normalizedNombre,
    })

    await this.repository.save(nivel)

    return nivel.toPrimitives()
  }
}
