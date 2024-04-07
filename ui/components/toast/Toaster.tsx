'use client'

import { cn } from '@/ui/utils/cn'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toasts'
import { toastVariants, ToastVariantsType } from './Variants'
import { useToast } from './use-toast'

const typeIcon: Record<
  Exclude<ToastVariantsType['intent'], undefined>,
  React.ReactNode
> = {
  warning: (
    <svg viewBox='0 0 16 16'>
      <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z' />
    </svg>
  ),
  error: (
    <svg viewBox='0 0 16 16'>
      <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z' />
    </svg>
  ),
  success: (
    <svg viewBox='0 0 16 16'>
      <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z' />
    </svg>
  ),
  info: (
    <svg viewBox='0 0 16 16'>
      <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z' />
    </svg>
  ),
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        intent,
        toastType,
        action,
        ...props
      }) {
        const {
          icon,
          base,
          description: descriptionCls,
          title: titleCls,
          close,
        } = toastVariants({ intent, toastType })

        return (
          <Toast key={id} className={base()} {...props}>
            <div className='flex w-full items-center justify-start'>
              <div className={icon()}>
                {intent ? typeIcon[intent] : typeIcon.info}
              </div>
              <ToastTitle className={cn(titleCls(), 'flex-1 text-start')}>
                {title}
              </ToastTitle>
              <ToastClose className={cn(close(), '')} />
            </div>
            {description && (
              <ToastDescription className={descriptionCls()}>
                {description}
              </ToastDescription>
            )}
            <div className='flex w-full items-center justify-end'>{action}</div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
