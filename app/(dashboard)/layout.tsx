import { UserService } from '@/services/UserService'
import { getCurrentUser } from '@/services/session'
import { NavBar } from '@/ui/partials/NavBar'
import { notFound } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export const metadata = {
  title: 'dashboard | ucoach',
  description: 'welcome to ucoach dashboard',
}

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
        <UserService user={user} >
          <div className="flex h-[100dvh] overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <NavBar />
              <main className="w-full grow">
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </div>
        </UserService>
  )
}
