import type {
  EnrollmentCatalogDefinition,
  EnrollmentDocumentRule,
  EnrollmentFieldRule,
  EnrollmentGradeAvailability,
  EnrollmentWindow,
} from '@/modules/student-enrollment/domain/entities/EnrollmentConfiguration'
import type { EnrollmentConfiguration } from '@/modules/student-enrollment/domain/entities/EnrollmentConfiguration'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnrollmentFieldRuleDto extends EnrollmentFieldRule {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnrollmentDocumentRuleDto extends EnrollmentDocumentRule {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnrollmentGradeAvailabilityDto extends EnrollmentGradeAvailability {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnrollmentCatalogDefinitionDto extends EnrollmentCatalogDefinition {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnrollmentWindowDto extends EnrollmentWindow {}

export interface EnrollmentConfigurationDto extends Omit<
  EnrollmentConfiguration,
  'fieldRules' | 'documentRules' | 'availableGrades' | 'catalogs' | 'enrollmentWindow'
> {
  fieldRules: EnrollmentFieldRuleDto[]
  documentRules: EnrollmentDocumentRuleDto[]
  availableGrades: EnrollmentGradeAvailabilityDto[]
  catalogs: EnrollmentCatalogDefinitionDto[]
  enrollmentWindow: EnrollmentWindowDto
}
