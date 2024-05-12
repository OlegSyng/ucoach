'use client'

import { UserType } from '@/schemas'
import { createSafeContext } from '@/ui/utils/createSafeContext'
import { type ReactNode } from 'react'

const [UserSafeProvider, useUserService] = createSafeContext<{
  user: UserType | undefined
}>('')

export function UserService({
  children,
  user,
}: {
  children: ReactNode
  user?: UserType
}) {
  return <UserSafeProvider value={{ user }}>{children}</UserSafeProvider>
}

export { useUserService }
