import { describe, expect, it } from 'vitest'

import { Nivel } from '@/modules/academic-structure/nivel/domain/Nivel'
import {
  NivelAlreadyInRequestedStatusError,
  NivelDomainValidationError,
} from '@/modules/academic-structure/nivel/domain/Nivel.errors'

function createValidNivel(overrides?: Partial<Parameters<typeof Nivel.create>[0]>) {
  return Nivel.create({
    id: 'nivel-primaria',
    institucionId: 'inst-1',
    codigo: 'PRIMARIA',
    nombre: 'Primaria',
    orden: 1,
    ...overrides,
  })
}

describe('Nivel domain', () => {
  it('crea nivel valido en estado activo por defecto', () => {
    const nivel = createValidNivel()

    expect(nivel.toPrimitives().estado).toBe('activo')
  })

  it('rechaza codigo vacio', () => {
    expect(() => createValidNivel({ codigo: ' ' })).toThrowError(NivelDomainValidationError)
  })

  it('rechaza nombre vacio', () => {
    expect(() => createValidNivel({ nombre: ' ' })).toThrowError(NivelDomainValidationError)
  })

  it('rechaza orden no positivo', () => {
    expect(() => createValidNivel({ orden: 0 })).toThrowError(NivelDomainValidationError)
  })

  it('permite actualizar datos del nivel', () => {
    const nivel = createValidNivel()

    nivel.update({
      codigo: 'SECUNDARIA',
      nombre: 'Secundaria',
      orden: 2,
      updatedBy: 'user-1',
    })

    const updated = nivel.toPrimitives()
    expect(updated.codigo).toBe('SECUNDARIA')
    expect(updated.nombre).toBe('Secundaria')
    expect(updated.orden).toBe(2)
    expect(updated.version).toBe(2)
    expect(updated.updatedBy).toBe('user-1')
  })

  it('permite inactivar y activar nivel', () => {
    const nivel = createValidNivel()

    nivel.inactivate()
    expect(nivel.toPrimitives().estado).toBe('inactivo')

    nivel.activate()
    expect(nivel.toPrimitives().estado).toBe('activo')
  })

  it('rechaza activar si ya estaba activo', () => {
    const nivel = createValidNivel()

    expect(() => nivel.activate()).toThrowError(NivelAlreadyInRequestedStatusError)
  })

  it('rechaza inactivar si ya estaba inactivo', () => {
    const nivel = createValidNivel({ activarAlCrear: false })

    expect(() => nivel.inactivate()).toThrowError(NivelAlreadyInRequestedStatusError)
  })
})
