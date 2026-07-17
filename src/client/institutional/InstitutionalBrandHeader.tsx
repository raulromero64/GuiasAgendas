import { institutionalBranding } from '@/client/institutional/branding'

interface InstitutionalBrandHeaderProps {
  showSchoolName?: boolean
}

export function InstitutionalBrandHeader({ showSchoolName = true }: InstitutionalBrandHeaderProps) {
  return (
    <header className="rounded-2xl border border-border-subtle bg-gradient-to-b from-surface-panel to-neutral-50 px-4 py-6 shadow-sm md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-4 md:gap-6">
        <img
          src={institutionalBranding.shieldLogoSrc}
          alt={institutionalBranding.shieldLogoAlt}
          className="h-16 w-auto object-contain md:h-20"
          loading="eager"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <img
            src={institutionalBranding.wordmarkLogoSrc}
            alt={institutionalBranding.wordmarkLogoAlt}
            className="h-10 w-auto object-contain md:h-14"
            loading="eager"
          />
          {showSchoolName && (
            <p className="font-brand text-sm font-semibold uppercase tracking-[0.18em] text-content-secondary">
              {institutionalBranding.schoolName}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
