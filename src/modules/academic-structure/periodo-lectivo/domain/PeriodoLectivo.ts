import {
  DomainValidationError,
  PeriodoLectivoAlreadyClosedError,
  PeriodoLectivoPendingAcademicProcessesError,
} from '@/modules/academic-structure/periodo-lectivo/domain/PeriodoLectivo.errors'
import { PeriodoLectivoFechas } from '@/modules/academic-structure/periodo-lectivo/domain/value-objects/PeriodoLectivoFechas'
import { PeriodoLectivoNombre } from '@/modules/academic-structure/periodo-lectivo/domain/value-objects/PeriodoLectivoNombre'

export type EstadoPeriodoLectivo = 'planificado' | 'activo' | 'cerrado'
export type PeriodoLectivoAuditAction = 'creado' | 'actualizado' | 'activado' | 'cerrado'

interface AuditMetadata {
  actorId?: string
  reason?: string
}

interface PeriodoLectivoAuditEntry {
  action: PeriodoLectivoAuditAction
  at: Date
  actorId?: string
  reason?: string
}

interface PeriodoLectivoProps {
  id: string
  institucionId: string
  nombre: string
  fechaInicio: Date
  fechaFin: Date
  estado: EstadoPeriodoLectivo
  createdAt: Date
  updatedAt: Date
  version: number
  auditTrail: PeriodoLectivoAuditEntry[]
}

interface CreatePeriodoLectivoProps {
  id: string
  institucionId: string
  nombre: string
  fechaInicio: Date
  fechaFin: Date
  activarAlCrear?: boolean
}

interface UpdatePeriodoLectivoProps {
  nombre?: string
  fechaInicio?: Date
  fechaFin?: Date
}

interface ClosePeriodoLectivoProps extends AuditMetadata {
  hasPendingAcademicProcesses: boolean
}

export class PeriodoLectivo {
  private props: PeriodoLectivoProps

  private constructor(props: PeriodoLectivoProps) {
    this.props = props
  }

  private static createAuditEntry(
    action: PeriodoLectivoAuditAction,
    metadata?: AuditMetadata
  ): PeriodoLectivoAuditEntry {
    return {
      action,
      at: new Date(),
      actorId: metadata?.actorId,
      reason: metadata?.reason,
    }
  }

  private applyChange(
    update: Omit<Partial<PeriodoLectivoProps>, 'version' | 'auditTrail'>,
    action: PeriodoLectivoAuditAction,
    metadata?: AuditMetadata
  ) {
    this.props = {
      ...this.props,
      ...update,
      updatedAt: new Date(),
      version: this.props.version + 1,
      auditTrail: [...this.props.auditTrail, PeriodoLectivo.createAuditEntry(action, metadata)],
    }
  }

  static create({
    id,
    institucionId,
    nombre,
    fechaInicio,
    fechaFin,
    activarAlCrear = false,
  }: CreatePeriodoLectivoProps) {
    if (!id.trim()) {
      throw new DomainValidationError('El id del PeriodoLectivo es obligatorio.')
    }

    if (!institucionId.trim()) {
      throw new DomainValidationError('La institucion es obligatoria para crear un PeriodoLectivo.')
    }

    const validatedNombre = PeriodoLectivoNombre.create(nombre)
    const validatedFechas = PeriodoLectivoFechas.create({ fechaInicio, fechaFin })
    const now = new Date()

    return new PeriodoLectivo({
      id,
      institucionId,
      nombre: validatedNombre.toString(),
      fechaInicio: validatedFechas.fechaInicio,
      fechaFin: validatedFechas.fechaFin,
      estado: activarAlCrear ? 'activo' : 'planificado',
      createdAt: now,
      updatedAt: now,
      version: 1,
      auditTrail: [PeriodoLectivo.createAuditEntry('creado')],
    })
  }

  static rehydrate(props: PeriodoLectivoProps) {
    return new PeriodoLectivo(props)
  }

  update({ nombre, fechaInicio, fechaFin }: UpdatePeriodoLectivoProps) {
    if (this.props.estado === 'cerrado') {
      throw new PeriodoLectivoAlreadyClosedError()
    }

    const nextNombre = nombre ? PeriodoLectivoNombre.create(nombre).toString() : this.props.nombre
    const nextFechaInicio = fechaInicio ?? this.props.fechaInicio
    const nextFechaFin = fechaFin ?? this.props.fechaFin

    const validatedFechas = PeriodoLectivoFechas.create({
      fechaInicio: nextFechaInicio,
      fechaFin: nextFechaFin,
    })

    this.applyChange(
      {
        nombre: nextNombre,
        fechaInicio: validatedFechas.fechaInicio,
        fechaFin: validatedFechas.fechaFin,
      },
      'actualizado'
    )
  }

  markAsActive(metadata?: AuditMetadata) {
    if (this.props.estado === 'cerrado') {
      throw new PeriodoLectivoAlreadyClosedError()
    }

    this.applyChange({ estado: 'activo' }, 'activado', metadata)
  }

  close({ hasPendingAcademicProcesses, actorId, reason }: ClosePeriodoLectivoProps) {
    if (this.props.estado === 'cerrado') {
      throw new PeriodoLectivoAlreadyClosedError()
    }

    if (hasPendingAcademicProcesses) {
      throw new PeriodoLectivoPendingAcademicProcessesError()
    }

    this.applyChange({ estado: 'cerrado' }, 'cerrado', { actorId, reason })
  }

  get id() {
    return this.props.id
  }

  get institucionId() {
    return this.props.institucionId
  }

  get estado() {
    return this.props.estado
  }

  toPrimitives() {
    return {
      ...this.props,
      fechaInicio: new Date(this.props.fechaInicio.getTime()),
      fechaFin: new Date(this.props.fechaFin.getTime()),
      createdAt: new Date(this.props.createdAt.getTime()),
      updatedAt: new Date(this.props.updatedAt.getTime()),
      auditTrail: this.props.auditTrail.map((entry) => ({
        ...entry,
        at: new Date(entry.at.getTime()),
      })),
    }
  }
}
