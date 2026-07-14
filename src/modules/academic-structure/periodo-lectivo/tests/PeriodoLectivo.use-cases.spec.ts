import { describe, expect, it } from 'vitest'

import { CreatePeriodoLectivoUseCase } from '@/modules/academic-structure/periodo-lectivo/application/use-cases/CreatePeriodoLectivo.use-case'
import { ClosePeriodoLectivoUseCase } from '@/modules/academic-structure/periodo-lectivo/application/use-cases/ClosePeriodoLectivo.use-case'
import { GetActivePeriodoLectivoUseCase } from '@/modules/academic-structure/periodo-lectivo/application/use-cases/GetActivePeriodoLectivo.use-case'
import { ListPeriodoLectivosUseCase } from '@/modules/academic-structure/periodo-lectivo/application/use-cases/ListPeriodoLectivos.use-case'
import { UpdatePeriodoLectivoUseCase } from '@/modules/academic-structure/periodo-lectivo/application/use-cases/UpdatePeriodoLectivo.use-case'
import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'
import {
  PeriodoLectivoAlreadyActiveError,
  PeriodoLectivoNotFoundError,
  PeriodoLectivoPendingAcademicProcessesError,
} from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'
import { PeriodoLectivo } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo'

class InMemoryPeriodoLectivoRepository implements PeriodoLectivoRepository {
  private readonly storage = new Map<string, PeriodoLectivo>()

  async save(periodoLectivo: PeriodoLectivo) {
    this.storage.set(periodoLectivo.id, periodoLectivo)
  }

  async findById(id: string) {
    return this.storage.get(id) ?? null
  }

  async findActiveByInstitucion(institucionId: string) {
    for (const periodoLectivo of this.storage.values()) {
      if (
        periodoLectivo.institucionId === institucionId &&
        periodoLectivo.toPrimitives().estado === 'activo'
      ) {
        return periodoLectivo
      }
    }

    return null
  }

  async listByInstitucion(institucionId: string) {
    return Array.from(this.storage.values()).filter(
      (periodoLectivo) => periodoLectivo.institucionId === institucionId
    )
  }
}

class InMemoryAcademicProcessStatusChecker {
  private readonly pendingByPeriodoId = new Map<string, boolean>()

  setPending(periodoLectivoId: string, hasPending: boolean) {
    this.pendingByPeriodoId.set(periodoLectivoId, hasPending)
  }

  async hasPendingAcademicProcesses(periodoLectivoId: string) {
    return this.pendingByPeriodoId.get(periodoLectivoId) ?? false
  }
}

