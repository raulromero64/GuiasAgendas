import type {
  AcademicHistory,
  Enrollment,
  EnrollmentReview,
  Guardian,
  Health,
  PersonalInfo,
  Student,
} from '@/modules/student-enrollment/domain/entities/StudentEnrollment'
import type {
  BinaryAnswer,
  DocumentType,
  GuardianRelation,
} from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.enums'

export interface EnrollmentDto extends Omit<Enrollment, 'isRepeating'> {
  isRepeating: BinaryAnswer
}

export interface StudentDto extends Omit<Student, 'documentType'> {
  documentType: DocumentType
}

export interface GuardianDto extends Omit<Guardian, 'relation'> {
  relation: GuardianRelation
}

export interface PersonalInfoDto extends Omit<PersonalInfo, 'psychologicalEvaluation'> {
  psychologicalEvaluation: BinaryAnswer
}

export interface HealthDto extends Omit<Health, 'wearsGlasses'> {
  wearsGlasses: BinaryAnswer
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AcademicHistoryDto extends AcademicHistory {}

export interface EnrollmentReviewDto extends Omit<
  EnrollmentReview,
  'enrollment' | 'student' | 'guardians' | 'personalInfo' | 'health' | 'academicHistory'
> {
  enrollment: EnrollmentDto
  student: StudentDto
  guardians: GuardianDto[]
  personalInfo: PersonalInfoDto
  health: HealthDto
  academicHistory: AcademicHistoryDto[]
}
