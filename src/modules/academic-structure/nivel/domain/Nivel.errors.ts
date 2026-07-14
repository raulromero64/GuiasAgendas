export class NivelDomainValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NivelDomainValidationError'
  }
}

export class NivelNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontro el Nivel con id ${id}.`)
    this.name = 'NivelNotFoundError'
  }
}

export class NivelCodeAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`Ya existe un Nivel con codigo ${code} en la institucion.`)
    this.name = 'NivelCodeAlreadyExistsError'
  }
}

export class NivelNameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Ya existe un Nivel con nombre ${name} en la institucion.`)
    this.name = 'NivelNameAlreadyExistsError'
  }
}

export class NivelAlreadyInRequestedStatusError extends Error {
  constructor(status: 'activo' | 'inactivo') {
    super(`El Nivel ya se encuentra en estado ${status}.`)
    this.name = 'NivelAlreadyInRequestedStatusError'
  }
}
