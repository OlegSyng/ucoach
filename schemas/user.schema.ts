import { boolean, number, object, string, array, nullable } from 'valibot'

const weightDataSchema = object({
  data: number(),
  weight: number(),
})

export const userSchema = object({
  username: string(),
  email: string(),
  firstName: nullable(string()),
  lastName: nullable(string()),
  isCoach: nullable(boolean(), true),
  coachId: nullable(string()),
  dateOfBirth: nullable(string()),
  weight: nullable(array(weightDataSchema)),
  imageUrl: nullable(string()),
})
