import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { InstitutionalBrandHeader } from '@/client/institutional/InstitutionalBrandHeader'
import { institutionalBranding } from '@/client/institutional/branding'
import { PUBLIC_ENROLLMENT_WIZARD_ROUTE, PUBLIC_ENTRY_ROUTE } from '@/shared/constants/identity'
import { Button, Card, Input } from '@/shared/components/ui'

const DEMO_ENROLLMENT_PIN = '1234'

export function EnrollmentAccessPage() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (pin.trim() === DEMO_ENROLLMENT_PIN) {
      setPinError(null)
      navigate(PUBLIC_ENROLLMENT_WIZARD_ROUTE)
      return
    }

    setPinError('Codigo invalido. Verifique el PIN entregado por la institucion.')
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <InstitutionalBrandHeader />

      <Card className="space-y-6 p-6 md:p-8">
        <header className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            {institutionalBranding.schoolName}
          </p>
          <h1 className="font-brand text-3xl font-semibold text-content-primary md:text-4xl">
            {institutionalBranding.accessTitle}
          </h1>
          <p className="text-sm text-content-secondary md:text-base">
            Ingrese el codigo entregado por la institucion
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-content-primary">PIN de acceso</span>
            <Input
              type="text"
              inputMode="numeric"
              value={pin}
              onChange={(event) => {
                setPin(event.target.value)
                if (pinError) {
                  setPinError(null)
                }
              }}
              placeholder={institutionalBranding.accessPlaceholder}
              aria-label="PIN de acceso institucional"
              maxLength={12}
            />
          </label>

          {pinError && (
            <p className="rounded-md border border-semantic-danger/35 bg-semantic-danger/10 px-3 py-2 text-sm text-semantic-danger">
              {pinError}
            </p>
          )}

          <Button type="submit" className="w-full bg-brand-800 py-3 text-base hover:bg-brand-900">
            Continuar
          </Button>
        </form>

        <div className="rounded-xl border border-dashed border-border-strong bg-neutral-50 px-4 py-3 text-sm text-content-secondary">
          {institutionalBranding.validationPlaceholder}
        </div>

        <footer className="text-center">
          <Link
            to={PUBLIC_ENTRY_ROUTE}
            className="inline-block text-sm font-semibold text-brand-700 transition hover:text-brand-800"
          >
            ← Volver al inicio
          </Link>
        </footer>
      </Card>
    </section>
  )
}
