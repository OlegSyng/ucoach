'use client'

import { createContext, useContext } from 'react'

export type EventType = 'changeStarted' | 'changeCompleted'

export const RouterEventsSafeContext = createContext<{
  event: EventType
  change: React.Dispatch<React.SetStateAction<EventType>>
}>({
  event: 'changeCompleted',
  change: (event) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
})

export function useEvents() {
  return useContext(RouterEventsSafeContext)
}
