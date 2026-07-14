import {
  NivelAlreadyInRequestedStatusError,
  NivelDomainValidationError,
} from '@/modules/academic-structure/nivel/domain/Nivel.errors'
import { NivelCodigo } from '@/modules/academic-structure/nivel/domain/value-objects/NivelCodigo'
import { NivelNombre } from '@/modules/academic-structure/nivel/domain/value-objects/NivelNombre'
import { NivelOrden } from '@/modules/academic-structure/nivel/domain/value-objects/NivelOrden'

export type EstadoNivel = 'activo' | 'inactivo'

interface NivelProps {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  orden: number
  estado: EstadoNivel
  createdAt: Date
  updatedAt: Date
}

interface CreateNivelProps {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  orden: number
  activarAlCrear?: boolean
}

interface UpdateNivelProps {
  codigo?: string
  nombre?: string
  orden?: number
}

export class Nivel {
  private props: NivelProps

  private constructor(props: NivelProps) {
    this.props = props
  }

  static create({
    id,
    institucionId,
    codigo,
    nombre,
    orden,
    activarAlCrear = true,
  }: CreateNivelProps) {
    if (!id.trim()) {
      throw new NivelDomainValidationError('El id del Nivel es obligatorio.')
    }

    if (!institucionId.trim()) {
      throw new NivelDomainValidationError('La institucion es obligatoria para crear un Nivel.')
    }

    const validatedCodigo = NivelCodigo.create(codigo)
    const validatedNombre = NivelNombre.create(nombre)
    const validatedOrden = NivelOrden.create(orden)
    const now = new Date()

    return new Nivel({
      id,
      institucionId,
      codigo: validatedCodigo.toString(),
      nombre: validatedNombre.toString(),
      orden: validatedOrden.toNumber(),
      estado: activarAlCrear ? 'activo' : 'inactivo',
      createdAt: now,
      updatedAt: now,
    })
  }

  static rehydrate(props: NivelProps) {
    return new Nivel(props)
  }

  update({ codigo, nombre, orden }: UpdateNivelProps) {
    const nextCodigo = codigo ? NivelCodigo.create(codigo).toString() : this.props.codigo
    const nextNombre = nombre ? NivelNombre.create(nombre).toString() : this.props.nombre
    const nextOrden =
      typeof orden === 'number' ? NivelOrden.create(orden).toNumber() : this.props.orden

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
      throw new NivelAlreadyInRequestedStatusError('activo')
    }

    this.props = {
      ...this.props,
      estado: 'activo',
      updatedAt: new Date(),
    }
  }

  inactivate() {
    if (this.props.estado === 'inactivo') {
      throw new NivelAlreadyInRequestedStatusError('inactivo')
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

  toPrimitives() {
    return {
      ...this.props,
      createdAt: new Date(this.props.createdAt.getTime()),
      updatedAt: new Date(this.props.updatedAt.getTime()),
    }
  }
}
