import type { EnrollmentReview } from '@/modules/student-enrollment/domain/entities/StudentEnrollment'

export interface StudentEnrollmentDomainService {
  prepareForRegistration(enrollment: EnrollmentReview): EnrollmentReview
}
