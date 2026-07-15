import type { EnrollmentReview } from '@/modules/student-enrollment/domain/entities/StudentEnrollment'
import type {
  EnrollmentId,
  InstitutionId,
} from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.value-objects'

/**
 * Borrador del expediente inicial que se origina desde una Solicitud de Matricula aprobada.
 * Este contrato prepara el dominio para la fase posterior sin implementar persistencia.
 */
export interface InitialStudentRecordDraft {
  sourceEnrollmentId: EnrollmentId
  institutionId: InstitutionId
  studentCore: {
    firstName: string
    lastName: string
    documentType: string
    documentNumber: string
    documentIssuedAt: string
  }
  enrollmentSnapshot: EnrollmentReview
}

export interface EnrollmentApprovalContext {
  approvedBy: string
  approvedAt: string
}

/**
 * Puerto de dominio para convertir Solicitud aprobada en expediente inicial del estudiante.
 * La implementacion concreta quedara en infraestructura/aplicacion en fases posteriores.
 */
export interface EnrollmentApprovalPreparationService {
  prepareInitialStudentRecord(
    enrollmentRequest: EnrollmentReview,
    context: EnrollmentApprovalContext
  ): InitialStudentRecordDraft
}
