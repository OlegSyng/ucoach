import { UserService } from '@/services/UserService'
import { getCurrentUser } from '@/services/session'
import { Navigation } from '@/ui/partials/navigation'
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
    <UserService user={user}>
      <div className='flex h-[100dvh] overflow-hidden'>
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <Navigation hideNavbar={false} />
          <main className='w-full grow'>{children}</main>
          {/* <Footer /> */}
        </div>
      </div>
    </UserService>
  )
}
