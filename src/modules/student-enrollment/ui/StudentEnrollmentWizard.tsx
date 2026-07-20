import { useRef, useState } from 'react'

import { Button, Card } from '@/shared/components/ui'

import { WizardStepIndicator } from '@/modules/student-enrollment/ui/components/WizardStepIndicator'
import { RegistroMatricula } from '@/modules/student-enrollment/documentos'
import { AcademicHistoryStep } from '@/modules/student-enrollment/ui/steps/AcademicHistoryStep'
import { GuardiansStep } from '@/modules/student-enrollment/ui/steps/GuardiansStep'
import { HealthStep } from '@/modules/student-enrollment/ui/steps/HealthStep'
import { InscriptionStep } from '@/modules/student-enrollment/ui/steps/InscriptionStep'
import { PersonalInfoStep } from '@/modules/student-enrollment/ui/steps/PersonalInfoStep'
import { StudentInfoStep } from '@/modules/student-enrollment/ui/steps/StudentInfoStep'
import { createInitialStudentEnrollmentData } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'
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
  'Estudiante',
  'Padres o Acudientes',
  'Informacion Personal',
  'Salud',
  'Historial Academico',
  'Verificar Informacion',
]

export function StudentEnrollmentWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(() => createInitialStudentEnrollmentData())
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [hasValidationAttempt, setHasValidationAttempt] = useState(false)
  const currentStepFormRef = useRef<HTMLFormElement>(null)
  const totalSteps = STEP_TITLES.length
  const currentStepNumber = currentStep + 1
  const progressPercent = Math.round((currentStepNumber / totalSteps) * 100)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

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

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      return
    }

    setCurrentStep((previous) => Math.min(previous + 1, totalSteps - 1))
  }

  const goToPreviousStep = () => {
    setValidationMessage(null)
    setCurrentStep((previous) => Math.max(previous - 1, 0))
  }

  const validateCurrentStep = () => {
    const formElement = currentStepFormRef.current

    if (!formElement) {
      return true
    }

    setHasValidationAttempt(true)

    if (formElement.checkValidity()) {
      setValidationMessage(null)
      return true
    }

    setValidationMessage(
      'Hay campos obligatorios pendientes. Complete la informacion resaltada para continuar.'
    )

    formElement.reportValidity()
    const firstInvalidField = formElement.querySelector<HTMLElement>(':invalid')
    firstInvalidField?.focus()

    return false
  }

  const handleStepSelect = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setValidationMessage(null)
      setCurrentStep(stepIndex)
      return
    }

    if (stepIndex > currentStep + 1) {
      setValidationMessage('Complete este paso antes de continuar con los siguientes.')
      return
    }

    if (!validateCurrentStep()) {
      return
    }

    setCurrentStep(stepIndex)
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
          />
        )
      case 6:
        return <RegistroMatricula data={formData} />
      default:
        return null
    }
  }

  return (
    <section className="space-y-6">
      <WizardStepIndicator
        steps={STEP_TITLES}
        currentStep={currentStep}
        onStepSelect={handleStepSelect}
      />
      <Card className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium text-content-primary">
            Paso {currentStepNumber} de {totalSteps}
          </p>
          <p className="font-semibold text-content-secondary">{progressPercent}%</p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercent}
            aria-label="Progreso de la solicitud"
          />
        </div>
      </Card>
      <Card className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold text-content-primary">{STEP_TITLES[currentStep]}</h3>
          <p className="text-sm text-content-secondary">
            Paso {currentStepNumber} de {totalSteps}
          </p>
          <p className="text-xs text-content-muted">Los campos marcados con * son obligatorios.</p>
          {validationMessage && (
            <p className="rounded-md border border-semantic-danger/35 bg-semantic-danger/10 px-3 py-2 text-sm text-semantic-danger">
              {validationMessage}
            </p>
          )}
        </header>

        <form
          ref={currentStepFormRef}
          onSubmit={(event) => event.preventDefault()}
          onInput={() => {
            const formElement = currentStepFormRef.current

            if (!formElement) {
              return
            }

            if (formElement.checkValidity()) {
              setValidationMessage(null)
            }
          }}
          className={
            hasValidationAttempt
              ? '[&_input:invalid]:border-semantic-danger [&_input:invalid]:ring-1 [&_input:invalid]:ring-semantic-danger/40 [&_select:invalid]:border-semantic-danger [&_select:invalid]:ring-1 [&_select:invalid]:ring-semantic-danger/40 [&_textarea:invalid]:border-semantic-danger [&_textarea:invalid]:ring-1 [&_textarea:invalid]:ring-semantic-danger/40'
              : undefined
          }
        >
          {renderStep()}
        </form>
      </Card>
      <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-auto">
          {!isFirstStep && (
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              className="w-full sm:w-auto"
            >
              Anterior
            </Button>
          )}
        </div>

        <div className="w-full sm:w-auto">
          {!isLastStep && (
            <Button
              type="button"
              onClick={goToNextStep}
              className="w-full sm:w-auto bg-brand-700 text-surface-panel transition-colors duration-200 ease-out hover:bg-[rgb(82_132_100)]"
            >
              Siguiente
            </Button>
          )}
          {isLastStep && (
            <Button type="button" className="w-full sm:w-auto">
              Enviar Solicitud de Matricula
            </Button>
          )}
        </div>
      </footer>
      {isLastStep && (
        <Card className="space-y-2 border-dashed bg-neutral-50">
          <p className="text-sm text-content-primary">
            El padre de familia unicamente envia una solicitud de matricula.
          </p>
          <p className="text-sm text-content-secondary">
            La aprobacion y la creacion de la matricula corresponden al colegio y se implementaran
            en un modulo posterior.
          </p>
        </Card>
      )}
    </section>
  )
}
