import { describe, expect, it } from 'vitest'

import { Grupo } from '@/modules/academic-structure/grupo/domain/Grupo'
import {
  GrupoAlreadyInRequestedStatusError,
  GrupoDomainValidationError,
} from '@/modules/academic-structure/grupo/domain/Grupo.errors'

function createValidGrupo(overrides?: Partial<Parameters<typeof Grupo.create>[0]>) {
  return Grupo.create({
    id: 'grupo-1',
    institucionId: 'inst-1',
    periodoLectivoId: 'periodo-2026',
    nivelId: 'nivel-primaria',
    gradoId: 'grado-1',
    codigo: 'A',
    nombre: 'Grupo A',
    capacidadMaxima: 35,
    turno: 'Manana',
    ...overrides,
  })
}

describe('Grupo domain', () => {
  it('crea grupo valido en estado activo por defecto', () => {
    const grupo = createValidGrupo()

    expect(grupo.toPrimitives().estado).toBe('activo')
  })

  it('rechaza grado vacio', () => {
    expect(() => createValidGrupo({ gradoId: ' ' })).toThrowError(GrupoDomainValidationError)
  })

  it('rechaza capacidad maxima no positiva', () => {
    expect(() => createValidGrupo({ capacidadMaxima: 0 })).toThrowError(GrupoDomainValidationError)
  })

  it('rechaza turno fuera de catalogo', () => {
    expect(() => createValidGrupo({ turno: 'Madrugada' })).toThrowError(GrupoDomainValidationError)
  })

  it('permite actualizar datos del grupo', () => {
    const grupo = createValidGrupo()

    grupo.update({
      codigo: 'B',
      nombre: 'Grupo B',
      capacidadMaxima: 40,
      turno: 'Tarde',
    })

    const updated = grupo.toPrimitives()
    expect(updated.codigo).toBe('B')
    expect(updated.nombre).toBe('Grupo B')
    expect(updated.capacidadMaxima).toBe(40)
    expect(updated.turno).toBe('tarde')
  })

  it('declara preparacion para relaciones futuras', () => {
    const grupo = createValidGrupo()

    expect(grupo.toPrimitives().futurasRelaciones).toEqual({
      matriculas: true,
      horarios: true,
      asistencia: true,
      calificaciones: true,
    })
  })

  it('permite inactivar y activar grupo', () => {
    const grupo = createValidGrupo()

    grupo.inactivate()
    expect(grupo.toPrimitives().estado).toBe('inactivo')

    grupo.activate()
    expect(grupo.toPrimitives().estado).toBe('activo')
  })

  it('rechaza activar si ya estaba activo', () => {
    const grupo = createValidGrupo()

    expect(() => grupo.activate()).toThrowError(GrupoAlreadyInRequestedStatusError)
  })
})
