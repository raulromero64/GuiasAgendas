import { AsignaturaDomainValidationError } from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

export class AsignaturaNombre {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim()

    if (!normalized) {
      throw new AsignaturaDomainValidationError('El nombre de la Asignatura es obligatorio.')
    }

    if (normalized.length < 2 || normalized.length > 120) {
      throw new AsignaturaDomainValidationError(
        'El nombre de la Asignatura debe tener entre 2 y 120 caracteres.'
      )
    }

    return new AsignaturaNombre(normalized)
  }

  toString() {
    return this.value
  }
}
