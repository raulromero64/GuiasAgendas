import { useState } from 'react'

import { Button, Card } from '@/shared/components/ui'

import { WizardStepIndicator } from '@/modules/student-enrollment/ui/components/WizardStepIndicator'
import { AcademicHistoryStep } from '@/modules/student-enrollment/ui/steps/AcademicHistoryStep'
import { GuardiansStep } from '@/modules/student-enrollment/ui/steps/GuardiansStep'
import { HealthStep } from '@/modules/student-enrollment/ui/steps/HealthStep'
import { InscriptionStep } from '@/modules/student-enrollment/ui/steps/InscriptionStep'
import { PersonalInfoStep } from '@/modules/student-enrollment/ui/steps/PersonalInfoStep'
import { ReviewStep } from '@/modules/student-enrollment/ui/steps/ReviewStep'
import { StudentInfoStep } from '@/modules/student-enrollment/ui/steps/StudentInfoStep'
import {
  createEmptyAcademicHistoryRow,
  createInitialStudentEnrollmentData,
} from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'
import {
  type AcademicHistoryRow,
  type GuardianInfo,
  type HealthStepData,
  type InscriptionStepData,
  type PersonalInfoStepData,
  type StudentInfoStepData,
} from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

const STEP_TITLES = [
  'Inscripcion',
  'Informacion del estudiante',
  'Padres y acudientes',
  'Informacion personal',
  'Salud',
  'Historial academico',
  'Revision',
]

export function StudentEnrollmentWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(() => createInitialStudentEnrollmentData())

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === STEP_TITLES.length - 1

  const updateInscriptionStep = (patch: Partial<InscriptionStepData>) => {
    setFormData((previous) => ({
      ...previous,
      inscription: {
        ...previous.inscription,
        ...patch,
      },
    }))
  }

  const updateStudentInfoStep = (patch: Partial<StudentInfoStepData>) => {
    setFormData((previous) => ({
      ...previous,
      studentInfo: {
        ...previous.studentInfo,
        ...patch,
      },
    }))
  }

  const updateGuardian = (id: string, patch: Partial<GuardianInfo>) => {
    setFormData((previous) => ({
      ...previous,
      guardians: previous.guardians.map((guardian) =>
        guardian.id === id ? { ...guardian, ...patch } : guardian
      ),
    }))
  }

  const updatePersonalInfoStep = (patch: Partial<PersonalInfoStepData>) => {
    setFormData((previous) => ({
      ...previous,
      personalInfo: {
        ...previous.personalInfo,
        ...patch,
      },
    }))
  }

  const updateHealthStep = (patch: Partial<HealthStepData>) => {
    setFormData((previous) => ({
      ...previous,
      health: {
        ...previous.health,
        ...patch,
      },
    }))
  }

  const updateAcademicHistoryRow = (id: string, patch: Partial<AcademicHistoryRow>) => {
    setFormData((previous) => ({
      ...previous,
      academicHistory: previous.academicHistory.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))
  }

  const addAcademicHistoryRow = () => {
    setFormData((previous) => ({
      ...previous,
      academicHistory: [...previous.academicHistory, createEmptyAcademicHistoryRow()],
    }))
  }

  const goToNextStep = () => {
    setCurrentStep((previous) => Math.min(previous + 1, STEP_TITLES.length - 1))
  }

  const goToPreviousStep = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 0))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InscriptionStep data={formData.inscription} onChange={updateInscriptionStep} />
      case 1:
        return <StudentInfoStep data={formData.studentInfo} onChange={updateStudentInfoStep} />
      case 2:
        return <GuardiansStep guardians={formData.guardians} onGuardianChange={updateGuardian} />
      case 3:
        return <PersonalInfoStep data={formData.personalInfo} onChange={updatePersonalInfoStep} />
      case 4:
        return <HealthStep data={formData.health} onChange={updateHealthStep} />
      case 5:
        return (
          <AcademicHistoryStep
            rows={formData.academicHistory}
            onRowChange={updateAcademicHistoryRow}
            onAddRow={addAcademicHistoryRow}
          />
        )
      case 6:
        return <ReviewStep data={formData} />
      default:
        return null
    }
  }

  return (
    <section className="space-y-6">
      <WizardStepIndicator
        steps={STEP_TITLES}
        currentStep={currentStep}
        onStepSelect={setCurrentStep}
      />

      <Card className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold text-content-primary">{STEP_TITLES[currentStep]}</h3>
          <p className="text-sm text-content-secondary">
            Paso {currentStep + 1} de {STEP_TITLES.length}
          </p>
        </header>

        {renderStep()}
      </Card>

      <footer className="flex flex-wrap items-center justify-between gap-3">
        <div>
          {!isFirstStep && (
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Anterior
            </Button>
          )}
        </div>

        <div>
          {!isLastStep && (
            <Button type="button" onClick={goToNextStep}>
              Siguiente
            </Button>
          )}
        </div>
      </footer>

      {isLastStep && (
        <p className="text-sm text-content-muted">
          Boton Guardar pendiente de implementacion en una fase posterior.
        </p>
      )}
    </section>
  )
}
