import { Card } from '@/shared/components/ui'

import { institutionalBranding } from '@/client/institutional/branding'

export function ContactSection() {
  const { contact } = institutionalBranding

  return (
    <section id="contacto" className="scroll-mt-24">
      <Card className="rounded-2xl p-6 md:p-8">
        <header className="space-y-2">
          <p className="font-brand text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Contacto
          </p>
          <h2 className="font-brand text-2xl font-semibold text-content-primary md:text-3xl">
            Canales institucionales
          </h2>
        </header>

        <div className="mt-5 grid gap-4 text-sm text-content-secondary md:grid-cols-3 md:text-base">
          <p>
            <span className="block font-semibold text-content-primary">Direccion</span>
            {contact.address}
          </p>
          <p>
            <span className="block font-semibold text-content-primary">Telefono</span>
            {contact.phone}
          </p>
          <p>
            <span className="block font-semibold text-content-primary">Correo</span>
            {contact.email}
          </p>
        </div>
      </Card>
    </section>
  )
}
