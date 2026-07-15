export interface OptimisticLockingPolicy {
  assertExpectedVersion: (input: {
    aggregateName: string
    aggregateId: string
    expectedVersion: number
    currentVersion: number
  }) => void
}
