import {
  GrupoAlreadyInRequestedStatusError,
  GrupoDomainValidationError,
} from '@/modules/academic-structure/grupo/domain/Grupo.errors'
import { GrupoCapacidadMaxima } from '@/modules/academic-structure/grupo/domain/value-objects/GrupoCapacidadMaxima'
import { GrupoCodigo } from '@/modules/academic-structure/grupo/domain/value-objects/GrupoCodigo'
import { GrupoNombre } from '@/modules/academic-structure/grupo/domain/value-objects/GrupoNombre'
import {
  GrupoTurno,
  type TurnoGrupo,
} from '@/modules/academic-structure/grupo/domain/value-objects/GrupoTurno'

export type EstadoGrupo = 'activo' | 'inactivo'

interface GrupoProps {
  id: string
  institucionId: string
  periodoLectivoId: string
  nivelId: string
  gradoId: string
  codigo: string
  nombre: string
  capacidadMaxima: number
  turno: TurnoGrupo
  estado: EstadoGrupo
  futurasRelaciones: {
    matriculas: true
    horarios: true
    asistencia: true
    calificaciones: true
  }
  createdAt: Date
  updatedAt: Date
  version: number
  updatedBy: string
}

interface CreateGrupoProps {
  id: string
  institucionId: string
  periodoLectivoId: string
  nivelId: string
  gradoId: string
  codigo: string
  nombre: string
  capacidadMaxima: number
  turno: string
  activarAlCrear?: boolean
}

interface UpdateGrupoProps {
  codigo?: string
  nombre?: string
  capacidadMaxima?: number
  turno?: string
  updatedBy: string
}

export class Grupo {
  private props: GrupoProps

  private constructor(props: GrupoProps) {
    this.props = props
  }

  static create({
    id,
    institucionId,
    periodoLectivoId,
    nivelId,
    gradoId,
    codigo,
    nombre,
    capacidadMaxima,
    turno,
    activarAlCrear = true,
  }: CreateGrupoProps) {
    if (!id.trim()) {
      throw new GrupoDomainValidationError('El id del Grupo es obligatorio.')
    }

    if (!institucionId.trim()) {
      throw new GrupoDomainValidationError('La institucion es obligatoria para crear un Grupo.')
    }

    if (!periodoLectivoId.trim()) {
      throw new GrupoDomainValidationError('El periodo lectivo es obligatorio para crear un Grupo.')
    }

    if (!nivelId.trim()) {
      throw new GrupoDomainValidationError('El nivel es obligatorio para crear un Grupo.')
    }

    if (!gradoId.trim()) {
      throw new GrupoDomainValidationError('El grado es obligatorio para crear un Grupo.')
    }

    const validatedCodigo = GrupoCodigo.create(codigo)
    const validatedNombre = GrupoNombre.create(nombre)
    const validatedCapacidadMaxima = GrupoCapacidadMaxima.create(capacidadMaxima)
    const validatedTurno = GrupoTurno.create(turno)
    const now = new Date()

    return new Grupo({
      id,
      institucionId,
      periodoLectivoId,
      nivelId,
      gradoId,
      codigo: validatedCodigo.toString(),
      nombre: validatedNombre.toString(),
      capacidadMaxima: validatedCapacidadMaxima.toNumber(),
      turno: validatedTurno.toValue(),
      estado: activarAlCrear ? 'activo' : 'inactivo',
      futurasRelaciones: {
        matriculas: true,
        horarios: true,
        asistencia: true,
        calificaciones: true,
      },
      version: 1,
      updatedBy: 'system',
      createdAt: now,
      updatedAt: now,
    })
  }

  static rehydrate(props: GrupoProps) {
    return new Grupo(props)
  }

  update({ codigo, nombre, capacidadMaxima, turno, updatedBy }: UpdateGrupoProps) {
    const nextCodigo = codigo ? GrupoCodigo.create(codigo).toString() : this.props.codigo
    const nextNombre = nombre ? GrupoNombre.create(nombre).toString() : this.props.nombre
    const nextCapacidadMaxima =
      typeof capacidadMaxima === 'number'
        ? GrupoCapacidadMaxima.create(capacidadMaxima).toNumber()
        : this.props.capacidadMaxima
    const nextTurno = turno ? GrupoTurno.create(turno).toValue() : this.props.turno

    this.props = {
      ...this.props,
      codigo: nextCodigo,
      nombre: nextNombre,
      capacidadMaxima: nextCapacidadMaxima,
      turno: nextTurno,
      version: this.props.version + 1,
      updatedBy,
      updatedAt: new Date(),
    }
  }

  activate() {
    if (this.props.estado === 'activo') {
      throw new GrupoAlreadyInRequestedStatusError('activo')
    }

    this.props = {
      ...this.props,
      estado: 'activo',
      updatedAt: new Date(),
    }
  }

  inactivate() {
    if (this.props.estado === 'inactivo') {
      throw new GrupoAlreadyInRequestedStatusError('inactivo')
    }

    this.props = {
      ...this.props,
      estado: 'inactivo',
      updatedAt: new Date(),
    }
  }

  get id() {
    return this.props.id
  }

  get institucionId() {
    return this.props.institucionId
  }

  get periodoLectivoId() {
    return this.props.periodoLectivoId
  }

  get nivelId() {
    return this.props.nivelId
  }

  get gradoId() {
    return this.props.gradoId
  }

  get codigo() {
    return this.props.codigo
  }

  get nombre() {
    return this.props.nombre
  }

  get version() {
    return this.props.version
  }

  toPrimitives() {
    return {
      ...this.props,
      createdAt: new Date(this.props.createdAt.getTime()),
      updatedAt: new Date(this.props.updatedAt.getTime()),
    }
  }
}
