import type { EnrollmentConfiguration } from '@/modules/student-enrollment/domain/entities/EnrollmentConfiguration'
import type { InstitutionId } from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.value-objects'

/**
 * Contrato de lectura/escritura de configuracion de matricula por institucion.
 * Solo interfaz; sin persistencia en esta fase.
 */
export interface EnrollmentConfigurationRepository {
  getActiveByInstitution(institutionId: InstitutionId): Promise<EnrollmentConfiguration | null>
  save(configuration: EnrollmentConfiguration): Promise<void>
}
