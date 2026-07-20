import {
  REGISTRO_MATRICULA_PRINT_STYLES,
  registroMatriculaStyles,
} from '@/modules/student-enrollment/documentos/RegistroMatricula.styles'
import type {
  AcademicHistoryRow,
  GuardianInfo,
  StudentEnrollmentFormData,
  YesNoValue,
} from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface RegistroMatriculaProps {
  data: StudentEnrollmentFormData
}

function formatYesNo(value: YesNoValue) {
  if (value === 'si') {
    return 'Si'
  }

  if (value === 'no') {
    return 'No'
  }

  return 'Sin definir'
}

function formatLivesWith(value: string) {
  if (value === 'mama') {
    return 'Mama'
  }

  if (value === 'papa') {
    return 'Papa'
  }

  if (value === 'ambos_padres') {
    return 'Ambos padres'
  }

  if (value === 'otro') {
    return 'Otro'
  }

  return value || 'Sin dato'
}

function resolveGuardian(guardians: GuardianInfo[], relation: GuardianInfo['relation']) {
  return guardians.find((guardian) => guardian.relation === relation)
}

function fallback(value: string) {
  return value.trim() === '' ? '____________________' : value
}

function AcademicHistoryTable({ rows }: { rows: AcademicHistoryRow[] }) {
  return (
    <table className="w-full border-collapse text-[11px] leading-5">
      <thead>
        <tr>
          <th className="border border-neutral-400 px-2 py-1 text-left font-semibold">Grado</th>
          <th className="border border-neutral-400 px-2 py-1 text-left font-semibold">
            Institucion
          </th>
          <th className="border border-neutral-400 px-2 py-1 text-left font-semibold">Ano</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td className="border border-neutral-400 px-2 py-1">{fallback(row.grade)}</td>
            <td className="border border-neutral-400 px-2 py-1">{fallback(row.institution)}</td>
            <td className="border border-neutral-400 px-2 py-1">{fallback(row.year)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className={registroMatriculaStyles.sectionTitle}>{title}</h3>
}

export function RegistroMatricula({ data }: RegistroMatriculaProps) {
  const father = resolveGuardian(data.guardians, 'padre')
  const mother = resolveGuardian(data.guardians, 'madre')
  const guardian = resolveGuardian(data.guardians, 'acudiente')

  return (
    <article className={registroMatriculaStyles.article}>
      <style>{REGISTRO_MATRICULA_PRINT_STYLES}</style>

      <header className={registroMatriculaStyles.header}>
        <p className="text-[14px] font-bold uppercase tracking-wide">
          Institucion Educativa El Cervantista
        </p>
        <p className="text-[12px] font-semibold uppercase">Documento Oficial de Matricula</p>
        <p className="text-[11px]">
          Formulario institucional para archivo academico y administrativo
        </p>
      </header>

      <section className={registroMatriculaStyles.section}>
        <SectionTitle title="Encabezado institucional" />
        <div className={registroMatriculaStyles.gridThree}>
          <p>
            <span className="font-semibold">No. Inscripcion:</span>{' '}
            {fallback(data.inscription.inscriptionNumber)}
          </p>
          <p>
            <span className="font-semibold">Grado aspirado:</span>{' '}
            {fallback(data.inscription.targetGrade)}
          </p>
          <p>
            <span className="font-semibold">Repitencia:</span>{' '}
            {formatYesNo(data.inscription.isRepeating)}
          </p>
        </div>
        <p>
          <span className="font-semibold">Referencia de foto:</span>{' '}
          {fallback(data.inscription.studentPhotoPlaceholder)}
        </p>
      </section>

      <section className={registroMatriculaStyles.section}>
        <SectionTitle title="Datos generales del estudiante" />
        <div className={registroMatriculaStyles.gridTwo}>
          <p>
            <span className="font-semibold">Apellidos:</span> {fallback(data.studentInfo.lastName)}
          </p>
          <p>
            <span className="font-semibold">Nombres:</span> {fallback(data.studentInfo.firstName)}
          </p>
          <p>
            <span className="font-semibold">Lugar de nacimiento:</span>{' '}
            {fallback(data.studentInfo.birthPlace)}
          </p>
          <p>
            <span className="font-semibold">Fecha de nacimiento:</span>{' '}
            {fallback(data.studentInfo.birthDate)}
          </p>
          <p>
            <span className="font-semibold">Tipo documento:</span>{' '}
            {fallback(data.studentInfo.documentType)}
          </p>
          <p>
            <span className="font-semibold">No. documento:</span>{' '}
            {fallback(data.studentInfo.documentNumber)}
          </p>
          <p>
            <span className="font-semibold">Expedida en:</span>{' '}
            {fallback(data.studentInfo.documentIssuedAt)}
          </p>
          <p>
            <span className="font-semibold">Edad:</span> {fallback(data.studentInfo.age)}
          </p>
          <p>
            <span className="font-semibold">Grupo RH:</span> {fallback(data.studentInfo.bloodGroup)}
          </p>
          <p>
            <span className="font-semibold">EPS:</span> {fallback(data.studentInfo.eps)}
          </p>
          <p>
            <span className="font-semibold">IPS:</span> {fallback(data.studentInfo.pps)}
          </p>
          <p>
            <span className="font-semibold">Telefono residencia:</span>{' '}
            {fallback(data.studentInfo.phone)}
          </p>
          <p>
            <span className="font-semibold">Celular contacto:</span>{' '}
            {fallback(data.studentInfo.mobile)}
          </p>
          <p>
            <span className="font-semibold">Correo acudiente:</span>{' '}
            {fallback(data.studentInfo.guardianEmail)}
          </p>
        </div>
        <p>
          <span className="font-semibold">Direccion:</span> {fallback(data.studentInfo.address)}
        </p>
        <p>
          <span className="font-semibold">Barrio:</span> {fallback(data.studentInfo.neighborhood)}
        </p>
      </section>

      <section className={registroMatriculaStyles.section}>
        <SectionTitle title="Informacion academica" />
        <AcademicHistoryTable rows={data.academicHistory} />
      </section>

      <section className={registroMatriculaStyles.section}>
        <SectionTitle title="Informacion de padres" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <p className="font-semibold">Padre</p>
            <p>
              <span className="font-semibold">Nombre:</span> {fallback(father?.fullName ?? '')}
            </p>
            <p>
              <span className="font-semibold">Identificacion:</span>{' '}
              {fallback(father?.documentNumber ?? '')}
            </p>
            <p>
              <span className="font-semibold">De:</span> {fallback(father?.documentIssuedAt ?? '')}
            </p>
            <p>
              <span className="font-semibold">Ocupacion:</span> {fallback(father?.occupation ?? '')}
            </p>
            <p>
              <span className="font-semibold">Empresa:</span> {fallback(father?.company ?? '')}
            </p>
            <p>
              <span className="font-semibold">Telefono:</span> {fallback(father?.phone ?? '')}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {fallback(father?.email ?? '')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Madre</p>
            <p>
              <span className="font-semibold">Nombre:</span> {fallback(mother?.fullName ?? '')}
            </p>
            <p>
              <span className="font-semibold">Identificacion:</span>{' '}
              {fallback(mother?.documentNumber ?? '')}
            </p>
            <p>
              <span className="font-semibold">De:</span> {fallback(mother?.documentIssuedAt ?? '')}
            </p>
            <p>
              <span className="font-semibold">Ocupacion:</span> {fallback(mother?.occupation ?? '')}
            </p>
            <p>
              <span className="font-semibold">Empresa:</span> {fallback(mother?.company ?? '')}
            </p>
            <p>
              <span className="font-semibold">Telefono:</span> {fallback(mother?.phone ?? '')}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {fallback(mother?.email ?? '')}
            </p>
          </div>
        </div>
      </section>

      <section className={registroMatriculaStyles.section}>
        <SectionTitle title="Informacion del acudiente" />
        <div className={registroMatriculaStyles.gridTwo}>
          <p>
            <span className="font-semibold">Nombre:</span> {fallback(guardian?.fullName ?? '')}
          </p>
          <p>
            <span className="font-semibold">Parentesco:</span>{' '}
            {fallback(guardian?.occupation ?? '')}
          </p>
          <p>
            <span className="font-semibold">Identificacion:</span>{' '}
            {fallback(guardian?.documentNumber ?? '')}
          </p>
          <p>
            <span className="font-semibold">De:</span> {fallback(guardian?.documentIssuedAt ?? '')}
          </p>
          <p>
            <span className="font-semibold">Empresa:</span> {fallback(guardian?.company ?? '')}
          </p>
          <p>
            <span className="font-semibold">Telefono:</span> {fallback(guardian?.phone ?? '')}
          </p>
          <p className="md:col-span-2">
            <span className="font-semibold">Email:</span> {fallback(guardian?.email ?? '')}
          </p>
        </div>
      </section>

      <section className={registroMatriculaStyles.section}>
        <SectionTitle title="Informacion medica" />
        <div className={registroMatriculaStyles.gridTwo}>
          <p>
            <span className="font-semibold">Recomendacion medica:</span>{' '}
            {formatYesNo(data.health.medicalRecommendation)}
          </p>
          <p>
            <span className="font-semibold">Detalle:</span>{' '}
            {fallback(data.health.medicalRecommendationDetail)}
          </p>
          <p>
            <span className="font-semibold">Toma medicamentos:</span>{' '}
            {formatYesNo(data.health.medications)}
          </p>
          <p>
            <span className="font-semibold">Detalle:</span>{' '}
            {fallback(data.health.medicationsDetail)}
          </p>
          <p>
            <span className="font-semibold">Cirugias previas:</span>{' '}
            {formatYesNo(data.health.surgeries)}
          </p>
          <p>
            <span className="font-semibold">Detalle:</span> {fallback(data.health.surgeriesDetail)}
          </p>
          <p>
            <span className="font-semibold">Usa lentes:</span>{' '}
            {formatYesNo(data.health.wearsGlasses)}
          </p>
          <p>
            <span className="font-semibold">Detalle:</span>{' '}
            {fallback(data.health.wearsGlassesDetail)}
          </p>
        </div>
        <p>
          <span className="font-semibold">Observaciones de salud:</span>{' '}
          {fallback(data.health.observations)}
        </p>
      </section>

      <section className={registroMatriculaStyles.section}>
        <SectionTitle title="Declaracion de aceptacion" />
        <p className="text-justify">
          Declaro que la informacion consignada en este documento corresponde a la realidad del
          estudiante y su nucleo familiar. Autorizo su uso institucional para fines academicos,
          administrativos y de seguimiento escolar, conforme a la normatividad vigente y al manual
          institucional.
        </p>
        <p>
          <span className="font-semibold">Convive con:</span>{' '}
          {formatLivesWith(data.personalInfo.livesWith)}
          {' | '}
          <span className="font-semibold">Detalle otro:</span>{' '}
          {fallback(data.personalInfo.livesWithOtherDetail)}
        </p>
        <p>
          <span className="font-semibold">Otras personas:</span>{' '}
          {fallback(data.personalInfo.otherPeople)}
          {' | '}
          <span className="font-semibold">No. hermanos:</span>{' '}
          {fallback(data.personalInfo.siblingCount)}
          {' | '}
          <span className="font-semibold">Lugar entre hermanos:</span>{' '}
          {fallback(data.personalInfo.siblingOrder)}
        </p>
        <p>
          <span className="font-semibold">Valoracion psicologica:</span>{' '}
          {formatYesNo(data.personalInfo.psychologicalEvaluation)}
          {' | '}
          <span className="font-semibold">Motivo:</span>{' '}
          {fallback(data.personalInfo.psychologicalReason)}
        </p>
      </section>

      <section className={registroMatriculaStyles.signatureSection}>
        <SectionTitle title="Espacios para firmas" />
        <div className={registroMatriculaStyles.signatureGrid}>
          <div className="text-center">
            <div className="h-px w-full bg-neutral-600" />
            <p className="mt-1">Firma de la madre</p>
          </div>
          <div className="text-center">
            <div className="h-px w-full bg-neutral-600" />
            <p className="mt-1">Firma del padre</p>
          </div>
          <div className="text-center">
            <div className="h-px w-full bg-neutral-600" />
            <p className="mt-1">Firma de la rectora</p>
          </div>
        </div>
      </section>

      <footer className={registroMatriculaStyles.footer}>
        <p className="font-semibold uppercase">Pie institucional</p>
        <p>Institucion Educativa El Cervantista - Archivo oficial de matriculas</p>
        <p>Documento para impresion en papel Carta o A4</p>
      </footer>
    </article>
  )
}
