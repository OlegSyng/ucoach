import { cn } from '@/ui/utils/cn'
import { forwardRef, type ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: ReactNode
  suffix?: ReactNode
  prefixSuffixClassName?: string
  wrapperClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      prefix,
      suffix,
      prefixSuffixClassName,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('relative', wrapperClassName)}>
        {prefix && (
          <div
            className={cn(
              'pointer-events-none absolute bottom-0 left-0 right-auto top-0 z-10 flex h-full items-center justify-center',
              prefixSuffixClassName,
            )}
          >
            <span className={cn('px-3 text-sm font-medium text-slate-400')}>
              {prefix}
            </span>
          </div>
        )}
        {suffix && (
          <div
            className={cn(
              'pointer-events-none absolute bottom-0 left-auto right-0 top-0 z-10 flex h-full items-center justify-center',
              prefixSuffixClassName,
            )}
          >
            <span className={cn('px-3 text-sm font-medium text-slate-400')}>
              {suffix}
            </span>
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            prefix && 'pl-12',
            suffix && 'pr-12',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
