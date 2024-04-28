'use client'

import { useUserService } from '@/services/UserService'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/components/Avatar'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/ui/components/MenuBar'
import { Link } from '@/ui/router-events'
import { signOut } from 'next-auth/react'
import { menu } from './menu.data'

export function ProfileMenu() {
  const { user } = useUserService()
  const firstNameChar = user?.firstName?.charAt(0)
  const lastNameChar = user?.lastName?.charAt(0)
  const initials =
    firstNameChar && lastNameChar ? firstNameChar + lastNameChar : 'U'

  if (!user) {
    return null
  }

  return (
    <Menubar className='h-auto border-0'>
      <MenubarMenu>
        <MenubarTrigger
          className='rounded-full p-1.5'
          onPointerMove={(event) => event.preventDefault()}
          onPointerLeave={(event) => event.preventDefault()}
        >
          <Avatar>
            {user.imageUrl && <AvatarImage src={user.imageUrl} />}
            <AvatarFallback className='uppercase'>{initials}</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent align='end'>
          <Link href={menu.profile.url} passHref>
            <MenubarItem>{menu.profile.title}</MenubarItem>
          </Link>
          <MenubarItem>Settings</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => signOut()}>Log Out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
