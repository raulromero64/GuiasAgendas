import { AsignaturaDomainValidationError } from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

export class AsignaturaIntensidadHorariaBase {
  private readonly value: number

  private constructor(value: number) {
    this.value = value
  }

  static create(rawValue: number) {
    if (!Number.isFinite(rawValue)) {
      throw new AsignaturaDomainValidationError(
        'La intensidad horaria base de la Asignatura debe ser un numero valido.'
      )
    }

    if (rawValue < 0) {
      throw new AsignaturaDomainValidationError(
        'La intensidad horaria base de la Asignatura debe ser mayor o igual a cero.'
      )
    }

    return new AsignaturaIntensidadHorariaBase(rawValue)
  }

  toNumber() {
    return this.value
  }
}
