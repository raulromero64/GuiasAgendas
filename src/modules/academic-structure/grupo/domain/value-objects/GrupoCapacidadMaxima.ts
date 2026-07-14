import { GrupoDomainValidationError } from '@/modules/academic-structure/grupo/domain/Grupo.errors'

export class GrupoCapacidadMaxima {
  private readonly value: number

  private constructor(value: number) {
    this.value = value
  }

  static create(rawValue: number) {
    if (!Number.isInteger(rawValue)) {
      throw new GrupoDomainValidationError(
        'La capacidad maxima del Grupo debe ser un numero entero.'
      )
    }

    if (rawValue <= 0) {
      throw new GrupoDomainValidationError('La capacidad maxima del Grupo debe ser mayor que cero.')
    }

    return new GrupoCapacidadMaxima(rawValue)
  }

  toNumber() {
    return this.value
  }
}
