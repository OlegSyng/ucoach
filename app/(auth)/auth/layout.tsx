import { CardWrapper } from '@/ui/components/wrappers'
import { type PropsWithChildren } from 'react'

export const metadata = {
  title: 'login or register | ucoach',
  description: 'login or register to ucoach',
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen w-full flex-col bg-white dark:bg-slate-800'>
      <div className='w-full'>
        <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
          <p>Logo</p>
          {/* <Link href="/">
                    <Logo />
                    </Link>

                    <ThemeSwitch /> */}
        </div>
      </div>
      <div className='flex-center container flex-1'>
        <CardWrapper className='relative z-20 h-fit w-full max-w-md overflow-hidden'>
          {children}
        </CardWrapper>
      </div>
    </div>
  )
}
