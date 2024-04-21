import { Section, EndpointBase } from '@/schemas'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!

export const SERVER_AUTHCOOKIE = 'session-ucoach'
export const CLIENT_AUTHCOOKIE = 'next-auth.session-token'

export const ENDPOINTS: Record<string, EndpointBase> = {
  home: {
    title: 'Home',
    url: '/app',
    section: Section.Home,
  },
  calendar: {
    title: 'Calendar',
    url: '/app/calendar',
    section: Section.Calendar,
  },
  trainings: {
    title: 'Trainings',
    url: '/app/trainings',
    section: Section.Trainings,
  },
  exercises: {
    title: 'Exersises',
    url: '/app/exercises',
    section: Section.Trainings,
  },
  programs: {
    title: 'Programs',
    url: '/app/programs',
    section: Section.Trainings,
  },
  team: {
    title: 'Team',
    url: '/app/team',
    section: Section.Team,
  },
  profile: {
    title: 'Profile',
    url: '/app/profile',
    section: Section.Profile,
  },
}
