export interface InstitutionSummary {
  id: string
}

export interface InstitutionProvider {
  findById: (id: string) => Promise<InstitutionSummary | null>
}
