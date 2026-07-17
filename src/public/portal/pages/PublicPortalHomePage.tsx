import { PublicPortalHero } from '@/public/portal/components/PublicPortalHero'
import { AboutSection } from '@/public/portal/sections/AboutSection'
import { ContactSection } from '@/public/portal/sections/ContactSection'
import { ServicesSection } from '@/public/portal/sections/ServicesSection'

export function PublicPortalHomePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <PublicPortalHero />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  )
}
