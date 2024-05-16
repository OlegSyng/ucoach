import { object, string, nullable, optional, array, enum_, Output, pick } from 'valibot'

enum Intensity {
  None = 0,
  VeryLow = 1,
  Low = 2,
  Mild = 3,
  Moderate = 4,
  Medium = 5,
  High = 6,
  VeryHigh = 7,
  Intense = 8,
  Extreme = 9,
  Maximum = 10,
}

const intensity = enum_(Intensity)

const exercise = object({
  _id: string(),
  title: string(),
  description: nullable(string()),
  coachId: nullable(string()),
  intensity: intensity,
  videoUrl: nullable(string()),
  equipment: nullable(array(string())),
})

type Exercise = Output<typeof exercise>

const exercisesFilter = optional(pick(exercise, ['title', 'intensity', 'equipment']))

type ExercisesFilter = Output<typeof exercisesFilter>

export { 
    intensity,
    Intensity,
    exercise,
    type Exercise,
    exercisesFilter,
    type ExercisesFilter
}