describe('PeriodoLectivo use cases', () => {
  it('crea periodo lectivo', async () => {
    const repository = new InMemoryPeriodoLectivoRepository()
    const useCase = new CreatePeriodoLectivoUseCase(repository)

    const result = await useCase.execute({
      id: 'periodo-2026',
      institucionId: 'inst-1',
      nombre: 'Periodo 2026',
      fechaInicio: new Date('2026-01-10T00:00:00.000Z'),
      fechaFin: new Date('2026-12-20T00:00:00.000Z'),
      activarAlCrear: true,
    })

    expect(result.estado).toBe('activo')
  })

  it('rechaza crear periodo activo cuando ya existe uno activo', async () => {
    const repository = new InMemoryPeriodoLectivoRepository()
    const createUseCase = new CreatePeriodoLectivoUseCase(repository)

    await createUseCase.execute({
      id: 'periodo-2026',
      institucionId: 'inst-1',
      nombre: 'Periodo 2026',
      fechaInicio: new Date('2026-01-10T00:00:00.000Z'),
      fechaFin: new Date('2026-12-20T00:00:00.000Z'),
      activarAlCrear: true,
    })

    await expect(() =>
      createUseCase.execute({
        id: 'periodo-2027',
        institucionId: 'inst-1',
        nombre: 'Periodo 2027',
        fechaInicio: new Date('2027-01-10T00:00:00.000Z'),
        fechaFin: new Date('2027-12-20T00:00:00.000Z'),
        activarAlCrear: true,
      })
    ).rejects.toThrowError(PeriodoLectivoAlreadyActiveError)
  })

  it('edita un periodo existente', async () => {
    const repository = new InMemoryPeriodoLectivoRepository()
    const createUseCase = new CreatePeriodoLectivoUseCase(repository)
    const updateUseCase = new UpdatePeriodoLectivoUseCase(repository)

    await createUseCase.execute({
      id: 'periodo-2026',
      institucionId: 'inst-1',
      nombre: 'Periodo 2026',
      fechaInicio: new Date('2026-01-10T00:00:00.000Z'),
      fechaFin: new Date('2026-12-20T00:00:00.000Z'),
    })

    const result = await updateUseCase.execute({
      id: 'periodo-2026',
      nombre: 'Periodo Escolar 2026',
    })

    expect(result.nombre).toBe('Periodo Escolar 2026')
  })

  it('cierra un periodo existente', async () => {
    const repository = new InMemoryPeriodoLectivoRepository()
    const checker = new InMemoryAcademicProcessStatusChecker()
    const createUseCase = new CreatePeriodoLectivoUseCase(repository)
    const closeUseCase = new ClosePeriodoLectivoUseCase(repository, checker)

    await createUseCase.execute({
      id: 'periodo-2026',
      institucionId: 'inst-1',
      nombre: 'Periodo 2026',
      fechaInicio: new Date('2026-01-10T00:00:00.000Z'),
      fechaFin: new Date('2026-12-20T00:00:00.000Z'),
    })

    const result = await closeUseCase.execute({ id: 'periodo-2026' })

    expect(result.estado).toBe('cerrado')
  })

  it('rechaza cierre cuando hay procesos academicos pendientes', async () => {
    const repository = new InMemoryPeriodoLectivoRepository()
    const checker = new InMemoryAcademicProcessStatusChecker()
    const createUseCase = new CreatePeriodoLectivoUseCase(repository)
    const closeUseCase = new ClosePeriodoLectivoUseCase(repository, checker)

    await createUseCase.execute({
      id: 'periodo-2026',
      institucionId: 'inst-1',
      nombre: 'Periodo 2026',
      fechaInicio: new Date('2026-01-10T00:00:00.000Z'),
      fechaFin: new Date('2026-12-20T00:00:00.000Z'),
    })

    checker.setPending('periodo-2026', true)

    await expect(() => closeUseCase.execute({ id: 'periodo-2026' })).rejects.toThrowError(
      PeriodoLectivoPendingAcademicProcessesError
    )
  })

  it('obtiene periodo activo y lista periodos', async () => {
    const repository = new InMemoryPeriodoLectivoRepository()
    const createUseCase = new CreatePeriodoLectivoUseCase(repository)
    const getActiveUseCase = new GetActivePeriodoLectivoUseCase(repository)
    const listUseCase = new ListPeriodoLectivosUseCase(repository)

    await createUseCase.execute({
      id: 'periodo-2026',
      institucionId: 'inst-1',
      nombre: 'Periodo 2026',
      fechaInicio: new Date('2026-01-10T00:00:00.000Z'),
      fechaFin: new Date('2026-12-20T00:00:00.000Z'),
      activarAlCrear: true,
    })

    await createUseCase.execute({
      id: 'periodo-2025',
      institucionId: 'inst-1',
      nombre: 'Periodo 2025',
      fechaInicio: new Date('2025-01-10T00:00:00.000Z'),
      fechaFin: new Date('2025-12-20T00:00:00.000Z'),
    })

    const activeResult = await getActiveUseCase.execute({ institucionId: 'inst-1' })
    const listResult = await listUseCase.execute({ institucionId: 'inst-1' })

    expect(activeResult?.id).toBe('periodo-2026')
    expect(listResult).toHaveLength(2)
  })

  it('falla al editar periodo inexistente', async () => {
    const repository = new InMemoryPeriodoLectivoRepository()
    const updateUseCase = new UpdatePeriodoLectivoUseCase(repository)

    await expect(() =>
      updateUseCase.execute({
        id: 'inexistente',
        nombre: 'Periodo X',
      })
    ).rejects.toThrowError(PeriodoLectivoNotFoundError)
  })
})
