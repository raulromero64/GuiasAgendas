import type { AsignaturaRepository } from '@/modules/academic-structure/asignatura/application/ports/AsignaturaRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import type { OptimisticLockingPolicy } from '@/modules/academic-structure/application/ports/OptimisticLockingPolicy'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
import {
  AsignaturaCodeAlreadyExistsError,
  AsignaturaNameAlreadyExistsError,
  AsignaturaNotFoundError,
} from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

interface UpdateAsignaturaInput {
  id: string
  expectedVersion: number
  updatedBy: string
  codigo?: string
  nombre?: string
  tipo?: string
  intensidadHorariaBase?: number
}

export class UpdateAsignaturaUseCase {
  private readonly repository: AsignaturaRepository
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker
  private readonly optimisticLockingPolicy: OptimisticLockingPolicy

  constructor(
    repository: AsignaturaRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker,
    optimisticLockingPolicy: OptimisticLockingPolicy
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
    this.optimisticLockingPolicy = optimisticLockingPolicy
  }

  async execute(input: UpdateAsignaturaInput) {
    const asignatura = await this.repository.findById(input.id)
    if (!asignatura) {
      throw new AsignaturaNotFoundError(input.id)
    }

    await this.referentialIntegrityChecker.assertInstitutionScope(asignatura.institucionId)

    this.optimisticLockingPolicy.assertExpectedVersion({
      aggregateName: 'Asignatura',
      aggregateId: asignatura.id,
      expectedVersion: input.expectedVersion,
      currentVersion: asignatura.version,
    })

    const nextCodigo = input.codigo ? normalizeCatalogCode(input.codigo) : undefined
    const nextNombre = input.nombre ? normalizeCatalogName(input.nombre) : undefined

    if (
      nextCodigo &&
      (await this.repository.existsByCodigoInInstitucion({
        institucionId: asignatura.institucionId,
        codigo: nextCodigo,
        excludingAsignaturaId: asignatura.id,
      }))
    ) {
      throw new AsignaturaCodeAlreadyExistsError(nextCodigo)
    }

    if (
      nextNombre &&
      (await this.repository.existsByNombreInInstitucion({
        institucionId: asignatura.institucionId,
        nombre: nextNombre,
        excludingAsignaturaId: asignatura.id,
      }))
    ) {
      throw new AsignaturaNameAlreadyExistsError(nextNombre)
    }

    asignatura.update({
      codigo: nextCodigo,
      nombre: nextNombre,
      tipo: input.tipo,
      intensidadHorariaBase: input.intensidadHorariaBase,
      updatedBy: input.updatedBy,
    })

    await this.repository.save(asignatura)

    return asignatura.toPrimitives()
  }
}
