import {
  DocumentType,
  type DocumentType as DocumentTypeValue,
} from '@/modules/student-enrollment/domain/value-objects/StudentEnrollment.enums'

export interface CatalogOption {
  value: string
  label: string
}

export const GRADE_OPTIONS: CatalogOption[] = [
  { value: 'prejardin', label: 'Prejardin' },
  { value: 'jardin', label: 'Jardin' },
  { value: 'transicion', label: 'Transicion' },
  { value: 'primero', label: 'Primero' },
  { value: 'segundo', label: 'Segundo' },
  { value: 'tercero', label: 'Tercero' },
  { value: 'cuarto', label: 'Cuarto' },
  { value: 'quinto', label: 'Quinto' },
  { value: 'sexto', label: 'Sexto' },
  { value: 'septimo', label: 'Septimo' },
  { value: 'octavo', label: 'Octavo' },
  { value: 'noveno', label: 'Noveno' },
  { value: 'decimo', label: 'Decimo' },
  { value: 'once', label: 'Once' },
]

export const DOCUMENT_TYPE_OPTIONS: Array<{ value: DocumentTypeValue; label: string }> = [
  { value: DocumentType.REGISTRO_CIVIL, label: 'Registro civil' },
  { value: DocumentType.TARJETA_IDENTIDAD, label: 'Tarjeta de identidad' },
  { value: DocumentType.CEDULA_CIUDADANIA, label: 'Cedula de ciudadania' },
  { value: DocumentType.CEDULA_EXTRANJERIA, label: 'Cedula de extranjeria' },
  { value: DocumentType.PASAPORTE, label: 'Pasaporte' },
  { value: DocumentType.OTRO, label: 'Otro' },
]

export const BLOOD_GROUP_OPTIONS: CatalogOption[] = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
]

export const LIVES_WITH_OPTIONS: CatalogOption[] = [
  { value: 'mama', label: 'Mama' },
  { value: 'papa', label: 'Papa' },
  { value: 'ambos_padres', label: 'Ambos padres' },
  { value: 'otro', label: 'Otro' },
]
