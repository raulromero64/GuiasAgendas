import { Link } from 'react-router-dom'

import { institutionalBranding } from '@/client/institutional/branding'
import { PUBLIC_ENROLLMENT_ACCESS_ROUTE } from '@/shared/constants/identity'

interface PublicPortalMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { id: 'inicio', label: 'Inicio' },
  { to: PUBLIC_ENROLLMENT_ACCESS_ROUTE, label: 'Formulario de Matricula' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'contacto', label: 'Contacto' },
] as const

export function PublicPortalMobileMenu({ isOpen, onClose }: PublicPortalMobileMenuProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="md:hidden">
      <div className="mt-3 rounded-2xl border border-border-subtle bg-surface-panel p-4 shadow-sm">
        <nav aria-label="Menu publico institucional">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                {'to' in item ? (
                  <Link
                    to={item.to}
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-content-primary hover:bg-brand-50"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`#${item.id}`}
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-content-primary hover:bg-brand-50"
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={institutionalBranding.websiteUrl}
          className="mt-3 block text-center text-xs font-semibold text-brand-700 hover:text-brand-800"
          onClick={onClose}
        >
          Sitio institucional
        </a>
      </div>
    </div>
  )
}
