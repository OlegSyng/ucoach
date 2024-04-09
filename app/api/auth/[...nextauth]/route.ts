import { loginSchema } from '@/schemas'
import { loginResponseSchema, userSchema } from '@/schemas'
import { SERVER_URL } from '@/ui/utils/endpoints'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Output, safeParse } from 'valibot'

type LoginResponse = Output<typeof loginResponseSchema>
type User = Output<typeof userSchema>

const MAX_AGE = 60 * 60 * 1 // 1 hour

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
        // TODO: custom error messages send to the client
        // Track issue here: https://github.com/nextauthjs/next-auth/pull/9871

        const result = safeParse(loginSchema, credentials)

        if (!result.success) {
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
    async jwt({ token, user }) {
      // User object will be passed on initial signIn call where token will receive new fields
      if (user) {
        console.log('user', user)

        const response = await fetch(SERVER_URL + '/users/' + user.id)
        const userData = (await response.json()) as User

        console.log('userData', userData)

        if (response.ok && userData) {
          token.username = userData.username
          token.email = userData.email
          token.firstName = userData.firstName
          token.lastName = userData.lastName
          token.isCoach = userData.isCoach
          token.coachId = userData.coachId
          token.dateOfBirth = userData.dateOfBirth
          token.weight = userData.weight
          token.imageUrl = userData.imageUrl
        }
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user = { ...token }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
