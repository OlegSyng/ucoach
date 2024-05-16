import { useQuery } from "@tanstack/react-query";
import { Exercise, ExercisesFilter } from "@/schemas/exercise.schema";
import { QueryParams } from "@/schemas/api.schema";

type TSort = keyof Pick<Exercise, 'title' | 'intensity' | 'equipment'>

const exercisesKeys = {
    collection: ['exercises'] as const,
    params: (params: QueryParams<TSort>) => [{ params }] as const,
    filter: (filter: ExercisesFilter) => [{ filter }] as const,
    generate: (params: QueryParams<TSort>, filter: ExercisesFilter) => [...exercisesKeys.collection, ...exercisesKeys.params(params), ...exercisesKeys.filter(filter)] as const
}


export function useExercises(params: QueryParams<TSort>, filter: ExercisesFilter) {
    return useQuery({
        queryKey: exercisesKeys.generate(params, filter)
        queryFn: async () => {}
    })
}