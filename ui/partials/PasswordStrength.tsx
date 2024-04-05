'use client'

import { passwordSchemaMessage } from '@/schemas'
import { BadgeHint } from '@/ui/components/Badge'
import { useFormField } from '@/ui/components/Form'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/ui/components/ToolTip'
import { cn } from '@/ui/utils/cn'
import { Check, X } from 'lucide-react'
import { forwardRef, useMemo } from 'react'
import { type SafeParseResult, type StringSchema } from 'valibot'
import { ICON_XS, STROKE_WIDTH } from '../utils/CONSTS'

const hintMessages = Object.values(passwordSchemaMessage).filter((message) =>
  message.includes('At least'),
)

const useBadges = (issues: SafeParseResult<StringSchema>['issues']) => {
  const badges = useMemo(
    () =>
      hintMessages
        .map((message) => ({
          message,
          isIssue: issues
            ? issues.findIndex((issue) => issue.message === message) !== -1
            : false,
        }))
        .sort((a, b) => {
          if (a.isIssue && !b.isIssue) {
            return 1
          }
          return -1
        }),
    [issues],
  ) 

  const messages = useMemo(() => {
    const messages = issues?.filter(
      ({ message }) => !hintMessages.includes(message),
    )
    return messages?.length ? messages.map(({ message }) => message) : null
  }, [issues])

  return { badges, messages }
}

interface PasswordStrengthProps extends React.HTMLAttributes<HTMLUListElement> {
  passwordResult: SafeParseResult<StringSchema>
}

export const PasswordStrength = forwardRef<
  HTMLUListElement,
  PasswordStrengthProps
>(({ className, passwordResult, ...props }, ref) => {
  const { issues } = passwordResult
  const { formMessageId, isTouched, isDirty } = useFormField()
  const { badges, messages } = useBadges(issues)

  if (!isTouched && !isDirty) {
    return null
  }

  return (
    <ul
      ref={ref}
      id={`${formMessageId}-ul`}
      className={cn(
        'flex w-full list-none flex-wrap text-sm font-medium',
        className,
      )}
      {...props}
    >
      {badges.map(({ isIssue, message }, index) => (
        <li
          key={message}
          className={cn('flex-1', index !== badges.length - 1 && 'mr-1')}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='flex w-full'>
                <BadgeHint
                  intent={isIssue ? 'issue' : 'success'}
                  className='flex-1'
                />
              </TooltipTrigger>
              <TooltipContent className='flex items-center'>
                {isIssue ? (
                  <X size={ICON_XS} strokeWidth={STROKE_WIDTH} className='text-destructive' />
                ) : (
                  <Check
                    size={ICON_XS}
                    strokeWidth={STROKE_WIDTH}
                    className='text-emerald-500'
                  />
                )}
                <span className='ml-1'>{message}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
      <li className='mt-2 w-full text-xs'>
        {messages ? (
          <p className='font-medium text-destructive'>{messages[0]}</p>
        ) : (
          <p className='text-end'>Password strength</p>
        )}
      </li>
    </ul>
  )
})
PasswordStrength.displayName = 'PasswordStrength'
