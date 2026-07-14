import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'
import { Grado } from '@/modules/academic-structure/grado/domain/Grado'
import {
  GradoCodeAlreadyExistsError,
  GradoNameAlreadyExistsError,
} from '@/modules/academic-structure/grado/domain/Grado.errors'

interface CreateGradoInput {
  id: string
  institucionId: string
  periodoLectivoId: string
  nivelId: string
  codigo: string
  nombre: string
  orden: number
  activarAlCrear?: boolean
}

export class CreateGradoUseCase {
  private readonly repository: GradoRepository

  constructor(repository: GradoRepository) {
    this.repository = repository
  }

  async execute(input: CreateGradoInput) {
    const normalizedCodigo = input.codigo.trim().toUpperCase()
    const normalizedNombre = input.nombre.trim()

    if (
      await this.repository.existsByCodigoInScope({
        institucionId: input.institucionId,
        periodoLectivoId: input.periodoLectivoId,
        nivelId: input.nivelId,
        codigo: normalizedCodigo,
      })
    ) {
      throw new GradoCodeAlreadyExistsError(normalizedCodigo)
    }

    if (
      await this.repository.existsByNombreInScope({
        institucionId: input.institucionId,
        periodoLectivoId: input.periodoLectivoId,
        nivelId: input.nivelId,
        nombre: normalizedNombre,
      })
    ) {
      throw new GradoNameAlreadyExistsError(normalizedNombre)
    }

    const grado = Grado.create({
      ...input,
      codigo: normalizedCodigo,
      nombre: normalizedNombre,
    })

    await this.repository.save(grado)

    return grado.toPrimitives()
  }
}
