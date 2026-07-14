import { NivelDomainValidationError } from '@/modules/academic-structure/nivel/domain/Nivel.errors'

export class NivelOrden {
  private readonly value: number

  private constructor(value: number) {
    this.value = value
  }

  static create(rawValue: number) {
    if (!Number.isInteger(rawValue)) {
      throw new NivelDomainValidationError('El orden del Nivel debe ser un numero entero.')
    }

    if (rawValue <= 0) {
      throw new NivelDomainValidationError('El orden del Nivel debe ser un numero positivo.')
    }

    return new NivelOrden(rawValue)
  }

  toNumber() {
    return this.value
  }
}
