import { AsignaturaDomainValidationError } from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

export class AsignaturaCodigo {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim().toUpperCase()

    if (!normalized) {
      throw new AsignaturaDomainValidationError('El codigo de la Asignatura es obligatorio.')
    }

    if (normalized.length < 1 || normalized.length > 20) {
      throw new AsignaturaDomainValidationError(
        'El codigo de la Asignatura debe tener entre 1 y 20 caracteres.'
      )
    }

    if (!/^[A-Z0-9_-]+$/.test(normalized)) {
      throw new AsignaturaDomainValidationError(
        'El codigo de la Asignatura solo permite letras, numeros, guion y guion bajo.'
      )
    }

    return new AsignaturaCodigo(normalized)
  }

  toString() {
    return this.value
  }
}
