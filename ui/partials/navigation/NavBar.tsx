import { LayoutDashboardIcon, CalendarDaysIcon, SquareGanttChartIcon, CircleUserRoundIcon} from "lucide-react"
import { Link } from '@/ui/router-events'

export function NavBar() {
  return (
    <div className='fixed bottom-0 md:top-0 left-0 z-50 h-16 w-full border-t md:border-b md:border-t-0 border-gray-200 bg-white'>
      <div className='mx-auto grid h-full max-w-lg grid-cols-4 font-medium'>
        <Link 
            href="/app" 
            className="inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
            <LayoutDashboardIcon className='h-6 w-6 md:hidden mx-auto hover:text-blue-500' />
            <span className="hidden md:block hover:text-blue-500">Dashboard</span>
        </Link>
        <Link 
            href="app/calendar" 
            className="inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
            <CalendarDaysIcon className='h-6 w-6 md:hidden mx-auto text-gray-500 hover:text-blue-500' />
            <span className="hidden md:block hover:text-blue-500">Calendar</span>
        </Link>
        <Link 
            href="app/programs" 
            className="inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
            <SquareGanttChartIcon className='h-6 w-6 md:hidden mx-auto text-gray-500 hover:text-blue-500' />
            <span className="hidden md:block hover:text-blue-500">Programs</span>
        </Link>
        <Link 
            href="app/profile" 
            className="inline-flex items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
            <CircleUserRoundIcon className='h-6 w-6 mx-auto text-gray-500 hover:text-blue-500' />
        </Link>
       
      </div>
    </div>
  )
}
