import { GradoDomainValidationError } from '@/modules/academic-structure/grado/domain/Grado.errors'

export class GradoCodigo {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim().toUpperCase()

    if (!normalized) {
      throw new GradoDomainValidationError('El codigo del Grado es obligatorio.')
    }

    if (normalized.length < 1 || normalized.length > 20) {
      throw new GradoDomainValidationError(
        'El codigo del Grado debe tener entre 1 y 20 caracteres.'
      )
    }

    if (!/^[A-Z0-9_-]+$/.test(normalized)) {
      throw new GradoDomainValidationError(
        'El codigo del Grado solo permite letras, numeros, guion y guion bajo.'
      )
    }

    return new GradoCodigo(normalized)
  }

  toString() {
    return this.value
  }
}
