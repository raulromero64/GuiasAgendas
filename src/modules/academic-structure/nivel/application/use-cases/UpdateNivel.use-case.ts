import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import type { OptimisticLockingPolicy } from '@/modules/academic-structure/application/ports/OptimisticLockingPolicy'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
import {
  NivelCodeAlreadyExistsError,
  NivelNameAlreadyExistsError,
  NivelNotFoundError,
} from '@/modules/academic-structure/nivel/domain/Nivel.errors'

interface UpdateNivelInput {
  id: string
  expectedVersion: number
  updatedBy: string
  codigo?: string
  nombre?: string
  orden?: number
}

export class UpdateNivelUseCase {
  private readonly repository: NivelRepository
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker
  private readonly optimisticLockingPolicy: OptimisticLockingPolicy

  constructor(
    repository: NivelRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker,
    optimisticLockingPolicy: OptimisticLockingPolicy
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
    this.optimisticLockingPolicy = optimisticLockingPolicy
  }

  async execute(input: UpdateNivelInput) {
    const nivel = await this.repository.findById(input.id)
    if (!nivel) {
      throw new NivelNotFoundError(input.id)
    }

    await this.referentialIntegrityChecker.assertInstitutionScope(nivel.institucionId)

    this.optimisticLockingPolicy.assertExpectedVersion({
      aggregateName: 'Nivel',
      aggregateId: nivel.id,
      expectedVersion: input.expectedVersion,
      currentVersion: nivel.version,
    })

    const nextCodigo = input.codigo ? normalizeCatalogCode(input.codigo) : undefined
    const nextNombre = input.nombre ? normalizeCatalogName(input.nombre) : undefined

    if (
      nextCodigo &&
      (await this.repository.existsByCodigoInInstitucion({
        institucionId: nivel.institucionId,
        codigo: nextCodigo,
        excludingNivelId: nivel.id,
      }))
    ) {
      throw new NivelCodeAlreadyExistsError(nextCodigo)
    }

    if (
      nextNombre &&
      (await this.repository.existsByNombreInInstitucion({
        institucionId: nivel.institucionId,
        nombre: nextNombre,
        excludingNivelId: nivel.id,
      }))
    ) {
      throw new NivelNameAlreadyExistsError(nextNombre)
    }

    nivel.update({
      codigo: nextCodigo,
      nombre: nextNombre,
      orden: input.orden,
      updatedBy: input.updatedBy,
    })

    await this.repository.save(nivel)

    return nivel.toPrimitives()
  }
}
