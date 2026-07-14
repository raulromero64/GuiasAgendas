import { describe, expect, it } from 'vitest'

import type { GrupoRepository } from '@/modules/academic-structure/grupo/application/ports/GrupoRepository'
import { CreateGrupoUseCase } from '@/modules/academic-structure/grupo/application/use-cases/CreateGrupo.use-case'
import { ListGruposUseCase } from '@/modules/academic-structure/grupo/application/use-cases/ListGrupos.use-case'
import { SetGrupoStatusUseCase } from '@/modules/academic-structure/grupo/application/use-cases/SetGrupoStatus.use-case'
import { UpdateGrupoUseCase } from '@/modules/academic-structure/grupo/application/use-cases/UpdateGrupo.use-case'
import { Grupo } from '@/modules/academic-structure/grupo/domain/Grupo'
import {
  GrupoCodeAlreadyExistsError,
  GrupoNameAlreadyExistsError,
  GrupoNotFoundError,
} from '@/modules/academic-structure/grupo/domain/Grupo.errors'

class InMemoryGrupoRepository implements GrupoRepository {
  private readonly storage = new Map<string, Grupo>()

  async save(grupo: Grupo) {
    this.storage.set(grupo.id, grupo)
  }

  async findById(id: string) {
    return this.storage.get(id) ?? null
  }

  async listByGradoAndPeriodo(params: {
    institucionId: string
    periodoLectivoId: string
    gradoId: string
  }) {
    return Array.from(this.storage.values()).filter(
      (grupo) =>
        grupo.institucionId === params.institucionId &&
        grupo.periodoLectivoId === params.periodoLectivoId &&
        grupo.gradoId === params.gradoId
    )
  }

  async existsByCodigoInScope(params: {
    institucionId: string
    periodoLectivoId: string
    gradoId: string
    codigo: string
    excludingGrupoId?: string
  }) {
    const normalizedCode = params.codigo.trim().toUpperCase()

    return Array.from(this.storage.values()).some((grupo) => {
      if (grupo.institucionId !== params.institucionId) {
        return false
      }

      if (grupo.periodoLectivoId !== params.periodoLectivoId) {
        return false
      }

      if (grupo.gradoId !== params.gradoId) {
        return false
      }

      if (params.excludingGrupoId && grupo.id === params.excludingGrupoId) {
        return false
      }

      return grupo.codigo === normalizedCode
    })
  }

  async existsByNombreInScope(params: {
    institucionId: string
    periodoLectivoId: string
    gradoId: string
    nombre: string
    excludingGrupoId?: string
  }) {
    const normalizedName = params.nombre.trim().toLowerCase()

    return Array.from(this.storage.values()).some((grupo) => {
      if (grupo.institucionId !== params.institucionId) {
        return false
      }

      if (grupo.periodoLectivoId !== params.periodoLectivoId) {
        return false
      }

      if (grupo.gradoId !== params.gradoId) {
        return false
      }

      if (params.excludingGrupoId && grupo.id === params.excludingGrupoId) {
        return false
      }

      return grupo.nombre.trim().toLowerCase() === normalizedName
    })
  }
}

