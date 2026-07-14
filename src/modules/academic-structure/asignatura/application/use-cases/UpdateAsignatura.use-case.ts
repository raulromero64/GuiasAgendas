import type { AsignaturaRepository } from '@/modules/academic-structure/asignatura/application/ports/AsignaturaRepository'
import {
  AsignaturaCodeAlreadyExistsError,
  AsignaturaNameAlreadyExistsError,
  AsignaturaNotFoundError,
} from '@/modules/academic-structure/asignatura/domain/Asignatura.errors'

interface UpdateAsignaturaInput {
  id: string
  codigo?: string
  nombre?: string
  tipo?: string
  intensidadHorariaBase?: number
}

export class UpdateAsignaturaUseCase {
  private readonly repository: AsignaturaRepository

  constructor(repository: AsignaturaRepository) {
    this.repository = repository
  }

  async execute(input: UpdateAsignaturaInput) {
    const asignatura = await this.repository.findById(input.id)
    if (!asignatura) {
      throw new AsignaturaNotFoundError(input.id)
    }

    const nextCodigo = input.codigo?.trim().toUpperCase()
    const nextNombre = input.nombre?.trim()

    if (
      nextCodigo &&
      (await this.repository.existsByCodigoInInstitucion({
        institucionId: asignatura.institucionId,
        codigo: nextCodigo,
        excludingAsignaturaId: asignatura.id,
      }))
    ) {
      throw new AsignaturaCodeAlreadyExistsError(nextCodigo)
    }

    if (
      nextNombre &&
      (await this.repository.existsByNombreInInstitucion({
        institucionId: asignatura.institucionId,
        nombre: nextNombre,
        excludingAsignaturaId: asignatura.id,
      }))
    ) {
      throw new AsignaturaNameAlreadyExistsError(nextNombre)
    }

    asignatura.update({
      codigo: nextCodigo,
      nombre: nextNombre,
      tipo: input.tipo,
      intensidadHorariaBase: input.intensidadHorariaBase,
    })

    await this.repository.save(asignatura)

    return asignatura.toPrimitives()
  }
}
