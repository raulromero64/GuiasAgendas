import { AsignaturaDomainValidationError } from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

export type TipoAsignatura = 'obligatoria' | 'electiva'

const TIPO_CATALOG: Record<string, TipoAsignatura> = {
  obligatoria: 'obligatoria',
  electiva: 'electiva',
}

export class AsignaturaTipo {
  private readonly value: TipoAsignatura

  private constructor(value: TipoAsignatura) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim().toLowerCase()

    if (!normalized) {
      throw new AsignaturaDomainValidationError('El tipo de la Asignatura es obligatorio.')
    }

    const catalogValue = TIPO_CATALOG[normalized]
    if (!catalogValue) {
      throw new AsignaturaDomainValidationError(
        'El tipo de la Asignatura debe ser Obligatoria o Electiva.'
      )
    }

    return new AsignaturaTipo(catalogValue)
  }

  toValue() {
    return this.value
  }
}
