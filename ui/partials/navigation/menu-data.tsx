import { endpoints, IEndpoint } from '@/utils/endpoints'
import { HomeIcon } from 'lucide-react'
import { ReactElement } from 'react'

interface IMenuItem extends IEndpoint {
  hasDropdown: false
  icon: ReactElement
  description: string
  description_short: string
}

interface IMenuDropdownItem extends Omit<IMenuItem, 'url' | 'hasDropdown'> {
  hasDropdown: true
  dropdown: ReactElement
  subMenu: string
}

export const menu: (IMenuItem | IMenuDropdownItem)[] = [
  {
    ...endpoints.home,
    hasDropdown: false,
    icon: <HomeIcon />,
    description: 'Home',
    description_short: 'Home',
  },
]
