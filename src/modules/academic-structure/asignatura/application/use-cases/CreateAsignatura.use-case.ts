import type { AsignaturaRepository } from '@/modules/academic-structure/asignatura/application/ports/AsignaturaRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
import { Asignatura } from '@/modules/academic-structure/asignatura/domain/Asignatura'
import {
  AsignaturaCodeAlreadyExistsError,
  AsignaturaNameAlreadyExistsError,
} from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

interface CreateAsignaturaInput {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  tipo: string
  intensidadHorariaBase: number
  activarAlCrear?: boolean
}

export class CreateAsignaturaUseCase {
  private readonly repository: AsignaturaRepository
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker

  constructor(
    repository: AsignaturaRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
  }

  async execute(input: CreateAsignaturaInput) {
    await this.referentialIntegrityChecker.assertInstitutionScope(input.institucionId)

    const normalizedCodigo = normalizeCatalogCode(input.codigo)
    const normalizedNombre = normalizeCatalogName(input.nombre)

    if (
      await this.repository.existsByCodigoInInstitucion({
        institucionId: input.institucionId,
        codigo: normalizedCodigo,
      })
    ) {
      throw new AsignaturaCodeAlreadyExistsError(normalizedCodigo)
    }

    if (
      await this.repository.existsByNombreInInstitucion({
        institucionId: input.institucionId,
        nombre: normalizedNombre,
      })
    ) {
      throw new AsignaturaNameAlreadyExistsError(normalizedNombre)
    }

    const asignatura = Asignatura.create({
      ...input,
      codigo: normalizedCodigo,
      nombre: normalizedNombre,
    })

    await this.repository.save(asignatura)

    return asignatura.toPrimitives()
  }
}
