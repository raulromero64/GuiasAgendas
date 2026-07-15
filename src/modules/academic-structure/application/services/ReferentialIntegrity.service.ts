import type { InstitutionProvider } from '@/modules/academic-structure/application/ports/InstitutionProvider'
import type { ReferentialIntegrityChecker } from '@/modules/academic-structure/application/ports/ReferentialIntegrityChecker'
import type { GradoRepository } from '@/modules/academic-structure/grado/application/ports/GradoRepository'
import type { NivelRepository } from '@/modules/academic-structure/nivel/application/ports/NivelRepository'
import type { PeriodoLectivoRepository } from '@/modules/academic-structure/periodo-lectivo/application/ports/PeriodoLectivoRepository'

export class ReferentialIntegrityViolationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ReferentialIntegrityViolationError'
  }
}

export class ReferentialIntegrityService implements ReferentialIntegrityChecker {
  private readonly institutionProvider: InstitutionProvider
  private readonly periodoLectivoRepository: PeriodoLectivoRepository
  private readonly nivelRepository: NivelRepository
  private readonly gradoRepository: GradoRepository

  constructor(
    institutionProvider: InstitutionProvider,
    periodoLectivoRepository: PeriodoLectivoRepository,
    nivelRepository: NivelRepository,
    gradoRepository: GradoRepository
  ) {
    this.institutionProvider = institutionProvider
    this.periodoLectivoRepository = periodoLectivoRepository
    this.nivelRepository = nivelRepository
    this.gradoRepository = gradoRepository
  }

  async assertInstitutionScope(institucionId: string) {
    const institution = await this.institutionProvider.findById(institucionId)

    if (!institution || institution.id !== institucionId) {
      throw new ReferentialIntegrityViolationError(
        `No existe la institucion ${institucionId} para la operacion solicitada.`
      )
    }
  }

  async assertGradoScope(input: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
  }) {
    await this.assertInstitutionScope(input.institucionId)

    const periodoLectivo = await this.periodoLectivoRepository.findById(input.periodoLectivoId)
    if (!periodoLectivo || periodoLectivo.institucionId !== input.institucionId) {
      throw new ReferentialIntegrityViolationError(
        `El periodo lectivo ${input.periodoLectivoId} no pertenece a la institucion ${input.institucionId}.`
      )
    }

    const nivel = await this.nivelRepository.findById(input.nivelId)
    if (!nivel || nivel.institucionId !== input.institucionId) {
      throw new ReferentialIntegrityViolationError(
        `El nivel ${input.nivelId} no pertenece a la institucion ${input.institucionId}.`
      )
    }
  }

  async assertGrupoScope(input: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
    gradoId: string
  }) {
    await this.assertGradoScope({
      institucionId: input.institucionId,
      periodoLectivoId: input.periodoLectivoId,
      nivelId: input.nivelId,
    })

    const grado = await this.gradoRepository.findById(input.gradoId)
    if (!grado) {
      throw new ReferentialIntegrityViolationError(
        `No existe el grado ${input.gradoId} para la operacion solicitada.`
      )
    }

    const isConsistentScope =
      grado.institucionId === input.institucionId &&
      grado.periodoLectivoId === input.periodoLectivoId &&
      grado.nivelId === input.nivelId

    if (!isConsistentScope) {
      throw new ReferentialIntegrityViolationError(
        `El grado ${input.gradoId} no coincide con el alcance institucional y academico solicitado.`
      )
    }
  }
}
