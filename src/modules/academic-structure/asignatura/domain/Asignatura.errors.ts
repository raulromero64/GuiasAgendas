export class AsignaturaDomainValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AsignaturaDomainValidationError'
  }
}

export class AsignaturaNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontro la Asignatura con id ${id}.`)
    this.name = 'AsignaturaNotFoundError'
  }
}

export class AsignaturaCodeAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`Ya existe una Asignatura con codigo ${code} en la misma Institucion.`)
    this.name = 'AsignaturaCodeAlreadyExistsError'
  }
}

export class AsignaturaNameAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Ya existe una Asignatura con nombre ${name} en la misma Institucion.`)
    this.name = 'AsignaturaNameAlreadyExistsError'
  }
}

export class AsignaturaAlreadyInRequestedStatusError extends Error {
  constructor(status: 'activo' | 'inactivo') {
    super(`La Asignatura ya se encuentra en estado ${status}.`)
    this.name = 'AsignaturaAlreadyInRequestedStatusError'
  }
}
