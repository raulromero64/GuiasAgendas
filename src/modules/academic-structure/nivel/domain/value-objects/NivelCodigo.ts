import { NivelDomainValidationError } from '@/modules/academic-structure/nivel/domain/Nivel.errors'

export class NivelCodigo {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim().toUpperCase()

    if (!normalized) {
      throw new NivelDomainValidationError('El codigo del Nivel es obligatorio.')
    }

    if (normalized.length < 2 || normalized.length > 20) {
      throw new NivelDomainValidationError(
        'El codigo del Nivel debe tener entre 2 y 20 caracteres.'
      )
    }

    if (!/^[A-Z0-9_-]+$/.test(normalized)) {
      throw new NivelDomainValidationError(
        'El codigo del Nivel solo permite letras, numeros, guion y guion bajo.'
      )
    }

    return new NivelCodigo(normalized)
  }

  toString() {
    return this.value
  }
}
