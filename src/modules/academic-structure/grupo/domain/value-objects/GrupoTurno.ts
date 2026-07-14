import { GrupoDomainValidationError } from '@/modules/academic-structure/grupo/domain/Grupo.errors'

export type TurnoGrupo = 'manana' | 'tarde' | 'noche' | 'jornada_completa'

const TURNO_CATALOG: Record<string, TurnoGrupo> = {
  manana: 'manana',
  mañana: 'manana',
  tarde: 'tarde',
  noche: 'noche',
  'jornada completa': 'jornada_completa',
  jornada_completa: 'jornada_completa',
}

export class GrupoTurno {
  private readonly value: TurnoGrupo

  private constructor(value: TurnoGrupo) {
    this.value = value
  }

  static create(rawValue: string) {
    const normalized = rawValue.trim().toLowerCase()

    if (!normalized) {
      throw new GrupoDomainValidationError('El turno del Grupo es obligatorio.')
    }

    const catalogValue = TURNO_CATALOG[normalized]
    if (!catalogValue) {
      throw new GrupoDomainValidationError(
        'El turno del Grupo debe ser Manana, Tarde, Noche o Jornada Completa.'
      )
    }

    return new GrupoTurno(catalogValue)
  }

  toValue() {
    return this.value
  }
}
