import { describe, expect, it } from 'vitest'

import { Asignatura } from '@/modules/academic-structure/asignatura/domain/Asignatura'
import {
  AsignaturaAlreadyInRequestedStatusError,
  AsignaturaDomainValidationError,
} from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

function createValidAsignatura(overrides?: Partial<Parameters<typeof Asignatura.create>[0]>) {
  return Asignatura.create({
    id: 'asignatura-1',
    institucionId: 'inst-1',
    codigo: 'MAT101',
    nombre: 'Matematicas',
    tipo: 'Obligatoria',
    intensidadHorariaBase: 4,
    ...overrides,
  })
}

describe('Asignatura domain', () => {
  it('crea asignatura valida en estado activo por defecto', () => {
    const asignatura = createValidAsignatura()

    expect(asignatura.toPrimitives().estado).toBe('activo')
  })

  it('rechaza institucion vacia', () => {
    expect(() => createValidAsignatura({ institucionId: ' ' })).toThrowError(
      AsignaturaDomainValidationError
    )
  })

  it('rechaza tipo fuera de catalogo', () => {
    expect(() => createValidAsignatura({ tipo: 'Libre' })).toThrowError(
      AsignaturaDomainValidationError
    )
  })

  it('rechaza intensidad horaria negativa', () => {
    expect(() => createValidAsignatura({ intensidadHorariaBase: -1 })).toThrowError(
      AsignaturaDomainValidationError
    )
  })

  it('permite intensidad horaria igual a cero', () => {
    const asignatura = createValidAsignatura({ intensidadHorariaBase: 0 })

    expect(asignatura.toPrimitives().intensidadHorariaBase).toBe(0)
  })

  it('permite actualizar datos de la asignatura', () => {
    const asignatura = createValidAsignatura()

    asignatura.update({
      codigo: 'MAT102',
      nombre: 'Matematicas Avanzadas',
      tipo: 'Electiva',
      intensidadHorariaBase: 6,
      updatedBy: 'user-1',
    })

    const updated = asignatura.toPrimitives()
    expect(updated.codigo).toBe('MAT102')
    expect(updated.nombre).toBe('Matematicas Avanzadas')
    expect(updated.tipo).toBe('electiva')
    expect(updated.intensidadHorariaBase).toBe(6)
    expect(updated.version).toBe(2)
    expect(updated.updatedBy).toBe('user-1')
  })

  it('declara relacion futura por plan curricular y otras dependencias', () => {
    const asignatura = createValidAsignatura()

    expect(asignatura.toPrimitives().relacionesPermitidas).toEqual({
      planCurricular: true,
      docentes: true,
      horarios: true,
      calificaciones: true,
      planeacionAcademica: true,
    })
  })

  it('permite inactivar y activar asignatura', () => {
    const asignatura = createValidAsignatura()

    asignatura.inactivate()
    expect(asignatura.toPrimitives().estado).toBe('inactivo')

    asignatura.activate()
    expect(asignatura.toPrimitives().estado).toBe('activo')
  })

  it('rechaza activar si ya estaba activa', () => {
    const asignatura = createValidAsignatura()

    expect(() => asignatura.activate()).toThrowError(AsignaturaAlreadyInRequestedStatusError)
  })
})
