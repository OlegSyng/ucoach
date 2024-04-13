import { UserService } from '@/services/UserService'
import { getCurrentUser } from '@/services/session'
import { notFound } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return <UserService user={user}>{children}</UserService>
}
