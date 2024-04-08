import { object, string, minLength } from 'valibot'

export const loginSchema = object({
  username: string([
    minLength(1, 'Username is required')
  ]),
  password: string([
    minLength(1, 'Password is required')
  ]),
})