import { GrupoDomainValidationError } from '@/modules/academic-structure/grupo/domain/Grupo.errors'

export class GrupoNombre {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim()

    if (!normalized) {
      throw new GrupoDomainValidationError('El nombre del Grupo es obligatorio.')
    }

    if (normalized.length < 2 || normalized.length > 80) {
      throw new GrupoDomainValidationError(
        'El nombre del Grupo debe tener entre 2 y 80 caracteres.'
      )
    }

    return new GrupoNombre(normalized)
  }

  toString() {
    return this.value
  }
}