describe('Grupo use cases', () => {
  it('crea grupo con unicidad por institucion + periodo + grado + codigo', async () => {
    const repository = new InMemoryGrupoRepository()
    const useCase = new CreateGrupoUseCase(repository)

    const result = await useCase.execute({
      id: 'grupo-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'A',
      nombre: 'Grupo A',
      capacidadMaxima: 30,
      turno: 'Manana',
    })

    expect(result.codigo).toBe('A')
  })

  it('rechaza codigo duplicado en mismo grado y periodo', async () => {
    const repository = new InMemoryGrupoRepository()
    const useCase = new CreateGrupoUseCase(repository)

    await useCase.execute({
      id: 'grupo-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'A',
      nombre: 'Grupo A',
      capacidadMaxima: 30,
      turno: 'Manana',
    })

    await expect(() =>
      useCase.execute({
        id: 'grupo-2',
        institucionId: 'inst-1',
        periodoLectivoId: 'periodo-2026',
        nivelId: 'nivel-primaria',
        gradoId: 'grado-1',
        codigo: 'A',
        nombre: 'Grupo B',
        capacidadMaxima: 30,
        turno: 'Tarde',
      })
    ).rejects.toThrowError(GrupoCodeAlreadyExistsError)
  })

  it('rechaza nombre duplicado en mismo grado y periodo', async () => {
    const repository = new InMemoryGrupoRepository()
    const useCase = new CreateGrupoUseCase(repository)

    await useCase.execute({
      id: 'grupo-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'A',
      nombre: 'Grupo A',
      capacidadMaxima: 30,
      turno: 'Manana',
    })

    await expect(() =>
      useCase.execute({
        id: 'grupo-2',
        institucionId: 'inst-1',
        periodoLectivoId: 'periodo-2026',
        nivelId: 'nivel-primaria',
        gradoId: 'grado-1',
        codigo: 'B',
        nombre: 'Grupo A',
        capacidadMaxima: 28,
        turno: 'Tarde',
      })
    ).rejects.toThrowError(GrupoNameAlreadyExistsError)
  })

  it('permite codigo repetido en distinto grado', async () => {
    const repository = new InMemoryGrupoRepository()
    const useCase = new CreateGrupoUseCase(repository)

    await useCase.execute({
      id: 'grupo-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'A',
      nombre: 'Grupo A',
      capacidadMaxima: 30,
      turno: 'Manana',
    })

    const result = await useCase.execute({
      id: 'grupo-2',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-2',
      codigo: 'A',
      nombre: 'Grupo A2',
      capacidadMaxima: 30,
      turno: 'Noche',
    })

    expect(result.codigo).toBe('A')
  })

  it('permite editar grupo y mantiene validacion de unicidad en scope', async () => {
    const repository = new InMemoryGrupoRepository()
    const createUseCase = new CreateGrupoUseCase(repository)
    const updateUseCase = new UpdateGrupoUseCase(repository)

    await createUseCase.execute({
      id: 'grupo-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'A',
      nombre: 'Grupo A',
      capacidadMaxima: 30,
      turno: 'Manana',
    })

    await createUseCase.execute({
      id: 'grupo-2',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'B',
      nombre: 'Grupo B',
      capacidadMaxima: 32,
      turno: 'Tarde',
    })

    await expect(() =>
      updateUseCase.execute({
        id: 'grupo-2',
        codigo: 'A',
      })
    ).rejects.toThrowError(GrupoCodeAlreadyExistsError)
  })

  it('lista grupos ordenados por nombre en el mismo grado y periodo', async () => {
    const repository = new InMemoryGrupoRepository()
    const createUseCase = new CreateGrupoUseCase(repository)
    const listUseCase = new ListGruposUseCase(repository)

    await createUseCase.execute({
      id: 'grupo-2',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'B',
      nombre: 'Grupo B',
      capacidadMaxima: 32,
      turno: 'Tarde',
    })

    await createUseCase.execute({
      id: 'grupo-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'A',
      nombre: 'Grupo A',
      capacidadMaxima: 30,
      turno: 'Manana',
    })

    const list = await listUseCase.execute({
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      gradoId: 'grado-1',
    })

    expect(list[0]?.nombre).toBe('Grupo A')
    expect(list[1]?.nombre).toBe('Grupo B')
  })

  it('activa e inactiva grupo', async () => {
    const repository = new InMemoryGrupoRepository()
    const createUseCase = new CreateGrupoUseCase(repository)
    const setStatusUseCase = new SetGrupoStatusUseCase(repository)

    await createUseCase.execute({
      id: 'grupo-1',
      institucionId: 'inst-1',
      periodoLectivoId: 'periodo-2026',
      nivelId: 'nivel-primaria',
      gradoId: 'grado-1',
      codigo: 'A',
      nombre: 'Grupo A',
      capacidadMaxima: 30,
      turno: 'Manana',
    })

    const inactivated = await setStatusUseCase.execute({ id: 'grupo-1', status: 'inactivo' })
    expect(inactivated.estado).toBe('inactivo')

    const activated = await setStatusUseCase.execute({ id: 'grupo-1', status: 'activo' })
    expect(activated.estado).toBe('activo')
  })

  it('falla al editar grupo inexistente', async () => {
    const repository = new InMemoryGrupoRepository()
    const useCase = new UpdateGrupoUseCase(repository)

    await expect(() =>
      useCase.execute({
        id: 'no-existe',
        nombre: 'Grupo X',
      })
    ).rejects.toThrowError(GrupoNotFoundError)
  })
})
