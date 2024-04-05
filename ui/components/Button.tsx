import { cn } from '@/ui/utils/cn'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef, ComponentPropsWithoutRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'relative inline-flex items-center justify-center whitespace-nowrap rounded border border-transparent text-sm font-medium leading-5 shadow-sm outline-none transition duration-150 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none data-[loading=true]:border-slate-200 data-[loading=true]:bg-slate-100 data-[loading=true]:text-slate-400 dark:disabled:border-slate-600 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 [&:active:not(:disabled)]:scale-[0.98] [&:active:not(:disabled)]:opacity-90',
  variants: {
    intent: {
      success:
        'bg-emerald-500 text-white hover:bg-emerald-600 hover:bg-opacity-80',
      'success-ghost':
        'border-slate-200 text-emerald-500 hover:border-slate-300 hover:border-opacity-80',
      primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
      'primary-ghost':
        'border-slate-200 bg-transparent text-indigo-500 dark:!border-slate-700',
      icon: 'shrink-0 rounded border border-slate-200 bg-white !p-1.5 shadow-sm hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600',
      danger:
        'bg-rose-500 text-white hover:border-opacity-80 hover:bg-opacity-80',
      base: 'border-none bg-transparent !p-0 text-slate-600 disabled:!bg-transparent dark:text-slate-300',
      tertiary:
        'border-slate-200 text-slate-600 hover:border-slate-300 hover:border-opacity-80 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600',
      secondary:
        'border-slate-200 text-indigo-500 hover:border-slate-300 hover:border-opacity-80 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600',
      'danger-ghost':
        'border-slate-200 text-rose-500 hover:border-slate-300 hover:border-opacity-80 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600',
    },
    size: {
      xs: 'px-2 py-0.5',
      sm: 'px-2 py-1',
      lg: 'px-4 py-3',
      base: 'px-3 py-2 ',
    },
    width: {
      fit: 'w-fit',
      fluid: 'w-full',
    },
  },
  compoundVariants: [
    {
      intent: 'icon',
      size: 'xs',
      class: 'flex items-center justify-center',
    },
  ],
  defaultVariants: {
    intent: 'tertiary',
    size: 'base',
    width: 'fit',
  },
})

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: VariantProps<typeof buttonVariants>
  loading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, loading, asChild = false, type = 'button', ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        type={type}
        {...props}
        data-loading={loading}
        className={cn(buttonVariants(variant), className)}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
