export class DomainValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DomainValidationError'
  }
}

export class PeriodoLectivoAlreadyClosedError extends Error {
  constructor() {
    super('El PeriodoLectivo ya se encuentra cerrado.')
    this.name = 'PeriodoLectivoAlreadyClosedError'
  }
}

export class PeriodoLectivoPendingAcademicProcessesError extends Error {
  constructor() {
    super('No se puede cerrar el PeriodoLectivo porque existen procesos academicos pendientes.')
    this.name = 'PeriodoLectivoPendingAcademicProcessesError'
  }
}

export class PeriodoLectivoAlreadyActiveError extends Error {
  constructor() {
    super('Ya existe un PeriodoLectivo activo en la institucion.')
    this.name = 'PeriodoLectivoAlreadyActiveError'
  }
}

export class PeriodoLectivoNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontro el PeriodoLectivo con id ${id}.`)
    this.name = 'PeriodoLectivoNotFoundError'
  }
}
