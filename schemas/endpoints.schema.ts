import { type ReactNode } from 'react'

enum Section {
  Home, // all
  Calendar, // all
  Trainings, // all
  Team, // coaches only
  Profile, // all
}

interface EndpointBase {
  title: string
  url: string
  section: Section
}

interface Endpoint extends EndpointBase {
  icon?: ReactNode
  description?: string
  description_short?: string
}

interface EndpointGroup {
  title: string
  sub_menu: Endpoint[]
  icon?: ReactNode
}

export {
  Section,
  type EndpointBase,
  type Endpoint,
  type EndpointGroup,
}
