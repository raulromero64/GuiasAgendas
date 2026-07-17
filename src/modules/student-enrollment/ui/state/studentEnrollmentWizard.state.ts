import {
  BinaryAnswer,
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

export type YesNoValue = '' | BinaryAnswer

export interface WizardEnrollmentState extends Omit<
  EnrollmentDto,
  'id' | 'institutionId' | 'isRepeating'
> {
  isRepeating: YesNoValue
}

export interface WizardStudentState extends Omit<StudentDto, 'documentType'> {
  documentType: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WizardGuardianState extends GuardianDto {}

export interface WizardPersonalInfoState extends Omit<PersonalInfoDto, 'psychologicalEvaluation'> {
  psychologicalEvaluation: YesNoValue
}

export interface WizardHealthState extends Omit<
  HealthDto,
  'medicalRecommendation' | 'medications' | 'surgeries' | 'wearsGlasses'
> {
  medicalRecommendation: YesNoValue
  wearsGlasses: YesNoValue
  medications: YesNoValue
  surgeries: YesNoValue
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WizardAcademicHistoryState extends AcademicHistoryDto {}

export interface StudentEnrollmentWizardState {
  inscription: WizardEnrollmentState
  studentInfo: WizardStudentState
  guardians: WizardGuardianState[]
  personalInfo: WizardPersonalInfoState
  health: WizardHealthState
  academicHistory: WizardAcademicHistoryState[]
}

export interface EnrollmentReviewAdapter {
  toDto(state: StudentEnrollmentWizardState): EnrollmentReviewDto
}

/* Compatibilidad con componentes existentes. */
export type InscriptionStepData = WizardEnrollmentState
export type StudentInfoStepData = WizardStudentState
export type GuardianInfo = WizardGuardianState
export type PersonalInfoStepData = WizardPersonalInfoState
export type HealthStepData = WizardHealthState
export type AcademicHistoryRow = WizardAcademicHistoryState
export type StudentEnrollmentFormData = StudentEnrollmentWizardState

function createLocalId(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

const PHYSICAL_FORM_GRADES = [
  'Prejardin',
  'Jardin',
  'Transicion',
  'Primero',
  'Segundo',
  'Tercero',
  'Cuarto',
  'Quinto',
] as const

export function createEmptyAcademicHistoryRow(): AcademicHistoryRow {
  return {
    id: createLocalId('academic-history'),
    grade: '',
    institution: '',
    year: '',
  }
}

function createDefaultGuardians(): WizardGuardianState[] {
  return [
    {
      id: createLocalId('guardian'),
      relation: GuardianRelation.PADRE,
      fullName: '',
      documentNumber: '',
      documentIssuedAt: '',
      occupation: '',
      company: '',
      phone: '',
      email: '',
    },
    {
      id: createLocalId('guardian'),
      relation: GuardianRelation.MADRE,
      fullName: '',
      documentNumber: '',
      documentIssuedAt: '',
      occupation: '',
      company: '',
      phone: '',
      email: '',
    },
    {
      id: createLocalId('guardian'),
      relation: GuardianRelation.ACUDIENTE,
      fullName: '',
      documentNumber: '',
      documentIssuedAt: '',
      occupation: '',
      company: '',
      phone: '',
      email: '',
    },
  ]
}

export function createInitialStudentEnrollmentData(): StudentEnrollmentFormData {
  return {
    inscription: {
      inscriptionNumber: '',
      targetGrade: '',
      isRepeating: '',
      studentPhotoPlaceholder: '',
    },
    studentInfo: {
      firstName: '',
      lastName: '',
      birthPlace: '',
      birthDate: '',
      documentType: '',
      documentNumber: '',
      documentIssuedAt: '',
      age: '',
      bloodGroup: '',
      eps: '',
      pps: '',
      address: '',
      neighborhood: '',
      phone: '',
      mobile: '',
      guardianEmail: '',
    },
    guardians: createDefaultGuardians(),
    personalInfo: {
      livesWith: '',
      livesWithOtherDetail: '',
      otherPeople: '',
      siblingCount: '',
      siblingOrder: '',
      psychologicalEvaluation: '',
      psychologicalReason: '',
    },
    health: {
      medicalRecommendation: '',
      medicalRecommendationDetail: '',
      medications: '',
      medicationsDetail: '',
      surgeries: '',
      surgeriesDetail: '',
      wearsGlasses: '',
      wearsGlassesDetail: '',
      observations: '',
    },
    academicHistory: PHYSICAL_FORM_GRADES.map((grade) => ({
      id: createLocalId('academic-history'),
      grade,
      institution: '',
      year: '',
    })),
  }
}
