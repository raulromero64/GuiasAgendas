import {
  AsignaturaAlreadyInRequestedStatusError,
  AsignaturaDomainValidationError,
} from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'
import { AsignaturaCodigo } from '@/modules/academic-structure/asignatura/domain/value-objects/AsignaturaCodigo'
import { AsignaturaIntensidadHorariaBase } from '@/modules/academic-structure/asignatura/domain/value-objects/AsignaturaIntensidadHorariaBase'
import { AsignaturaNombre } from '@/modules/academic-structure/asignatura/domain/value-objects/AsignaturaNombre'
import {
  AsignaturaTipo,
  type TipoAsignatura,
} from '@/modules/academic-structure/asignatura/domain/value-objects/AsignaturaTipo'

export type EstadoAsignatura = 'activo' | 'inactivo'

interface AsignaturaProps {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  tipo: TipoAsignatura
  intensidadHorariaBase: number
  relacionesPermitidas: {
    planCurricular: true
    docentes: true
    horarios: true
    calificaciones: true
    planeacionAcademica: true
  }
  estado: EstadoAsignatura
  version: number
  updatedBy: string
  createdAt: Date
  updatedAt: Date
}

interface CreateAsignaturaProps {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  tipo: string
  intensidadHorariaBase: number
  activarAlCrear?: boolean
}

interface UpdateAsignaturaProps {
  codigo?: string
  nombre?: string
  tipo?: string
  intensidadHorariaBase?: number
  updatedBy: string
}

export class Asignatura {
  private props: AsignaturaProps

  private constructor(props: AsignaturaProps) {
    this.props = props
  }

  static create({
    id,
    institucionId,
    codigo,
    nombre,
    tipo,
    intensidadHorariaBase,
    activarAlCrear = true,
  }: CreateAsignaturaProps) {
    if (!id.trim()) {
      throw new AsignaturaDomainValidationError('El id de la Asignatura es obligatorio.')
    }

    if (!institucionId.trim()) {
      throw new AsignaturaDomainValidationError(
        'La institucion es obligatoria para crear una Asignatura.'
      )
    }

    const validatedCodigo = AsignaturaCodigo.create(codigo)
    const validatedNombre = AsignaturaNombre.create(nombre)
    const validatedTipo = AsignaturaTipo.create(tipo)
    const validatedIntensidad = AsignaturaIntensidadHorariaBase.create(intensidadHorariaBase)
    const now = new Date()

    return new Asignatura({
      id,
      institucionId,
      codigo: validatedCodigo.toString(),
      nombre: validatedNombre.toString(),
      tipo: validatedTipo.toValue(),
      intensidadHorariaBase: validatedIntensidad.toNumber(),
      relacionesPermitidas: {
        planCurricular: true,
        docentes: true,
        horarios: true,
        calificaciones: true,
        planeacionAcademica: true,
      },
      estado: activarAlCrear ? 'activo' : 'inactivo',
      version: 1,
      updatedBy: 'system',
      createdAt: now,
      updatedAt: now,
    })
  }

  static rehydrate(props: AsignaturaProps) {
    return new Asignatura(props)
  }

  update({ codigo, nombre, tipo, intensidadHorariaBase, updatedBy }: UpdateAsignaturaProps) {
    const nextCodigo = codigo ? AsignaturaCodigo.create(codigo).toString() : this.props.codigo
    const nextNombre = nombre ? AsignaturaNombre.create(nombre).toString() : this.props.nombre
    const nextTipo = tipo ? AsignaturaTipo.create(tipo).toValue() : this.props.tipo
    const nextIntensidadHorariaBase =
      typeof intensidadHorariaBase === 'number'
        ? AsignaturaIntensidadHorariaBase.create(intensidadHorariaBase).toNumber()
        : this.props.intensidadHorariaBase

    this.props = {
      ...this.props,
      codigo: nextCodigo,
      nombre: nextNombre,
      tipo: nextTipo,
      intensidadHorariaBase: nextIntensidadHorariaBase,
      version: this.props.version + 1,
      updatedBy,
      updatedAt: new Date(),
    }
  }

  activate() {
    if (this.props.estado === 'activo') {
      throw new AsignaturaAlreadyInRequestedStatusError('activo')
    }

    this.props = {
      ...this.props,
      estado: 'activo',
      updatedAt: new Date(),
    }
  }

  inactivate() {
    if (this.props.estado === 'inactivo') {
      throw new AsignaturaAlreadyInRequestedStatusError('inactivo')
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
