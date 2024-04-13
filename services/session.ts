import { UserType } from '@/schemas'
import { options } from '@/utils/auth-options'
import { getServerSession } from 'next-auth/next'

export async function getCurrentUser() {
  const session = await getServerSession(options)

  return session?.user
}
