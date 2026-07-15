import type {
  BinaryAnswer,
  DocumentType,
  GuardianRelation,
} from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.enums'
import type {
  AcademicHistoryId,
  EnrollmentId,
  GuardianId,
  InstitutionId,
} from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.value-objects'

export interface Enrollment {
  id: EnrollmentId
  inscriptionNumber: string
  institutionId: InstitutionId
  targetGrade: string
  isRepeating: BinaryAnswer
  studentPhotoPlaceholder: string
}

export interface Student {
  firstName: string
  lastName: string
  birthPlace: string
  birthDate: string
  documentType: DocumentType
  documentNumber: string
  documentIssuedAt: string
  age: string
  bloodGroup: string
  eps: string
  pps: string
  address: string
  neighborhood: string
  phone: string
  mobile: string
  guardianEmail: string
}

export interface Guardian {
  id: GuardianId
  relation: GuardianRelation
  fullName: string
  documentNumber: string
  documentIssuedAt: string
  occupation: string
  company: string
  phone: string
  email: string
}

export interface PersonalInfo {
  livesWith: string
  livesWithOtherDetail: string
  otherPeople: string
  siblingCount: string
  siblingOrder: string
  psychologicalEvaluation: BinaryAnswer
  psychologicalReason: string
}

export interface Health {
  medicalRecommendation: BinaryAnswer
  medicalRecommendationDetail: string
  medications: BinaryAnswer
  medicationsDetail: string
  surgeries: BinaryAnswer
  surgeriesDetail: string
  wearsGlasses: BinaryAnswer
  wearsGlassesDetail: string
  observations: string
}

export interface AcademicHistory {
  id: AcademicHistoryId
  grade: string
  institution: string
  year: string
}

export interface EnrollmentReview {
  enrollment: Enrollment
  student: Student
  guardians: Guardian[]
  personalInfo: PersonalInfo
  health: Health
  academicHistory: AcademicHistory[]
}
