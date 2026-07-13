import { APP_SHORT, CURRENT_SPRINT } from '@/shared/constants/app'

/**
 * Footer reusable para contexto de sprint en la shell.
 */
export function ShellFooter() {
  return (
    <footer className="mt-6 border-t border-border-subtle py-4 text-xs text-content-muted">
      <p>
        {APP_SHORT} Platform Shell · {CURRENT_SPRINT} · Biblioteca UI reusable
      </p>
    </footer>
  )
}
