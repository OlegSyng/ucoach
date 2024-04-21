import { Link } from '@/ui/router-events'
import { cn } from '@/ui/utils/cn'
import { ChevronRightIcon } from 'lucide-react'
import React from 'react'

export const MenuItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    description?: string
    icon?: React.ReactNode
    hasChevron?: boolean
    hoverColor?: 'foreground' | 'brand'
  }
>(
  (
    {
      className,
      title,
      href = '',
      description,
      icon,
      hasChevron,
      children,
      hoverColor = 'foreground',
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        href={href}
        ref={ref}
        className={cn(
          'group/menu-item flex select-none items-center gap-3 rounded-md p-2 text-sm leading-none no-underline outline-none focus-visible:rounded focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground',
          description && 'items-center',
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            {icon && (
              <div className='flex h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground [&>svg]:group-hover/menu-item:text-slate-500'>
                {icon}
              </div>
            )}
            <div className='flex flex-col justify-center'>
              <div className='flex items-center gap-1'>
                <p className='leading-snug text-foreground'>{title}</p>
                {hasChevron && (
                  <ChevronRightIcon
                    strokeWidth={2}
                    className='w-3 -translate-x-1 text-foreground opacity-0 transition-all will-change-transform group-hover/menu-item:translate-x-0 group-hover/menu-item:opacity-100'
                  />
                )}
              </div>
              {description && (
                <p className='-mb-1 line-clamp-1 leading-relaxed text-primary group-hover/menu-item:text-primary/70 group-focus-visible/menu-item:text-primary/80'>
                  {description}
                </p>
              )}
            </div>
          </>
        )}
      </Link>
    )
  },
)
