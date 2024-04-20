export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!

export const AUTHCOOKIE = 'session-ucoach'
export const CLIENT_AUTHCOOKIE = 'next-auth.session-token'

type Sections = 'Home' | 'Calendar' | 'Training' | 'Profile'
export interface IEndpoint {
  title: string
  url: string
  section: Sections
}

export const endpoints: Record<string, IEndpoint> = {
  home: {
    title: 'Home',
    url: '/app',
    section: 'Home',
  },
  calendar: {
    title: 'Calendar',
    url: '/app/calendar',
    section: 'Calendar',
  },
  trainings: {
    title: 'Trainings',
    url: '/app/trainings',
    section: 'Training',
  },
  exersises: {
    title: 'Exersises',
    url: '/app/exersises',
    section: 'Training',
  },
  programs: {
    title: 'Programs',
    url: '/app/programs',
    section: 'Training',
  },
  profile: {
    title: 'Profile',
    url: '/app/profile',
    section: 'Profile',
  },
}
