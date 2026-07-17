import { Outlet } from 'react-router-dom'

export function PublicAppLayout() {
  return (
    <div className="min-h-screen bg-app-gradient font-public">
      <main className="mx-auto flex min-h-screen w-full items-center justify-center px-4 py-10 md:px-6">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
