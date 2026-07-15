import { z } from 'zod'

import { EnrollmentFieldKey } from '@/modules/student-enrollment/domain/entities/EnrollmentConfiguration'
import type {
  EnrollmentCatalogDefinitionDto,
  EnrollmentConfigurationDto,
  EnrollmentDocumentRuleDto,
  EnrollmentFieldRuleDto,
  EnrollmentGradeAvailabilityDto,
  EnrollmentWindowDto,
} from '@/modules/student-enrollment/application/dto/enrollmentConfiguration.dto'

export const EnrollmentFieldRuleDtoSchema: z.ZodType<EnrollmentFieldRuleDto> = z.object({
  fieldKey: z.nativeEnum(EnrollmentFieldKey),
  enabled: z.boolean(),
  required: z.boolean(),
  requiredWhen: z.string().optional(),
  editableByGuardian: z.boolean().optional(),
})

export const EnrollmentDocumentRuleDtoSchema: z.ZodType<EnrollmentDocumentRuleDto> = z.object({
  documentKey: z.string(),
  label: z.string(),
  required: z.boolean(),
  enabled: z.boolean(),
  acceptedMimeTypes: z.array(z.string()),
  maxSizeMb: z.number().positive(),
})

export const EnrollmentGradeAvailabilityDtoSchema: z.ZodType<EnrollmentGradeAvailabilityDto> =
  z.object({
    gradeKey: z.string(),
    label: z.string(),
    enabled: z.boolean(),
    sortOrder: z.number().int(),
  })

const EnrollmentCatalogOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  enabled: z.boolean(),
  sortOrder: z.number().int(),
})

export const EnrollmentCatalogDefinitionDtoSchema: z.ZodType<EnrollmentCatalogDefinitionDto> =
  z.object({
    catalogKey: z.string(),
    label: z.string(),
    enabled: z.boolean(),
    allowCustomValue: z.boolean(),
    options: z.array(EnrollmentCatalogOptionSchema),
  })

export const EnrollmentWindowDtoSchema: z.ZodType<EnrollmentWindowDto> = z.object({
  startsAt: z.string(),
  endsAt: z.string(),
  allowLateRequests: z.boolean(),
})

export const EnrollmentConfigurationDtoSchema: z.ZodType<EnrollmentConfigurationDto> = z.object({
  id: z.string(),
  institutionId: z.string(),
  version: z.number().int().positive(),
  name: z.string(),
  isActive: z.boolean(),
  fieldRules: z.array(EnrollmentFieldRuleDtoSchema),
  documentRules: z.array(EnrollmentDocumentRuleDtoSchema),
  availableGrades: z.array(EnrollmentGradeAvailabilityDtoSchema),
  catalogs: z.array(EnrollmentCatalogDefinitionDtoSchema),
  enrollmentWindow: EnrollmentWindowDtoSchema,
  notes: z.string().optional(),
})

export type EnrollmentConfigurationDtoInput = z.input<typeof EnrollmentConfigurationDtoSchema>
export type EnrollmentConfigurationDtoOutput = z.output<typeof EnrollmentConfigurationDtoSchema>
