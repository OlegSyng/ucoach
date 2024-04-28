'use client'

import { Heading } from '@/ui/components/Heading'
import { useMediaQuery } from '@/ui/hooks/use-mediaQuery'
import { Link } from '@/ui/router-events'
import { BREAKPOINTS } from '@/ui/utils/CONSTS'
import { ENDPOINTS } from '@/utils/endpoints'
import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

export function NavMenu({ hideNavMenu }: { hideNavMenu: boolean }) {
  const media = useMediaQuery([BREAKPOINTS.lg])

  if (hideNavMenu) {
    return null
  }

  return (
    <div
      className='sticky top-0 z-40 transform'
      style={{ transform: 'translate3d(0,0,999px)' }}
    >
      <div className='absolute inset-0 h-full w-full bg-background opacity-80' />
      <nav className='relative z-40 border-b border-border backdrop-blur-sm transition-opacity'>
        <div className='relative mx-auto flex h-16 items-center justify-between px-6 lg:container lg:px-16 xl:px-20'>
          <Link href={ENDPOINTS.home.url} className='mr-2'>
            <Heading level={1} className='text-lg lg:text-2xl'>
              UCOACH.
            </Heading>
          </Link>
          {media.lg ? <DesktopMenu /> : <MobileMenu />}
        </div>
      </nav>
    </div>
  )
}
