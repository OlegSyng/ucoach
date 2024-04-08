import { Toaster } from '@/ui/components/toast'
import { ReactQueryProvider } from '@/ui/providers'
import { RouterEventsProvider } from '@/ui/router-events'
import { cn } from '@/ui/utils/cn'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  fallback: ['system-ui', 'Roboto', 'sans-serif'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Ucoach',
  description: 'Application for coaches and athletes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RouterEventsProvider>
      <html lang='en'>
        <body
          className={cn(
            inter.className,
            'font-inter min-h-screen min-w-full bg-slate-100 text-slate-600 antialiased dark:bg-slate-900 dark:text-slate-400',
          )}
        >
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </body>
      </html>
    </RouterEventsProvider>
  )
}
