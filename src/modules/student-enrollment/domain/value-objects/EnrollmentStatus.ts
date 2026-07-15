export const EnrollmentStatus = {
  CODIGO_ACTIVADO: 'codigo_activado',
  BORRADOR: 'borrador',
  RADICADA: 'radicada',
  EN_REVISION: 'en_revision',
  CORRECCIONES_SOLICITADAS: 'correcciones_solicitadas',
  APROBADA: 'aprobada',
  MATRICULA_CREADA: 'matricula_creada',
  RECHAZADA: 'rechazada',
} as const

export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus]

export interface EnrollmentStatusDefinition {
  value: EnrollmentStatus
  label: string
  description: string
  isTerminal: boolean
}

/**
 * Catalogo oficial de estados para Solicitud de Matricula.
 */
export const ENROLLMENT_STATUS_DEFINITIONS: EnrollmentStatusDefinition[] = [
  {
    value: EnrollmentStatus.CODIGO_ACTIVADO,
    label: 'Codigo activado',
    description:
      'La institucion activo un codigo de inicio. El acudiente puede iniciar la solicitud.',
    isTerminal: false,
  },
  {
    value: EnrollmentStatus.BORRADOR,
    label: 'Borrador',
    description:
      'Solicitud editable por el acudiente. Aun no se considera radicada ante Secretaria.',
    isTerminal: false,
  },
  {
    value: EnrollmentStatus.RADICADA,
    label: 'Radicada',
    description:
      'Solicitud enviada formalmente por el acudiente y pendiente de asignacion para revision.',
    isTerminal: false,
  },
  {
    value: EnrollmentStatus.EN_REVISION,
    label: 'En revision',
    description:
      'Secretaria analiza la solicitud y define resultado: correcciones, aprobacion o rechazo.',
    isTerminal: false,
  },
  {
    value: EnrollmentStatus.CORRECCIONES_SOLICITADAS,
    label: 'Correcciones solicitadas',
    description:
      'Secretaria devuelve la solicitud para ajustes. El acudiente corrige y vuelve a radicar.',
    isTerminal: false,
  },
  {
    value: EnrollmentStatus.APROBADA,
    label: 'Aprobada',
    description: 'Secretaria aprueba la solicitud. Queda lista para generar expediente inicial.',
    isTerminal: false,
  },
  {
    value: EnrollmentStatus.MATRICULA_CREADA,
    label: 'Matricula creada',
    description: 'Se genero el expediente inicial del estudiante a partir de solicitud aprobada.',
    isTerminal: true,
  },
  {
    value: EnrollmentStatus.RECHAZADA,
    label: 'Rechazada',
    description: 'Secretaria rechaza la solicitud con causal registrada.',
    isTerminal: true,
  },
]
