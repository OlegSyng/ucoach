import { type ReactNode } from 'react'

export enum Section {
  Home, // all
  Calendar, // all
  Trainings, // all
  Team, // coaches only
  Profile, // all
}

export interface EndpointBase {
  title: string
  url: string
  section: Section
}

export interface Endpoint extends EndpointBase {
  icon?: ReactNode
  description?: string
  description_short?: string
}

export interface EndpointGroup {
  title: string
  sub_menu: Endpoint[]
  icon?: ReactNode
}
