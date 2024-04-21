'use client'

import { Button } from '@/ui/components/Button'
import { Heading } from '@/ui/components/Heading'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/ui/components/NavigationMenu'
import { useMediaQuery } from '@/ui/hooks/use-mediaQuery'
import { cn } from '@/ui/utils/cn'
import { useState, useEffect } from 'react'
import { HamburgerIcons } from './HamburgerIcons'
import { MobileMenu } from './MobileMenu'

export function NavMenu({ hideNavbar }: { hideNavbar: boolean }) {
  const [open, setOpen] = useState(false)
  const matches = useMediaQuery([{ name: 'sm', breakpoint: '640' }])

  useEffect(() => {
    if (open) {
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  // Close mobile menu when desktop
  // useEffect(() => {
  //   if (width >= 1024) setOpen(false)
  // }, [width])

  if (hideNavbar) {
    return null
  }

  return (
    <div
      className={cn('sticky top-0 z-40 transform')}
      style={{ transform: 'translate3d(0,0,999px)' }}
    >
      <div className='absolute inset-0 h-full w-full bg-background opacity-80' />
      <nav className='relative z-40 border-b border-border backdrop-blur-sm transition-opacity'>
        <div className='relative mx-auto flex h-16 items-center justify-between lg:container lg:px-16 xl:px-20'>
          <div className='flex flex-1 items-center justify-between px-6 sm:items-stretch lg:px-0'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center'>
                {/*LOGO */}
                <Heading level={1} className='text-lg'>
                  UCOACH.
                </Heading>
              </div>
            </div>
            <Button
              variant={{ intent: 'icon' }}
              onClick={() => setOpen((prev) => !prev)}
              className='border-0 bg-transparent shadow-none'
            >
              <HamburgerIcons isOpen={open} />
            </Button>
          </div>
        </div>
        <MobileMenu open={open} setOpen={setOpen} />
      </nav>
    </div>
  )
}
