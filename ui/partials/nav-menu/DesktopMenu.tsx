'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/ui/components/NavigationMenu'
import { Link } from '@/ui/router-events'
import { ENDPOINTS } from '@/utils/endpoints'
import { MessagesSquareIcon } from 'lucide-react'
import { MenuItem } from './MenuItem'
import { ProfileMenu } from './ProfileMenu'
import { menu } from './menu.data'

export function DesktopMenu() {
  return (
    <div className='flex flex-1 items-center justify-between'>
      <NavigationMenu className='max-w-full justify-start'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href={menu.calendar.url}
              className={navigationMenuTriggerStyle()}
            >
              {menu.calendar.title}
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{menu.workouts.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 lg:w-[700px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <Link
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href={ENDPOINTS.trainings.url}
                    >
                      <MessagesSquareIcon className='h-6 w-6' />
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        community
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Connect with like-minded individuals, share tips and
                        advice, and find support from our community of fitness
                        enthusiasts.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {menu.workouts.sub_menu.map((route) => (
                  <li key={route.title}>
                    <NavigationMenuLink asChild>
                      <MenuItem
                        icon={route.icon}
                        href={route.url}
                        title={route.title}
                        description={route.description}
                        className='m-1'
                      />
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{menu.team.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 lg:w-[700px] lg:grid-cols-[.75fr_1fr]'>
                {menu.team.sub_menu.map((route) => (
                  <li key={route.title}>
                    <NavigationMenuLink asChild>
                      <MenuItem
                        icon={route.icon}
                        href={route.url}
                        title={route.title}
                        description={route.description}
                        className='m-1'
                      />
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ProfileMenu />
    </div>
  )
}
