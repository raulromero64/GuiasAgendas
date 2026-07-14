import type { AsignaturaRepository } from '@/modules/academic-structure/asignatura/application/ports/AsignaturaRepository'
import { Asignatura } from '@/modules/academic-structure/asignatura/domain/Asignatura'
import {
  AsignaturaCodeAlreadyExistsError,
  AsignaturaNameAlreadyExistsError,
} from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

interface CreateAsignaturaInput {
  id: string
  institucionId: string
  codigo: string
  nombre: string
  tipo: string
  intensidadHorariaBase: number
  activarAlCrear?: boolean
}

export class CreateAsignaturaUseCase {
  private readonly repository: AsignaturaRepository

  constructor(repository: AsignaturaRepository) {
    this.repository = repository
  }

  async execute(input: CreateAsignaturaInput) {
    const normalizedCodigo = input.codigo.trim().toUpperCase()
    const normalizedNombre = input.nombre.trim()

    if (
      await this.repository.existsByCodigoInInstitucion({
        institucionId: input.institucionId,
        codigo: normalizedCodigo,
      })
    ) {
      throw new AsignaturaCodeAlreadyExistsError(normalizedCodigo)
    }

    if (
      await this.repository.existsByNombreInInstitucion({
        institucionId: input.institucionId,
        nombre: normalizedNombre,
      })
    ) {
      throw new AsignaturaNameAlreadyExistsError(normalizedNombre)
    }

    const asignatura = Asignatura.create({
      ...input,
      codigo: normalizedCodigo,
      nombre: normalizedNombre,
    })

    await this.repository.save(asignatura)

    return asignatura.toPrimitives()
  }
}
