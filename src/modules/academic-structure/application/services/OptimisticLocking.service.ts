import type { OptimisticLockingPolicy } from '@/modules/academic-structure/application/ports/OptimisticLockingPolicy'
import { OptimisticConcurrencyConflictError } from '@/modules/academic-structure/domain/OptimisticConcurrency.errors'

export class OptimisticLockingService implements OptimisticLockingPolicy {
  assertExpectedVersion(input: {
    aggregateName: string
    aggregateId: string
    expectedVersion: number
    currentVersion: number
  }) {
    if (input.expectedVersion !== input.currentVersion) {
      throw new OptimisticConcurrencyConflictError({
        aggregateName: input.aggregateName,
        aggregateId: input.aggregateId,
        expectedVersion: input.expectedVersion,
        currentVersion: input.currentVersion,
      })
    }
  }
}
