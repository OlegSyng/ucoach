import { Endpoint, EndpointGroup } from '@/schemas'
import { ENDPOINTS } from '@/utils/endpoints'
import { TrophyIcon, DumbbellIcon, MedalIcon, UsersIcon } from 'lucide-react'

export const menu: (Endpoint | EndpointGroup)[] = [
  {
    ...ENDPOINTS.home,
  },
  {
    ...ENDPOINTS.calendar,
  },
  {
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
  {
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
  {
    ...ENDPOINTS.profile,
  },
]
