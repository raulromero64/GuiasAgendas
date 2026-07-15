import { describe, expect, it } from 'vitest'

import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import type { OptimisticLockingPolicy } from '@/modules/academic-structure/application/ports/OptimisticLockingPolicy'
import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'
import { CreateGradoUseCase } from '@/modules/academic-structure/grado/application/use-cases/CreateGrado.use-case'
import { ListGradosUseCase } from '@/modules/academic-structure/grado/application/use-cases/ListGrados.use-case'
import { SetGradoStatusUseCase } from '@/modules/academic-structure/grado/application/use-cases/SetGradoStatus.use-case'
import { UpdateGradoUseCase } from '@/modules/academic-structure/grado/application/use-cases/UpdateGrado.use-case'
import { Grado } from '@/modules/academic-structure/grado/domain/Grado'
import {
  GradoCodeAlreadyExistsError,
  GradoNameAlreadyExistsError,
  GradoNotFoundError,
} from '@/modules/academic-structure/grado/domain/Grado.errors'
import { OptimisticConcurrencyConflictError } from '@/modules/academic-structure/domain/OptimisticConcurrency.errors'

class InMemoryGradoRepository implements GradoRepository {
  private readonly storage = new Map<string, Grado>()

  async save(grado: Grado) {
    this.storage.set(grado.id, grado)
  }

  async findById(id: string) {
    return this.storage.get(id) ?? null
  }

  async listByNivelAndPeriodo(params: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
  }) {
    return Array.from(this.storage.values()).filter(
      (grado) =>
        grado.institucionId === params.institucionId &&
        grado.periodoLectivoId === params.periodoLectivoId &&
        grado.nivelId === params.nivelId
    )
  }

  async existsByCodigoInScope(params: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
    codigo: string
    excludingGradoId?: string
  }) {
    const normalizedCode = params.codigo.trim().toUpperCase()

    return Array.from(this.storage.values()).some((grado) => {
      if (grado.institucionId !== params.institucionId) {
        return false
      }

      if (grado.periodoLectivoId !== params.periodoLectivoId) {
        return false
      }

      if (grado.nivelId !== params.nivelId) {
        return false
      }

      if (params.excludingGradoId && grado.id === params.excludingGradoId) {
        return false
      }

      return grado.codigo === normalizedCode
    })
  }

  async existsByNombreInScope(params: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
    nombre: string
    excludingGradoId?: string
  }) {
    const normalizedName = params.nombre.trim().toLowerCase()

    return Array.from(this.storage.values()).some((grado) => {
      if (grado.institucionId !== params.institucionId) {
        return false
      }

      if (grado.periodoLectivoId !== params.periodoLectivoId) {
        return false
      }

      if (grado.nivelId !== params.nivelId) {
        return false
      }

      if (params.excludingGradoId && grado.id === params.excludingGradoId) {
        return false
      }

      return grado.nombre.trim().toLowerCase() === normalizedName
    })
  }
}

const referentialIntegrityCheckerStub: ReferentialIntegrityChecker = {
  async assertInstitutionScope() {},
  async assertGradoScope() {},
  async assertGrupoScope() {},
}

const optimisticLockingPolicyStub: OptimisticLockingPolicy = {
  assertExpectedVersion(input) {
    if (input.expectedVersion !== input.currentVersion) {
      throw new OptimisticConcurrencyConflictError(input)
    }
  },
}

