import type { EnrollmentReview } from '@/modules/student-enrollment/domain/entities/StudentEnrollment'
import type { EnrollmentId } from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.value-objects'

export interface StudentEnrollmentRepository {
  findById(id: EnrollmentId): Promise<EnrollmentReview | null>
  save(enrollment: EnrollmentReview): Promise<void>
}
