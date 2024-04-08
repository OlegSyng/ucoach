import { loginSchema } from '@/schemas'
import { SERVER_URL } from '@/ui/utils/endpoints'
import axios from 'axios'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { parse } from 'valibot'

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials: unknown) {
        try {
          const loginData = parse(loginSchema, credentials)
          const { data } = await axios.post(
            SERVER_URL + '/auth/login',
            loginData,
            {
              headers: { 'Content-Type': 'application/json' },
            },
          )
          if (!data) {
            return null
          }
          return data
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {},
}

export default NextAuth(options)
