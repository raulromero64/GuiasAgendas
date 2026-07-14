import { GradoDomainValidationError } from '@/modules/academic-structure/grado/domain/Grado.errors'

export class GradoNombre {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim()

    if (!normalized) {
      throw new GradoDomainValidationError('El nombre del Grado es obligatorio.')
    }

    if (normalized.length < 2 || normalized.length > 80) {
      throw new GradoDomainValidationError(
        'El nombre del Grado debe tener entre 2 y 80 caracteres.'
      )
    }

    return new GradoNombre(normalized)
  }

  toString() {
    return this.value
  }
}
