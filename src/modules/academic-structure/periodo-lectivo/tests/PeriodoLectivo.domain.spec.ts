import { describe, expect, it } from 'vitest'

import {
  DomainValidationError,
  PeriodoLectivoAlreadyClosedError,
  PeriodoLectivoPendingAcademicProcessesError,
} from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'
import { PeriodoLectivo } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo'

function createValidPeriodo(overrides?: Partial<Parameters<typeof PeriodoLectivo.create>[0]>) {
  return PeriodoLectivo.create({
    id: 'periodo-2026',
    institucionId: 'inst-1',
    nombre: 'Periodo 2026',
    fechaInicio: new Date('2026-01-10T00:00:00.000Z'),
    fechaFin: new Date('2026-12-20T00:00:00.000Z'),
    ...overrides,
  })
}

describe('PeriodoLectivo domain', () => {
  it('crea un periodo valido en estado planificado por defecto', () => {
    const periodo = createValidPeriodo()

    expect(periodo.toPrimitives().estado).toBe('planificado')
  })

  it('rechaza crear un periodo con fechas invalidas', () => {
    expect(() =>
      createValidPeriodo({
        fechaInicio: new Date('2026-12-20T00:00:00.000Z'),
        fechaFin: new Date('2026-01-10T00:00:00.000Z'),
      })
    ).toThrowError(DomainValidationError)
  })

  it('permite editar un periodo abierto', () => {
    const periodo = createValidPeriodo()

    periodo.update({
      nombre: 'Periodo Escolar 2026',
    })

    expect(periodo.toPrimitives().nombre).toBe('Periodo Escolar 2026')
  })

  it('rechaza editar un periodo cerrado', () => {
    const periodo = createValidPeriodo()
    periodo.close({ hasPendingAcademicProcesses: false })

    expect(() => periodo.update({ nombre: 'Nuevo nombre' })).toThrowError(
      PeriodoLectivoAlreadyClosedError
    )
  })

  it('rechaza cerrar un periodo ya cerrado', () => {
    const periodo = createValidPeriodo()
    periodo.close({ hasPendingAcademicProcesses: false })

    expect(() => periodo.close({ hasPendingAcademicProcesses: false })).toThrowError(
      PeriodoLectivoAlreadyClosedError
    )
  })

  it('rechaza cerrar cuando hay procesos academicos pendientes', () => {
    const periodo = createValidPeriodo()

    expect(() => periodo.close({ hasPendingAcademicProcesses: true })).toThrowError(
      PeriodoLectivoPendingAcademicProcessesError
    )
  })

  it('preserva trazabilidad con version y auditTrail', () => {
    const periodo = createValidPeriodo()
    const initial = periodo.toPrimitives()

    periodo.update({ nombre: 'Periodo Escolar 2026' })

    const afterUpdate = periodo.toPrimitives()
    expect(initial.version).toBe(1)
    expect(afterUpdate.version).toBe(2)
    expect(afterUpdate.auditTrail.length).toBe(initial.auditTrail.length + 1)
  })

  it('expone fechas inmutables en toPrimitives', () => {
    const periodo = createValidPeriodo()
    const snapshot = periodo.toPrimitives()
    snapshot.fechaInicio.setFullYear(2030)

    expect(periodo.toPrimitives().fechaInicio.getUTCFullYear()).toBe(2026)
  })
})
