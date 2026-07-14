export class GrupoDomainValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GrupoDomainValidationError'
  }
}

export class GrupoNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontro el Grupo con id ${id}.`)
    this.name = 'GrupoNotFoundError'
  }
}

export class GrupoCodeAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`Ya existe un Grupo con codigo ${code} en el mismo Grado y Periodo.`)
    this.name = 'GrupoCodeAlreadyExistsError'
  }
}

export class GrupoNameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Ya existe un Grupo con nombre ${name} en el mismo Grado y Periodo.`)
    this.name = 'GrupoNameAlreadyExistsError'
  }
}

export class GrupoAlreadyInRequestedStatusError extends Error {
  constructor(status: 'activo' | 'inactivo') {
    super(`El Grupo ya se encuentra en estado ${status}.`)
    this.name = 'GrupoAlreadyInRequestedStatusError'
  }
}
