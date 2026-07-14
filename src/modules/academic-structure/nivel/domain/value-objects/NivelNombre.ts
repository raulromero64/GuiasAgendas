import { NivelDomainValidationError } from '@/modules/academic-structure/nivel/domain/Nivel.errors'

export class NivelNombre {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim()

    if (!normalized) {
      throw new NivelDomainValidationError('El nombre del Nivel es obligatorio.')
    }

    if (normalized.length < 3 || normalized.length > 80) {
      throw new NivelDomainValidationError(
        'El nombre del Nivel debe tener entre 3 y 80 caracteres.'
      )
    }

    return new NivelNombre(normalized)
  }

  toString() {
    return this.value
  }
}