describe('Grado use cases', () => {
  it('crea grado con unicidad por institucion + periodo + nivel + codigo', async () => {
    const repository = new InMemoryGradoRepository()
    const useCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)

    const result = await useCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    expect(result.codigo).toBe('G1')
  })

  it('rechaza codigo duplicado en mismo scope', async () => {
    const repository = new InMemoryGradoRepository()
    const useCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)

    await useCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    await expect(() =>
      useCase.execute({
        id: 'grado-2',
        institucionId: 'inst-1',
        periodoLectivoId: 'periodo-2026',
        nivelId: 'nivel-primaria',
        codigo: 'G1',
        nombre: 'Segundo',
        orden: 2,
      })
    ).rejects.toThrowError(GradoCodeAlreadyExistsError)
  })

  it('permite repetir codigo en distinto nivel', async () => {
    const repository = new InMemoryGradoRepository()
    const useCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)

    await useCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    const result = await useCase.execute({
      id: 'grado-2',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-secundaria',
      codigo: 'G1',
      nombre: 'Primero Secundaria',
      orden: 1,
    })

    expect(result.codigo).toBe('G1')
  })

  it('rechaza nombre duplicado en mismo nivel y periodo', async () => {
    const repository = new InMemoryGradoRepository()
    const useCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)

    await useCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    await expect(() =>
      useCase.execute({
        id: 'grado-2',
        institucionId: 'inst-1',
        periodoLectivoId: 'periodo-2026',
        nivelId: 'nivel-primaria',
        codigo: 'G2',
        nombre: 'Primero',
        orden: 2,
      })
    ).rejects.toThrowError(GradoNameAlreadyExistsError)
  })

  it('permite editar grado y mantiene validacion de unicidad en scope', async () => {
    const repository = new InMemoryGradoRepository()
    const createUseCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)
    const updateUseCase = new UpdateGradoUseCase(
      repository,
      referentialIntegrityCheckerStub,
      optimisticLockingPolicyStub
    )

    await createUseCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    await createUseCase.execute({
      id: 'grado-2',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G2',
      nombre: 'Segundo',
      orden: 2,
    })

    await expect(() =>
      updateUseCase.execute({
        id: 'grado-2',
        expectedVersion: 1,
        updatedBy: 'user-1',
        codigo: 'G1',
      })
    ).rejects.toThrowError(GradoCodeAlreadyExistsError)
  })

  it('lista grados ordenados por orden en el mismo nivel y periodo', async () => {
    const repository = new InMemoryGradoRepository()
    const createUseCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)
    const listUseCase = new ListGradosUseCase(repository)

    await createUseCase.execute({
      id: 'grado-2',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G2',
      nombre: 'Segundo',
      orden: 2,
    })

    await createUseCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    const list = await listUseCase.execute({
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
    })

    expect(list[0]?.orden).toBe(1)
    expect(list[1]?.orden).toBe(2)
  })

  it('activa e inactiva grado', async () => {
    const repository = new InMemoryGradoRepository()
    const createUseCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)
    const setStatusUseCase = new SetGradoStatusUseCase(repository)

    await createUseCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    const inactivated = await setStatusUseCase.execute({ id: 'grado-1', status: 'inactivo' })
    expect(inactivated.estado).toBe('inactivo')

    const activated = await setStatusUseCase.execute({ id: 'grado-1', status: 'activo' })
    expect(activated.estado).toBe('activo')
  })

  it('falla al actualizar grado inexistente', async () => {
    const repository = new InMemoryGradoRepository()
    const useCase = new UpdateGradoUseCase(
      repository,
      referentialIntegrityCheckerStub,
      optimisticLockingPolicyStub
    )

    await expect(() =>
      useCase.execute({
        id: 'no-existe',
        expectedVersion: 1,
        updatedBy: 'user-1',
        nombre: 'X',
      })
    ).rejects.toThrowError(GradoNotFoundError)
  })

  it('falla cuando la version esperada no coincide', async () => {
    const repository = new InMemoryGradoRepository()
    const createUseCase = new CreateGradoUseCase(repository, referentialIntegrityCheckerStub)
    const updateUseCase = new UpdateGradoUseCase(
      repository,
      referentialIntegrityCheckerStub,
      optimisticLockingPolicyStub
    )

    await createUseCase.execute({
      id: 'grado-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      codigo: 'G1',
      nombre: 'Primero',
      orden: 1,
    })

    await expect(() =>
      updateUseCase.execute({
        id: 'grado-1',
        expectedVersion: 2,
        updatedBy: 'user-2',
        nombre: 'Primero Actualizado',
      })
    ).rejects.toThrowError(OptimisticConcurrencyConflictError)
  })
})
