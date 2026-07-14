import { GradoDomainValidationError } from '@/modules/academic-structure/grado/domain/Grado.errors'

export class GradoOrden {
  private readonly value: number

  private constructor(value: number) {
    this.value = value
  }

  static create(rawValue: number) {
    if (!Number.isInteger(rawValue)) {
      throw new GradoDomainValidationError('El orden del Grado debe ser un numero entero.')
    }

    if (rawValue <= 0) {
      throw new GradoDomainValidationError('El orden del Grado debe ser un numero positivo.')
    }

    return new GradoOrden(rawValue)
  }

  toNumber() {
    return this.value
  }
}
