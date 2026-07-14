import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'
import { Nivel } from '@/modules/academic-structure/nivel/domain/Nivel'
import {
  NivelCodeAlreadyExistsError,
  NivelNameAlreadyExistsError,
} from '@/modules/academic-structure/nivel/domain/Nivel.errors'

interface CreateNivelInput {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  orden: number
  activarAlCrear?: boolean
}

export class CreateNivelUseCase {
  private readonly repository: NivelRepository

  constructor(repository: NivelRepository) {
    this.repository = repository
  }

  async execute(input: CreateNivelInput) {
    const normalizedCodigo = input.codigo.trim().toUpperCase()
    const normalizedNombre = input.nombre.trim()

    if (await this.repository.existsByCodigoInInstitucion(input.institucionId, normalizedCodigo)) {
      throw new NivelCodeAlreadyExistsError(normalizedCodigo)
    }

    if (await this.repository.existsByNombreInInstitucion(input.institucionId, normalizedNombre)) {
      throw new NivelNameAlreadyExistsError(normalizedNombre)
    }

    const nivel = Nivel.create({
      ...input,
      codigo: normalizedCodigo,
      nombre: normalizedNombre,
    })

    await this.repository.save(nivel)

    return nivel.toPrimitives()
  }
}
