'use client'

import { UserType } from '@/schemas'
import { createSafeContext } from '@/ui/utils/createSafeContext'
import { type ReactNode } from 'react'

type UserServiceProps = {
  user: UserType | undefined
  children: ReactNode
}

const [UserSafeProvider, useUserService] = createSafeContext<{
  user: UserType | undefined
}>('')

export function UserService({ user, children }: UserServiceProps) {
  return <UserSafeProvider value={{ user }}>{children}</UserSafeProvider>
}

export { useUserService }
