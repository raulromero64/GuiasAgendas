import {
  EnrollmentStatus,
  type EnrollmentStatus as EnrollmentStatusValue,
} from '@/modules/student-enrollment/domain/value-objects/EnrollmentStatus'

export const EnrollmentActor = {
  ACUDIENTE: 'acudiente',
  SECRETARIA: 'secretaria',
  SISTEMA: 'sistema',
} as const

export type EnrollmentActor = (typeof EnrollmentActor)[keyof typeof EnrollmentActor]

export interface EnrollmentTransitionRule {
  from: EnrollmentStatusValue
  to: EnrollmentStatusValue
  actors: EnrollmentActor[]
  reason: string
}

/**
 * Maquina de transiciones oficial para Solicitud de Matricula.
 * Solo define reglas; no ejecuta persistencia ni procesos externos.
 */
export const ENROLLMENT_TRANSITION_RULES: EnrollmentTransitionRule[] = [
  {
    from: EnrollmentStatus.CODIGO_ACTIVADO,
    to: EnrollmentStatus.BORRADOR,
    actors: [EnrollmentActor.ACUDIENTE],
    reason: 'El acudiente inicia diligenciamiento con codigo activo.',
  },
  {
    from: EnrollmentStatus.BORRADOR,
    to: EnrollmentStatus.RADICADA,
    actors: [EnrollmentActor.ACUDIENTE],
    reason: 'El acudiente radica formalmente la solicitud.',
  },
  {
    from: EnrollmentStatus.RADICADA,
    to: EnrollmentStatus.EN_REVISION,
    actors: [EnrollmentActor.SECRETARIA],
    reason: 'Secretaria toma la solicitud para analisis.',
  },
  {
    from: EnrollmentStatus.EN_REVISION,
    to: EnrollmentStatus.CORRECCIONES_SOLICITADAS,
    actors: [EnrollmentActor.SECRETARIA],
    reason: 'Secretaria solicita ajustes antes de decidir.',
  },
  {
    from: EnrollmentStatus.CORRECCIONES_SOLICITADAS,
    to: EnrollmentStatus.RADICADA,
    actors: [EnrollmentActor.ACUDIENTE],
    reason: 'El acudiente aplica cambios y vuelve a radicar.',
  },
  {
    from: EnrollmentStatus.EN_REVISION,
    to: EnrollmentStatus.APROBADA,
    actors: [EnrollmentActor.SECRETARIA],
    reason: 'Secretaria aprueba la solicitud para crear expediente.',
  },
  {
    from: EnrollmentStatus.APROBADA,
    to: EnrollmentStatus.MATRICULA_CREADA,
    actors: [EnrollmentActor.SECRETARIA, EnrollmentActor.SISTEMA],
    reason: 'Se convierte la solicitud aprobada en expediente inicial.',
  },
  {
    from: EnrollmentStatus.EN_REVISION,
    to: EnrollmentStatus.RECHAZADA,
    actors: [EnrollmentActor.SECRETARIA],
    reason: 'Secretaria rechaza la solicitud con causal registrada.',
  },
]

export interface EnrollmentAllowedAction {
  actor: EnrollmentActor
  action: string
}

/**
 * Acciones permitidas por estado y actor, para orquestar UI/API sin acoplar negocio.
 */
export const ENROLLMENT_ALLOWED_ACTIONS: Record<EnrollmentStatusValue, EnrollmentAllowedAction[]> =
  {
    [EnrollmentStatus.CODIGO_ACTIVADO]: [
      { actor: EnrollmentActor.ACUDIENTE, action: 'iniciar_solicitud' },
    ],
    [EnrollmentStatus.BORRADOR]: [
      { actor: EnrollmentActor.ACUDIENTE, action: 'editar_solicitud' },
      { actor: EnrollmentActor.ACUDIENTE, action: 'radicar_solicitud' },
    ],
    [EnrollmentStatus.RADICADA]: [
      { actor: EnrollmentActor.SECRETARIA, action: 'tomar_para_revision' },
      { actor: EnrollmentActor.ACUDIENTE, action: 'consultar_estado' },
    ],
    [EnrollmentStatus.EN_REVISION]: [
      { actor: EnrollmentActor.SECRETARIA, action: 'solicitar_correcciones' },
      { actor: EnrollmentActor.SECRETARIA, action: 'aprobar_solicitud' },
      { actor: EnrollmentActor.SECRETARIA, action: 'rechazar_solicitud' },
      { actor: EnrollmentActor.ACUDIENTE, action: 'consultar_estado' },
    ],
    [EnrollmentStatus.CORRECCIONES_SOLICITADAS]: [
      { actor: EnrollmentActor.ACUDIENTE, action: 'corregir_solicitud' },
      { actor: EnrollmentActor.ACUDIENTE, action: 'radicar_solicitud' },
      { actor: EnrollmentActor.SECRETARIA, action: 'consultar_observaciones' },
    ],
    [EnrollmentStatus.APROBADA]: [
      { actor: EnrollmentActor.SECRETARIA, action: 'crear_matricula' },
      { actor: EnrollmentActor.SISTEMA, action: 'materializar_expediente_inicial' },
    ],
    [EnrollmentStatus.MATRICULA_CREADA]: [
      { actor: EnrollmentActor.SECRETARIA, action: 'consultar_expediente_inicial' },
    ],
    [EnrollmentStatus.RECHAZADA]: [
      { actor: EnrollmentActor.SECRETARIA, action: 'consultar_historial' },
      { actor: EnrollmentActor.ACUDIENTE, action: 'consultar_causal' },
    ],
  }

export function canTransition(
  from: EnrollmentStatusValue,
  to: EnrollmentStatusValue,
  actor: EnrollmentActor
): boolean {
  return ENROLLMENT_TRANSITION_RULES.some(
    (rule) => rule.from === from && rule.to === to && rule.actors.includes(actor)
  )
}

export function getAllowedTransitions(
  from: EnrollmentStatusValue,
  actor?: EnrollmentActor
): EnrollmentTransitionRule[] {
  if (!actor) {
    return ENROLLMENT_TRANSITION_RULES.filter((rule) => rule.from === from)
  }

  return ENROLLMENT_TRANSITION_RULES.filter(
    (rule) => rule.from === from && rule.actors.includes(actor)
  )
}
