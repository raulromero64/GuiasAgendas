export const BinaryAnswer = {
  SI: 'si',
  NO: 'no',
} as const

export type BinaryAnswer = (typeof BinaryAnswer)[keyof typeof BinaryAnswer]

export const GuardianRelation = {
  PADRE: 'padre',
  MADRE: 'madre',
  ACUDIENTE: 'acudiente',
} as const

export type GuardianRelation = (typeof GuardianRelation)[keyof typeof GuardianRelation]

export const DocumentType = {
  REGISTRO_CIVIL: 'registro_civil',
  TARJETA_IDENTIDAD: 'tarjeta_identidad',
  CEDULA_CIUDADANIA: 'cedula_ciudadania',
  CEDULA_EXTRANJERIA: 'cedula_extranjeria',
  PASAPORTE: 'pasaporte',
  OTRO: 'otro',
} as const

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]
