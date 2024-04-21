import { Link } from '@/ui/router-events'
import {
  LayoutDashboardIcon,
  CalendarDaysIcon,
  SquareGanttChartIcon,
  CircleUserRoundIcon,
} from 'lucide-react'

/*
 * NavBar Component for the mobile app
 */
export function NavBar() {
  return (
    <div className='fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white md:top-0 md:border-b md:border-t-0'>
      <div className='mx-auto grid h-full max-w-lg grid-cols-4 font-medium'>
        <Link
          href='/app'
          className='inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800'
        >
          <LayoutDashboardIcon className='mx-auto h-6 w-6 hover:text-blue-500 md:hidden' />
          <span className='hidden hover:text-blue-500 md:block'>Dashboard</span>
        </Link>
        <Link
          href='app/calendar'
          className='inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800'
        >
          <CalendarDaysIcon className='mx-auto h-6 w-6 text-gray-500 hover:text-blue-500 md:hidden' />
          <span className='hidden hover:text-blue-500 md:block'>Calendar</span>
        </Link>
        <Link
          href='app/programs'
          className='inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800'
        >
          <SquareGanttChartIcon className='mx-auto h-6 w-6 text-gray-500 hover:text-blue-500 md:hidden' />
          <span className='hidden hover:text-blue-500 md:block'>Programs</span>
        </Link>
        <Link
          href='app/profile'
          className='inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800'
        >
          <CircleUserRoundIcon className='mx-auto h-6 w-6 text-gray-500 hover:text-blue-500' />
        </Link>
      </div>
    </div>
  )
}
