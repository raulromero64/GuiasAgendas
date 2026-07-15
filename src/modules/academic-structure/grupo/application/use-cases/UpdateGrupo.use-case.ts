import type { GrupoRepository } from '@/modules/academic-structure/grupo/application/ports/GrupoRepository'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import type { OptimisticLockingPolicy } from '@/modules/academic-structure/application/ports/OptimisticLockingPolicy'
import {
  normalizeCatalogCode,
  normalizeCatalogName,
} from '@/modules/academic-structure/application/services/CatalogTextNormalization.service'
import {
  GrupoCodeAlreadyExistsError,
  GrupoNameAlreadyExistsError,
  GrupoNotFoundError,
} from '@/modules/academic-structure/grupo/domain/Grupo.errors'

interface UpdateGrupoInput {
  id: string
  expectedVersion: number
  updatedBy: string
  codigo?: string
  nombre?: string
  capacidadMaxima?: number
  turno?: string
}

export class UpdateGrupoUseCase {
  private readonly repository: GrupoRepository
  private readonly referentialIntegrityChecker: ReferentialIntegrityChecker
  private readonly optimisticLockingPolicy: OptimisticLockingPolicy

  constructor(
    repository: GrupoRepository,
    referentialIntegrityChecker: ReferentialIntegrityChecker,
    optimisticLockingPolicy: OptimisticLockingPolicy
  ) {
    this.repository = repository
    this.referentialIntegrityChecker = referentialIntegrityChecker
    this.optimisticLockingPolicy = optimisticLockingPolicy
  }

  async execute(input: UpdateGrupoInput) {
    const grupo = await this.repository.findById(input.id)
    if (!grupo) {
      throw new GrupoNotFoundError(input.id)
    }

    await this.referentialIntegrityChecker.assertGrupoScope({
      institucionId: grupo.institucionId,
      periodoLectivoId: grupo.periodoLectivoId,
      nivelId: grupo.nivelId,
      gradoId: grupo.gradoId,
    })

    this.optimisticLockingPolicy.assertExpectedVersion({
      aggregateName: 'Grupo',
      aggregateId: grupo.id,
      expectedVersion: input.expectedVersion,
      currentVersion: grupo.version,
    })

    const nextCodigo = input.codigo ? normalizeCatalogCode(input.codigo) : undefined
    const nextNombre = input.nombre ? normalizeCatalogName(input.nombre) : undefined

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
      updatedBy: input.updatedBy,
    })

    await this.repository.save(grupo)

    return grupo.toPrimitives()
  }
}
