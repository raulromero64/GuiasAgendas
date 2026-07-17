import { Outlet } from 'react-router-dom'

import { PublicPortalNavbar } from '@/public/portal/components/PublicPortalNavbar'

export function PublicPortalLayout() {
  return (
    <div className="min-h-screen bg-app-gradient font-public">
      <PublicPortalNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 md:px-6 md:pt-10">
        <Outlet />
      </main>
    </div>
  )
}
