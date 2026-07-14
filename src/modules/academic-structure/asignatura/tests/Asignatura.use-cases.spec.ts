import { describe, expect, it } from 'vitest'

import type { AsignaturaRepository } from '@/modules/academic-structure/asignatura/application/ports/AsignaturaRepository'
import { CreateAsignaturaUseCase } from '@/modules/academic-structure/asignatura/application/use-cases/CreateAsignatura.use-case'
import { ListAsignaturasUseCase } from '@/modules/academic-structure/asignatura/application/use-cases/ListAsignaturas.use-case'
import { SetAsignaturaStatusUseCase } from '@/modules/academic-structure/asignatura/application/use-cases/SetAsignaturaStatus.use-case'
import { UpdateAsignaturaUseCase } from '@/modules/academic-structure/asignatura/application/use-cases/UpdateAsignatura.use-case'
import { Asignatura } from '@/modules/academic-structure/asignatura/domain/Asignatura'
import {
  AsignaturaCodeAlreadyExistsError,
  AsignaturaNameAlreadyExistsError,
  AsignaturaNotFoundError,
} from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

class InMemoryAsignaturaRepository implements AsignaturaRepository {
  private readonly storage = new Map<string, Asignatura>()

  async save(asignatura: Asignatura) {
    this.storage.set(asignatura.id, asignatura)
  }

  async findById(id: string) {
    return this.storage.get(id) ?? null
  }

  async listByInstitucion(institucionId: string) {
    return Array.from(this.storage.values()).filter(
      (asignatura) => asignatura.institucionId === institucionId
    )
  }

  async existsByCodigoInInstitucion(params: {
    institucionId: string
    codigo: string
    excludingAsignaturaId?: string
  }) {
    const normalizedCode = params.codigo.trim().toUpperCase()

    return Array.from(this.storage.values()).some((asignatura) => {
      if (asignatura.institucionId !== params.institucionId) {
        return false
      }

      if (params.excludingAsignaturaId && asignatura.id === params.excludingAsignaturaId) {
        return false
      }

      return asignatura.codigo === normalizedCode
    })
  }

  async existsByNombreInInstitucion(params: {
    institucionId: string
    nombre: string
    excludingAsignaturaId?: string
  }) {
    const normalizedName = params.nombre.trim().toLowerCase()

    return Array.from(this.storage.values()).some((asignatura) => {
      if (asignatura.institucionId !== params.institucionId) {
        return false
      }

      if (params.excludingAsignaturaId && asignatura.id === params.excludingAsignaturaId) {
        return false
      }

      return asignatura.nombre.trim().toLowerCase() === normalizedName
    })
  }
}

describe('Asignatura use cases', () => {
  it('crea asignatura con unicidad por institucion y codigo', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const useCase = new CreateAsignaturaUseCase(repository)

    const result = await useCase.execute({
      id: 'asignatura-1',
      institucionId: 'inst-1',
      codigo: 'MAT101',
      nombre: 'Matematicas',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 4,
    })

    expect(result.codigo).toBe('MAT101')
  })

  it('rechaza codigo duplicado en la misma institucion', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const useCase = new CreateAsignaturaUseCase(repository)

    await useCase.execute({
      id: 'asignatura-1',
      institucionId: 'inst-1',
      codigo: 'MAT101',
      nombre: 'Matematicas',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 4,
    })

    await expect(() =>
      useCase.execute({
        id: 'asignatura-2',
        institucionId: 'inst-1',
        codigo: 'MAT101',
        nombre: 'Fisica',
        tipo: 'Obligatoria',
        intensidadHorariaBase: 3,
      })
    ).rejects.toThrowError(AsignaturaCodeAlreadyExistsError)
  })

  it('rechaza nombre duplicado en la misma institucion', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const useCase = new CreateAsignaturaUseCase(repository)

    await useCase.execute({
      id: 'asignatura-1',
      institucionId: 'inst-1',
      codigo: 'MAT101',
      nombre: 'Matematicas',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 4,
    })

    await expect(() =>
      useCase.execute({
        id: 'asignatura-2',
        institucionId: 'inst-1',
        codigo: 'FIS101',
        nombre: 'Matematicas',
        tipo: 'Obligatoria',
        intensidadHorariaBase: 3,
      })
    ).rejects.toThrowError(AsignaturaNameAlreadyExistsError)
  })

  it('permite codigo repetido en distinta institucion', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const useCase = new CreateAsignaturaUseCase(repository)

    await useCase.execute({
      id: 'asignatura-1',
      institucionId: 'inst-1',
      codigo: 'MAT101',
      nombre: 'Matematicas',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 4,
    })

    const result = await useCase.execute({
      id: 'asignatura-2',
      institucionId: 'inst-2',
      codigo: 'MAT101',
      nombre: 'Matematicas II',
      tipo: 'Electiva',
      intensidadHorariaBase: 2,
    })

    expect(result.codigo).toBe('MAT101')
  })

  it('permite editar asignatura y mantiene validacion de unicidad en institucion', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const createUseCase = new CreateAsignaturaUseCase(repository)
    const updateUseCase = new UpdateAsignaturaUseCase(repository)

    await createUseCase.execute({
      id: 'asignatura-1',
      institucionId: 'inst-1',
      codigo: 'MAT101',
      nombre: 'Matematicas',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 4,
    })

    await createUseCase.execute({
      id: 'asignatura-2',
      institucionId: 'inst-1',
      codigo: 'FIS101',
      nombre: 'Fisica',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 3,
    })

    await expect(() =>
      updateUseCase.execute({
        id: 'asignatura-2',
        codigo: 'MAT101',
      })
    ).rejects.toThrowError(AsignaturaCodeAlreadyExistsError)
  })

  it('lista asignaturas ordenadas por nombre en la institucion', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const createUseCase = new CreateAsignaturaUseCase(repository)
    const listUseCase = new ListAsignaturasUseCase(repository)

    await createUseCase.execute({
      id: 'asignatura-2',
      institucionId: 'inst-1',
      codigo: 'FIS101',
      nombre: 'Fisica',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 3,
    })

    await createUseCase.execute({
      id: 'asignatura-1',
      institucionId: 'inst-1',
      codigo: 'MAT101',
      nombre: 'Matematicas',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 4,
    })

    const list = await listUseCase.execute({ institucionId: 'inst-1' })

    expect(list[0]?.nombre).toBe('Fisica')
    expect(list[1]?.nombre).toBe('Matematicas')
  })

  it('activa e inactiva asignatura', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const createUseCase = new CreateAsignaturaUseCase(repository)
    const setStatusUseCase = new SetAsignaturaStatusUseCase(repository)

    await createUseCase.execute({
      id: 'asignatura-1',
      institucionId: 'inst-1',
      codigo: 'MAT101',
      nombre: 'Matematicas',
      tipo: 'Obligatoria',
      intensidadHorariaBase: 4,
    })

    const inactivated = await setStatusUseCase.execute({
      id: 'asignatura-1',
      status: 'inactivo',
    })
    expect(inactivated.estado).toBe('inactivo')

    const activated = await setStatusUseCase.execute({
      id: 'asignatura-1',
      status: 'activo',
    })
    expect(activated.estado).toBe('activo')
  })

  it('falla al editar asignatura inexistente', async () => {
    const repository = new InMemoryAsignaturaRepository()
    const useCase = new UpdateAsignaturaUseCase(repository)

    await expect(() =>
      useCase.execute({
        id: 'no-existe',
        nombre: 'Quimica',
      })
    ).rejects.toThrowError(AsignaturaNotFoundError)
  })
})
