import { GrupoDomainValidationError } from '@/modules/academic-structure/grupo/domain/Grupo.errors'

export class GrupoCodigo {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim().toUpperCase()

    if (!normalized) {
      throw new GrupoDomainValidationError('El codigo del Grupo es obligatorio.')
    }

    if (normalized.length < 1 || normalized.length > 20) {
      throw new GrupoDomainValidationError(
        'El codigo del Grupo debe tener entre 1 y 20 caracteres.'
      )
    }

    if (!/^[A-Z0-9_-]+$/.test(normalized)) {
      throw new GrupoDomainValidationError(
        'El codigo del Grupo solo permite letras, numeros, guion y guion bajo.'
      )
    }

    return new GrupoCodigo(normalized)
  }

  toString() {
    return this.value
  }
}
