import { loginSchema, loginResponseSchema, UserType } from '@/schemas'
import { SERVER_URL, SERVER_AUTHCOOKIE } from '@/utils/endpoints'
import axios from 'axios'
import { parse } from 'cookie'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import { Output, safeParse } from 'valibot'

type LoginResponse = Output<typeof loginResponseSchema>

const MAX_AGE = 60 * 60 * 1 // 1 hour

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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

              if (parsedCookie[SERVER_AUTHCOOKIE]) {
                cookies().set({
                  name: SERVER_AUTHCOOKIE,
                  value: parsedCookie[SERVER_AUTHCOOKIE],
                  path: parsedCookie['Path'],
                  httpOnly: true,
                  secure: true, // TODO: 'true' for HTTPS (production only)
                  sameSite: 'none', // TODO: 'lax' for HTTPS (production only)
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
          const response = await axios.get<UserType>(
            SERVER_URL + '/users/' + user.id,
            {
              headers: {
                Cookie: `${SERVER_AUTHCOOKIE}=${cookies().get(SERVER_AUTHCOOKIE)?.value}`,
              },
            },
          )

          if (response.data) {
            token.user = response.data
          }
        } catch (error) {
          console.error(error)
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}
