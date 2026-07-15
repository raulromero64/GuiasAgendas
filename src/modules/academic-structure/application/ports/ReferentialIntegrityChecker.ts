export interface ReferentialIntegrityChecker {
  assertInstitutionScope: (institucionId: string) => Promise<void>
  assertGradoScope: (input: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
  }) => Promise<void>
  assertGrupoScope: (input: {
    institucionId: string
    periodoLectivoId: string
    nivelId: string
    gradoId: string
  }) => Promise<void>
}
