import { object, string, minLength } from 'valibot'
import { MessageCode } from './base-response.schema'

export const loginSchema = object({
  username: string([minLength(1, 'Username is required')]),
  password: string([minLength(1, 'Password is required')]),
})

export const loginResponseSchema = object({
  userId: string(),
  code: MessageCode,
  message: string(),
})
