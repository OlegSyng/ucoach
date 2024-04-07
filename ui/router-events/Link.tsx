'use client'

import { default as NextLink } from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { useEvents } from './Context'

type LinkProps = ComponentPropsWithoutRef<typeof NextLink>
export const Link = forwardRef<ElementRef<typeof NextLink>, LinkProps>(
  ({ href, target, onClick, ...props }, ref) => {
    const { change } = useEvents()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentUrl = pathname + searchParams.toString()
    const hrefUrl = typeof href === 'string' ? href : href.pathname
    const isSameUrl = hrefUrl === currentUrl

    function handleClicked(event: React.MouseEvent<HTMLAnchorElement>) {
      // detect if page opened in new tab. if so => don't trigger change
      // detect if the href is external. if so => don't trigger change
      // detect if the href is the same as the current url. if so => don't trigger change
      const isExternal = target === '_blank' || hrefUrl?.startsWith('http')
      const isNewTab =
        target === '_blank' || event.ctrlKey || event.metaKey || event.shiftKey
      if (!isExternal && !isNewTab && !isSameUrl) {
        change('changeStarted')
      }

      onClick?.(event)
    }
    return <NextLink {...props} href={href} onClick={handleClicked} ref={ref} />
  },
)

Link.displayName = 'Link'
