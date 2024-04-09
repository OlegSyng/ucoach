import { loginSchema } from '@/schemas'
import { loginResponseSchema, userSchema, MessageCodeEnum } from '@/schemas'
import { SERVER_URL } from '@/ui/utils/endpoints'
import NextAuth, { type NextAuthOptions, User } from 'next-auth'
import CredentialsProvider, {
  CredentialsConfig,
} from 'next-auth/providers/credentials'
import { Output, safeParse } from 'valibot'

type LoginResponse = Output<typeof loginResponseSchema>
type UserData = Output<typeof userSchema>

const MAX_AGE = 60 * 60 * 24 * 7 // 1 week

const options: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE, // How long until an idle session expires and is no longer valid
  },
  jwt: {
    maxAge: MAX_AGE, // How long until a JWT token expires
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        const result = safeParse(loginSchema, credentials)

        if(!result.success) {
          return null
        }

        const response = await fetch(SERVER_URL + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(result.output),
        })

        const user = (await response.json()) as LoginResponse

        if (response.ok && user) {
          return { id: user.userId }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}

export default NextAuth(options)
