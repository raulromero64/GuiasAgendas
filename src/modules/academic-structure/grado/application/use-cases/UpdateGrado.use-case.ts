import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import type { OptimisticLockingPolicy } from '@/modules/academic-structure/application/ports/OptimisticLockingPolicy'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
import {
  GradoCodeAlreadyExistsError,
  GradoNameAlreadyExistsError,
  GradoNotFoundError,
} from '@/modules/academic-structure/grado/domain/Grado.errors'

interface UpdateGradoInput {
  id: string
  expectedVersion: number
  updatedBy: string
  codigo?: string
  nombre?: string
  orden?: number
}

export class UpdateGradoUseCase {
  private readonly repository: GradoRepository
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker
  private readonly optimisticLockingPolicy: OptimisticLockingPolicy

  constructor(
    repository: GradoRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker,
    optimisticLockingPolicy: OptimisticLockingPolicy
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
    this.optimisticLockingPolicy = optimisticLockingPolicy
  }

  async execute(input: UpdateGradoInput) {
    const grado = await this.repository.findById(input.id)
    if (!grado) {
      throw new GradoNotFoundError(input.id)
    }

    await this.referentialIntegrityChecker.assertGradoScope({
      institucionId: grado.institucionId,
      periodoLectivoId: grado.periodoLectivoId,
      nivelId: grado.nivelId,
    })

    this.optimisticLockingPolicy.assertExpectedVersion({
      aggregateName: 'Grado',
      aggregateId: grado.id,
      expectedVersion: input.expectedVersion,
      currentVersion: grado.version,
    })

    const nextCodigo = input.codigo ? normalizeCatalogCode(input.codigo) : undefined
    const nextNombre = input.nombre ? normalizeCatalogName(input.nombre) : undefined

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
      updatedBy: input.updatedBy,
    })

    await this.repository.save(grado)

    return grado.toPrimitives()
  }
}
