import { z } from 'zod'

import {
  BinaryAnswer,
  DocumentType,
  GuardianRelation,
} from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.enums'
import type {
  AcademicHistoryDto,
  EnrollmentDto,
  EnrollmentReviewDto,
  GuardianDto,
  HealthDto,
  PersonalInfoDto,
  StudentDto,
} from '@/modules/student-enrollment/application/dto/studentEnrollment.dto'

export const EnrollmentDtoSchema: z.ZodType<EnrollmentDto> = z.object({
  id: z.string(),
  inscriptionNumber: z.string(),
  institutionId: z.string(),
  targetGrade: z.string(),
  isRepeating: z.nativeEnum(BinaryAnswer),
  studentPhotoPlaceholder: z.string(),
})

export const StudentDtoSchema: z.ZodType<StudentDto> = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthPlace: z.string(),
  birthDate: z.string(),
  documentType: z.nativeEnum(DocumentType),
  documentNumber: z.string(),
  documentIssuedAt: z.string(),
  age: z.string(),
  bloodGroup: z.string(),
  eps: z.string(),
  pps: z.string(),
  address: z.string(),
  neighborhood: z.string(),
  phone: z.string(),
  mobile: z.string(),
  guardianEmail: z.string(),
})

export const GuardianDtoSchema: z.ZodType<GuardianDto> = z.object({
  id: z.string(),
  relation: z.nativeEnum(GuardianRelation),
  fullName: z.string(),
  documentNumber: z.string(),
  documentIssuedAt: z.string(),
  occupation: z.string(),
  company: z.string(),
  phone: z.string(),
  email: z.string(),
})

export const PersonalInfoDtoSchema: z.ZodType<PersonalInfoDto> = z.object({
  livesWith: z.string(),
  livesWithOtherDetail: z.string(),
  otherPeople: z.string(),
  siblingCount: z.string(),
  siblingOrder: z.string(),
  psychologicalEvaluation: z.nativeEnum(BinaryAnswer),
  psychologicalReason: z.string(),
})

export const HealthDtoSchema: z.ZodType<HealthDto> = z.object({
  medicalRecommendation: z.nativeEnum(BinaryAnswer),
  medicalRecommendationDetail: z.string(),
  medications: z.nativeEnum(BinaryAnswer),
  medicationsDetail: z.string(),
  surgeries: z.nativeEnum(BinaryAnswer),
  surgeriesDetail: z.string(),
  wearsGlasses: z.nativeEnum(BinaryAnswer),
  wearsGlassesDetail: z.string(),
  observations: z.string(),
})

export const AcademicHistoryDtoSchema: z.ZodType<AcademicHistoryDto> = z.object({
  id: z.string(),
  grade: z.string(),
  institution: z.string(),
  year: z.string(),
})

export const EnrollmentReviewDtoSchema: z.ZodType<EnrollmentReviewDto> = z.object({
  enrollment: EnrollmentDtoSchema,
  student: StudentDtoSchema,
  guardians: z.array(GuardianDtoSchema),
  personalInfo: PersonalInfoDtoSchema,
  health: HealthDtoSchema,
  academicHistory: z.array(AcademicHistoryDtoSchema),
})

export type EnrollmentReviewDtoInput = z.input<typeof EnrollmentReviewDtoSchema>
export type EnrollmentReviewDtoOutput = z.output<typeof EnrollmentReviewDtoSchema>
