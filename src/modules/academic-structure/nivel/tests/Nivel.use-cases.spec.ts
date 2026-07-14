import { describe, expect, it } from 'vitest'

import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'
import { CreateNivelUseCase } from '@/modules/academic-structure/nivel/application/use-cases/CreateNivel.use-case'
import { ListNivelesUseCase } from '@/modules/academic-structure/nivel/application/use-cases/ListNiveles.use-case'
import { SetNivelStatusUseCase } from '@/modules/academic-structure/nivel/application/use-cases/SetNivelStatus.use-case'
import { UpdateNivelUseCase } from '@/modules/academic-structure/nivel/application/use-cases/UpdateNivel.use-case'
import { Nivel } from '@/modules/academic-structure/nivel/domain/Nivel'
import {
  NivelCodeAlreadyExistsError,
  NivelNameAlreadyExistsError,
  NivelNotFoundError,
} from '@/modules/academic-structure/nivel/domain/Nivel.errors'

class InMemoryNivelRepository implements NivelRepository {
  private readonly storage = new Map<string, Nivel>()

  async save(nivel: Nivel) {
    this.storage.set(nivel.id, nivel)
  }

  async findById(id: string) {
    return this.storage.get(id) ?? null
  }

  async listByInstitucion(institucionId: string) {
    return Array.from(this.storage.values()).filter(
      (nivel) => nivel.institucionId === institucionId
    )
  }

  async existsByCodigoInInstitucion(
    institucionId: string,
    codigo: string,
    excludingNivelId?: string
  ) {
    const normalized = codigo.trim().toUpperCase()

    return Array.from(this.storage.values()).some((nivel) => {
      if (nivel.institucionId !== institucionId) {
        return false
      }

      if (excludingNivelId && nivel.id === excludingNivelId) {
        return false
      }

      return nivel.codigo === normalized
    })
  }

  async existsByNombreInInstitucion(
    institucionId: string,
    nombre: string,
    excludingNivelId?: string
  ) {
    const normalized = nombre.trim().toLowerCase()

    return Array.from(this.storage.values()).some((nivel) => {
      if (nivel.institucionId !== institucionId) {
        return false
      }

      if (excludingNivelId && nivel.id === excludingNivelId) {
        return false
      }

      return nivel.nombre.trim().toLowerCase() === normalized
    })
  }
}

describe('Nivel use cases', () => {
  it('crea nivel con codigo y nombre unicos por institucion', async () => {
    const repository = new InMemoryNivelRepository()
    const useCase = new CreateNivelUseCase(repository)

    const result = await useCase.execute({
      id: 'nivel-primaria',
      institucionId: 'inst-1',
      codigo: 'PRIMARIA',
      nombre: 'Primaria',
      orden: 1,
    })

    expect(result.codigo).toBe('PRIMARIA')
  })

  it('rechaza codigo duplicado en la misma institucion', async () => {
    const repository = new InMemoryNivelRepository()
    const useCase = new CreateNivelUseCase(repository)

    await useCase.execute({
      id: 'nivel-1',
      institucionId: 'inst-1',
      codigo: 'PRIMARIA',
      nombre: 'Primaria',
      orden: 1,
    })

    await expect(() =>
      useCase.execute({
        id: 'nivel-2',
        institucionId: 'inst-1',
        codigo: 'PRIMARIA',
        nombre: 'Secundaria',
        orden: 2,
      })
    ).rejects.toThrowError(NivelCodeAlreadyExistsError)
  })

  it('rechaza nombre duplicado en la misma institucion', async () => {
    const repository = new InMemoryNivelRepository()
    const useCase = new CreateNivelUseCase(repository)

    await useCase.execute({
      id: 'nivel-1',
      institucionId: 'inst-1',
      codigo: 'PRIMARIA',
      nombre: 'Primaria',
      orden: 1,
    })

    await expect(() =>
      useCase.execute({
        id: 'nivel-2',
        institucionId: 'inst-1',
        codigo: 'SECUNDARIA',
        nombre: 'Primaria',
        orden: 2,
      })
    ).rejects.toThrowError(NivelNameAlreadyExistsError)
  })

  it('permite editar nivel existente y valida unicidad', async () => {
    const repository = new InMemoryNivelRepository()
    const createUseCase = new CreateNivelUseCase(repository)
    const updateUseCase = new UpdateNivelUseCase(repository)

    await createUseCase.execute({
      id: 'nivel-1',
      institucionId: 'inst-1',
      codigo: 'PRIMARIA',
      nombre: 'Primaria',
      orden: 1,
    })

    await createUseCase.execute({
      id: 'nivel-2',
      institucionId: 'inst-1',
      codigo: 'SECUNDARIA',
      nombre: 'Secundaria',
      orden: 2,
    })

    await expect(() =>
      updateUseCase.execute({
        id: 'nivel-2',
        codigo: 'PRIMARIA',
      })
    ).rejects.toThrowError(NivelCodeAlreadyExistsError)
  })

  it('lista niveles ordenados por campo orden', async () => {
    const repository = new InMemoryNivelRepository()
    const createUseCase = new CreateNivelUseCase(repository)
    const listUseCase = new ListNivelesUseCase(repository)

    await createUseCase.execute({
      id: 'nivel-2',
      institucionId: 'inst-1',
      codigo: 'SECUNDARIA',
      nombre: 'Secundaria',
      orden: 2,
    })

    await createUseCase.execute({
      id: 'nivel-1',
      institucionId: 'inst-1',
      codigo: 'PRIMARIA',
      nombre: 'Primaria',
      orden: 1,
    })

    const listResult = await listUseCase.execute({ institucionId: 'inst-1' })

    expect(listResult[0]?.orden).toBe(1)
    expect(listResult[1]?.orden).toBe(2)
  })

  it('activa/inactiva nivel existente', async () => {
    const repository = new InMemoryNivelRepository()
    const createUseCase = new CreateNivelUseCase(repository)
    const setStatusUseCase = new SetNivelStatusUseCase(repository)

    await createUseCase.execute({
      id: 'nivel-1',
      institucionId: 'inst-1',
      codigo: 'PRIMARIA',
      nombre: 'Primaria',
      orden: 1,
    })

    const inactivated = await setStatusUseCase.execute({
      id: 'nivel-1',
      status: 'inactivo',
    })
    expect(inactivated.estado).toBe('inactivo')

    const activated = await setStatusUseCase.execute({
      id: 'nivel-1',
      status: 'activo',
    })
    expect(activated.estado).toBe('activo')
  })

  it('falla cuando se intenta modificar un nivel inexistente', async () => {
    const repository = new InMemoryNivelRepository()
    const updateUseCase = new UpdateNivelUseCase(repository)

    await expect(() =>
      updateUseCase.execute({
        id: 'no-existe',
        nombre: 'Nuevo nivel',
      })
    ).rejects.toThrowError(NivelNotFoundError)
  })
})
