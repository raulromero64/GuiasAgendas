import type { InstitutionId } from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.value-objects'

export type EnrollmentConfigurationId = string

/**
 * Claves funcionales de campos que pueden gobernarse por configuracion institucional.
 */
export const EnrollmentFieldKey = {
  INSCRIPTION_NUMBER: 'inscription_number',
  TARGET_GRADE: 'target_grade',
  IS_REPEATING: 'is_repeating',
  STUDENT_PHOTO: 'student_photo',
  STUDENT_LAST_NAME: 'student_last_name',
  STUDENT_FIRST_NAME: 'student_first_name',
  STUDENT_BIRTH_PLACE: 'student_birth_place',
  STUDENT_BIRTH_DATE: 'student_birth_date',
  STUDENT_DOCUMENT_TYPE: 'student_document_type',
  STUDENT_DOCUMENT_NUMBER: 'student_document_number',
  STUDENT_DOCUMENT_ISSUED_AT: 'student_document_issued_at',
  STUDENT_BLOOD_GROUP: 'student_blood_group',
  STUDENT_EPS: 'student_eps',
  STUDENT_PPS: 'student_pps',
  STUDENT_ADDRESS: 'student_address',
  STUDENT_NEIGHBORHOOD: 'student_neighborhood',
  STUDENT_PHONE: 'student_phone',
  STUDENT_MOBILE: 'student_mobile',
  GUARDIAN_EMAIL: 'guardian_email',
  FATHER_DOCUMENT_ISSUED_AT: 'father_document_issued_at',
  MOTHER_DOCUMENT_ISSUED_AT: 'mother_document_issued_at',
  LIVES_WITH: 'lives_with',
  LIVES_WITH_OTHER_DETAIL: 'lives_with_other_detail',
  PSYCHOLOGICAL_EVALUATION: 'psychological_evaluation',
  PSYCHOLOGICAL_REASON: 'psychological_reason',
  HEALTH_MEDICAL_RECOMMENDATION: 'health_medical_recommendation',
  HEALTH_MEDICAL_RECOMMENDATION_DETAIL: 'health_medical_recommendation_detail',
  HEALTH_MEDICATIONS: 'health_medications',
  HEALTH_MEDICATIONS_DETAIL: 'health_medications_detail',
  HEALTH_SURGERIES: 'health_surgeries',
  HEALTH_SURGERIES_DETAIL: 'health_surgeries_detail',
  HEALTH_WEARS_GLASSES: 'health_wears_glasses',
  HEALTH_WEARS_GLASSES_DETAIL: 'health_wears_glasses_detail',
} as const

export type EnrollmentFieldKey = (typeof EnrollmentFieldKey)[keyof typeof EnrollmentFieldKey]

export interface EnrollmentFieldRule {
  fieldKey: EnrollmentFieldKey
  enabled: boolean
  required: boolean
  /**
   * Permite ligar obligatoriedad condicional a una regla declarativa (sin ejecutarla en esta fase).
   * Ejemplo: "required_if:lives_with=otro".
   */
  requiredWhen?: string
  editableByGuardian?: boolean
}

export interface EnrollmentDocumentRule {
  documentKey: string
  label: string
  required: boolean
  enabled: boolean
  acceptedMimeTypes: string[]
  maxSizeMb: number
}

export interface EnrollmentGradeAvailability {
  gradeKey: string
  label: string
  enabled: boolean
  sortOrder: number
}

export interface EnrollmentCatalogOption {
  value: string
  label: string
  enabled: boolean
  sortOrder: number
}

export interface EnrollmentCatalogDefinition {
  catalogKey: string
  label: string
  enabled: boolean
  allowCustomValue: boolean
  options: EnrollmentCatalogOption[]
}

export interface EnrollmentWindow {
  startsAt: string
  endsAt: string
  allowLateRequests: boolean
}

/**
 * Configuracion institucional de Solicitud de Matricula.
 * Se disena para que el Wizard pueda consumirla a futuro sin acoplar UI a valores hardcodeados.
 */
export interface EnrollmentConfiguration {
  id: EnrollmentConfigurationId
  institutionId: InstitutionId
  version: number
  name: string
  isActive: boolean
  fieldRules: EnrollmentFieldRule[]
  documentRules: EnrollmentDocumentRule[]
  availableGrades: EnrollmentGradeAvailability[]
  catalogs: EnrollmentCatalogDefinition[]
  enrollmentWindow: EnrollmentWindow
  notes?: string
}
