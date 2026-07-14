import { DomainValidationError } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'

export class PeriodoLectivoNombre {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim()

    if (normalized.length < 3) {
      throw new DomainValidationError(
        'El nombre del PeriodoLectivo debe tener al menos 3 caracteres.'
      )
    }

    if (normalized.length > 80) {
      throw new DomainValidationError(
        'El nombre del PeriodoLectivo no puede superar 80 caracteres.'
      )
    }

    return new PeriodoLectivoNombre(normalized)
  }

  toString() {
    return this.value
  }
}
