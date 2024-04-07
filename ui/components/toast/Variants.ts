import { tv, type VariantProps } from 'tailwind-variants'

export const toastVariants = tv({
  slots: {
    base: 'group pointer-events-auto relative inline-block w-full min-w-80 cursor-grab overflow-hidden rounded-sm border px-4 py-2 text-sm transition-all active:cursor-grabbing data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full dark:!border-none data-[state=open]:sm:slide-in-from-bottom-full',
    description: 'font-normal',
    title: 'font-medium',
    close: 'right-2.5 top-2 h-4 w-4 shrink-0 opacity-70 hover:opacity-80',
    icon: 'mr-3 h-4 w-4 shrink-0 fill-current opacity-80',
  },
  variants: {
    toastType: {
      toast: {
        base: '',
      },
      notification: {
        base: '!border-slate-200 !bg-white',
        title: 'text-slate-800',
        description: 'ml-7 mt-1 text-sm text-slate-600',
      },
    },
    intent: {
      warning:
        'border-amber-200 bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400',
      error:
        'border-rose-200 bg-rose-100 text-rose-600 dark:bg-rose-400/20 dark:text-rose-400',
      success:
        'border-emerald-200 bg-emerald-100 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-500',
      info: 'border-indigo-200 bg-indigo-100 text-indigo-500 dark:bg-indigo-400/20 dark:text-indigo-400',
    },
  },
  defaultVariants: {
    intent: 'info',
  },
})

export type ToastVariantsType = VariantProps<typeof toastVariants>
