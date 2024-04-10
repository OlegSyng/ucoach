import { loginSchema, loginResponseSchema, userSchema } from '@/schemas'
import { SERVER_URL } from '@/ui/utils/endpoints'
import axios from 'axios'
import { parse } from 'cookie'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import { Output, safeParse } from 'valibot'

type LoginResponse = Output<typeof loginResponseSchema>
type User = Output<typeof userSchema>

const MAX_AGE = 60 * 60 * 1 // 1 hour
const SERVER_COOKIE_NAME = 'session-ucoach'

export const options: NextAuthOptions = {
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
        try {
          // TODO: custom error messages send to the client
          // Track issue here: https://github.com/nextauthjs/next-auth/pull/9871
          const result = safeParse(loginSchema, credentials)

          if (!result.success) {
            return null
          }

          const response = await axios.post<LoginResponse>(
            SERVER_URL + '/auth/login',
            result.output,
          )

          const apiCookies = response.headers['set-cookie']

          if (apiCookies && apiCookies.length > 0) {
            apiCookies.forEach((cookie) => {
              const parsedCookie = parse(cookie)

              if (parsedCookie[SERVER_COOKIE_NAME]) {
                cookies().set({
                  name: SERVER_COOKIE_NAME,
                  value: parsedCookie[SERVER_COOKIE_NAME],
                  maxAge: parseInt(parsedCookie['Max-Age']),
                  path: parsedCookie['Path'],
                  httpOnly: true,
                  secure: false, // TODO: 'true' for HTTPS (production only)
                  sameSite: 'none', // TODO: 'none' for HTTPS (production only)
                  expires: new Date(parsedCookie['Expires']),
                })
              }
            })
          }

          if (response.data) {
            return { id: response.data.userId }
          }

          return null
        } catch (error) {
          console.error(error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // User object will be passed on initial signIn call where token will receive new fields
      if (user) {
        token.id = user.id

        try {
          const response = await axios.get<User>(
            SERVER_URL + '/users/' + user.id,
            {
              headers: {
                Cookie: `${SERVER_COOKIE_NAME}=${cookies().get(SERVER_COOKIE_NAME)?.value}`,
              },
            },
          )

          if (response.data) {
            token.username = response.data.username
            token.email = response.data.email
            token.firstName = response.data.firstName
            token.lastName = response.data.lastName
            token.isCoach = response.data.isCoach
            token.coachId = response.data.coachId
            token.dateOfBirth = response.data.dateOfBirth
            token.weight = response.data.weight
            token.imageUrl = response.data.imageUrl
          }
        } catch (error) {
          console.error(error)
        } 
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
