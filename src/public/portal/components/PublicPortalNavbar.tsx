import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import { institutionalBranding } from '@/client/institutional/branding'
import { PUBLIC_ENROLLMENT_ACCESS_ROUTE } from '@/shared/constants/identity'
import { PublicPortalMobileMenu } from '@/public/portal/components/PublicPortalMobileMenu'

const menuItems = [
  { id: 'inicio', label: 'Inicio' },
  { to: PUBLIC_ENROLLMENT_ACCESS_ROUTE, label: 'Formulario de Matricula' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'contacto', label: 'Contacto' },
] as const

export function PublicPortalNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface-panel/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={institutionalBranding.shieldLogoSrc}
            alt={institutionalBranding.shieldLogoAlt}
            className="h-11 w-auto object-contain"
            loading="eager"
          />
          <div className="space-y-0.5">
            <p className="font-brand text-xs font-semibold uppercase tracking-[0.16em] text-content-secondary">
              Portal Publico
            </p>
            <p className="font-brand text-sm font-bold text-content-primary md:text-base">
              {institutionalBranding.schoolName}
            </p>
          </div>
        </Link>

        <nav className="hidden md:block" aria-label="Menu principal del colegio">
          <ul className="flex items-center gap-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                {'to' in item ? (
                  <Link
                    to={item.to}
                    className="font-brand rounded-md px-3 py-2 text-sm font-semibold text-content-primary transition hover:bg-brand-50"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`#${item.id}`}
                    className="font-brand rounded-md px-3 py-2 text-sm font-semibold text-content-primary transition hover:bg-brand-50"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle text-content-primary hover:bg-brand-50 md:hidden"
          aria-label={isMobileMenuOpen ? 'Cerrar menu de navegacion' : 'Abrir menu de navegacion'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-3 md:px-6">
        <PublicPortalMobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  )
}
