import {
  GradoAlreadyInRequestedStatusError,
  GradoDomainValidationError,
} from '@/modules/academic-structure/grado/domain/Grado.errors'
import { GradoCodigo } from '@/modules/academic-structure/grado/domain/value-objects/GradoCodigo'
import { GradoNombre } from '@/modules/academic-structure/grado/domain/value-objects/GradoNombre'
import { GradoOrden } from '@/modules/academic-structure/grado/domain/value-objects/GradoOrden'

export type EstadoGrado = 'activo' | 'inactivo'

interface GradoProps {
  id: string
  institucionId: string
  periodoLectivoId: string
  nivelId: string
  codigo: string
  nombre: string
  orden: number
  estado: EstadoGrado
  createdAt: Date
  updatedAt: Date
}

interface CreateGradoProps {
  id: string
  institucionId: string
  periodoLectivoId: string
  nivelId: string
  codigo: string
  nombre: string
  orden: number
  activarAlCrear?: boolean
}

interface UpdateGradoProps {
  codigo?: string
  nombre?: string
  orden?: number
}

export class Grado {
  private props: GradoProps

  private constructor(props: GradoProps) {
    this.props = props
  }

  static create({
    id,
    institucionId,
    periodoLectivoId,
    nivelId,
    codigo,
    nombre,
    orden,
    activarAlCrear = true,
  }: CreateGradoProps) {
    if (!id.trim()) {
      throw new GradoDomainValidationError('El id del Grado es obligatorio.')
    }

    if (!institucionId.trim()) {
      throw new GradoDomainValidationError('La institucion es obligatoria para crear un Grado.')
    }

    if (!periodoLectivoId.trim()) {
      throw new GradoDomainValidationError('El periodo lectivo es obligatorio para crear un Grado.')
    }

    if (!nivelId.trim()) {
      throw new GradoDomainValidationError('El nivel es obligatorio para crear un Grado.')
    }

    const validatedCodigo = GradoCodigo.create(codigo)
    const validatedNombre = GradoNombre.create(nombre)
    const validatedOrden = GradoOrden.create(orden)
    const now = new Date()

    return new Grado({
      id,
      institucionId,
      periodoLectivoId,
      nivelId,
      codigo: validatedCodigo.toString(),
      nombre: validatedNombre.toString(),
      orden: validatedOrden.toNumber(),
      estado: activarAlCrear ? 'activo' : 'inactivo',
      createdAt: now,
      updatedAt: now,
    })
  }

  static rehydrate(props: GradoProps) {
    return new Grado(props)
  }

  update({ codigo, nombre, orden }: UpdateGradoProps) {
    const nextCodigo = codigo ? GradoCodigo.create(codigo).toString() : this.props.codigo
    const nextNombre = nombre ? GradoNombre.create(nombre).toString() : this.props.nombre
    const nextOrden =
      typeof orden === 'number' ? GradoOrden.create(orden).toNumber() : this.props.orden

    this.props = {
      ...this.props,
      codigo: nextCodigo,
      nombre: nextNombre,
      orden: nextOrden,
      updatedAt: new Date(),
    }
  }

  activate() {
    if (this.props.estado === 'activo') {
      throw new GradoAlreadyInRequestedStatusError('activo')
    }

    this.props = {
      ...this.props,
      estado: 'activo',
      updatedAt: new Date(),
    }
  }

  inactivate() {
    if (this.props.estado === 'inactivo') {
      throw new GradoAlreadyInRequestedStatusError('inactivo')
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

  get codigo() {
    return this.props.codigo
  }

  get nombre() {
    return this.props.nombre
  }

  toPrimitives() {
    return {
      ...this.props,
      createdAt: new Date(this.props.createdAt.getTime()),
      updatedAt: new Date(this.props.updatedAt.getTime()),
    }
  }
}
