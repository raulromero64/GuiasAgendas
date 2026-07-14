import { DomainValidationError } from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'

interface PeriodoLectivoFechasProps {
  fechaInicio: Date
  fechaFin: Date
}

export class PeriodoLectivoFechas {
  public readonly fechaInicio: Date
  public readonly fechaFin: Date

  private constructor(fechaInicio: Date, fechaFin: Date) {
    this.fechaInicio = new Date(fechaInicio.getTime())
    this.fechaFin = new Date(fechaFin.getTime())
  }

  static create({ fechaInicio, fechaFin }: PeriodoLectivoFechasProps) {
    if (Number.isNaN(fechaInicio.getTime()) || Number.isNaN(fechaFin.getTime())) {
      throw new DomainValidationError('Las fechas del PeriodoLectivo no son validas.')
    }

    if (fechaInicio.getTime() >= fechaFin.getTime()) {
      throw new DomainValidationError('La fecha de inicio debe ser anterior a la fecha de fin.')
    }

    return new PeriodoLectivoFechas(fechaInicio, fechaFin)
  }
}
