export class GradoDomainValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GradoDomainValidationError'
  }
}

export class GradoNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontro el Grado con id ${id}.`)
    this.name = 'GradoNotFoundError'
  }
}

export class GradoCodeAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`Ya existe un Grado con codigo ${code} en el mismo Nivel y Periodo.`)
    this.name = 'GradoCodeAlreadyExistsError'
  }
}

export class GradoNameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Ya existe un Grado con nombre ${name} en el mismo Nivel y Periodo.`)
    this.name = 'GradoNameAlreadyExistsError'
  }
}

export class GradoAlreadyInRequestedStatusError extends Error {
  constructor(status: 'activo' | 'inactivo') {
    super(`El Grado ya se encuentra en estado ${status}.`)
    this.name = 'GradoAlreadyInRequestedStatusError'
  }
}
