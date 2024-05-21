import { EndpointBase, EndpointGroup } from '@/schemas'
import { ENDPOINTS } from '@/utils/endpoints'
import { TrophyIcon, DumbbellIcon, MedalIcon, UsersIcon } from 'lucide-react'

export const menu: Record<string, EndpointBase | EndpointGroup> = {
  calendar: ENDPOINTS.calendar,
  workouts: {
    title: 'Workouts',
    sub_menu: [
      {
        ...ENDPOINTS.trainings,
        icon: <TrophyIcon />,
        description: 'Discover new trainings and challenges',
        description_short: 'Trainings and challenges',
      },
      {
        ...ENDPOINTS.exercises,
        icon: <DumbbellIcon />,
        description: 'Browse exercises and create your own',
        description_short: 'Exercises',
      },
      {
        ...ENDPOINTS.programs,
        icon: <MedalIcon />,
        description: 'Follow your training programs',
        description_short: 'Programs',
      },
    ],
  },
  team: {
    title: 'Team',
    sub_menu: [
      {
        ...ENDPOINTS.team,
        icon: <UsersIcon />,
        description: 'Manage your training team',
        description_short: 'Team',
      },
    ],
  },
  profile: ENDPOINTS.profile,
}
