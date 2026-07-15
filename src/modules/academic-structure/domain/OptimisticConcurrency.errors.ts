export class OptimisticConcurrencyConflictError extends Error {
  constructor(input: {
    aggregateName: string
    aggregateId: string
    expectedVersion: number
    currentVersion: number
  }) {
    super(
      `Conflicto de concurrencia en ${input.aggregateName} (${input.aggregateId}). ` +
        `Version esperada: ${input.expectedVersion}. Version actual: ${input.currentVersion}.`
    )
    this.name = 'OptimisticConcurrencyConflictError'
  }
}
