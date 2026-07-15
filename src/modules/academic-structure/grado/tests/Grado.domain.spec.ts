import { describe, expect, it } from 'vitest'

import { Grado } from '@/modules/academic-structure/grado/domain/Grado'
import {
  GradoAlreadyInRequestedStatusError,
  GradoDomainValidationError,
} from '@/modules/academic-structure/grado/domain/Grado.errors'

function createValidGrado(overrides?: Partial<Parameters<typeof Grado.create>[0]>) {
  return Grado.create({
    id: 'grado-1',
    institucionId: 'inst-1',
    periodoLectivoId: 'periodo-2026',
    nivelId: 'nivel-primaria',
    codigo: 'G1',
    nombre: 'Primero',
    orden: 1,
    ...overrides,
  })
}

describe('Grado domain', () => {
  it('crea grado valido en estado activo por defecto', () => {
    const grado = createValidGrado()

    expect(grado.toPrimitives().estado).toBe('activo')
  })

  it('rechaza institucion vacia', () => {
    expect(() => createValidGrado({ institucionId: ' ' })).toThrowError(GradoDomainValidationError)
  })

  it('rechaza periodo lectivo vacio', () => {
    expect(() => createValidGrado({ periodoLectivoId: ' ' })).toThrowError(
      GradoDomainValidationError
    )
  })

  it('rechaza nivel vacio', () => {
    expect(() => createValidGrado({ nivelId: ' ' })).toThrowError(GradoDomainValidationError)
  })

  it('rechaza orden no positivo', () => {
    expect(() => createValidGrado({ orden: 0 })).toThrowError(GradoDomainValidationError)
  })

  it('permite actualizar datos del grado', () => {
    const grado = createValidGrado()

    grado.update({
      codigo: 'G2',
      nombre: 'Segundo',
      orden: 2,
      updatedBy: 'user-1',
    })

    const updated = grado.toPrimitives()
    expect(updated.codigo).toBe('G2')
    expect(updated.nombre).toBe('Segundo')
    expect(updated.orden).toBe(2)
    expect(updated.version).toBe(2)
    expect(updated.updatedBy).toBe('user-1')
  })

  it('permite inactivar y activar grado', () => {
    const grado = createValidGrado()

    grado.inactivate()
    expect(grado.toPrimitives().estado).toBe('inactivo')

    grado.activate()
    expect(grado.toPrimitives().estado).toBe('activo')
  })

  it('rechaza activar si ya estaba activo', () => {
    const grado = createValidGrado()

    expect(() => grado.activate()).toThrowError(GradoAlreadyInRequestedStatusError)
  })

  it('rechaza inactivar si ya estaba inactivo', () => {
    const grado = createValidGrado({ activarAlCrear: false })

    expect(() => grado.inactivate()).toThrowError(GradoAlreadyInRequestedStatusError)
  })
})
