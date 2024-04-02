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
import { forwardRef, useMemo } from 'react'
import type { SafeParseResult, StringSchema } from 'valibot'

interface PasswordStrengthProps
  extends React.HTMLAttributes<HTMLUListElement> {
  passwordResult: SafeParseResult<StringSchema>
}

export const PasswordStrength = forwardRef<
  HTMLUListElement,
  PasswordStrengthProps
>(({ className, passwordResult, ...props }, ref) => {
  const { issues, success } = passwordResult
  const { formMessageId, isTouched } = useFormField()

  const badges = useMemo(
    () =>
      Object.values(passwordSchemaMessage)
        .filter((message) => message.includes('At least'))
        .map((message) => ({
          message,
          isIssue:
            issues?.findIndex((issue) => issue.message === message) !== -1,
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
    const badgesMessages = badges.map(({ message }) => message)
    return !success
      ? issues
          .map(({ message }) => message)
          .filter((message) => !badgesMessages.includes(message))
      : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues, success])

  if (!isTouched) {
    return null
  }

  return (
    <ul
      ref={ref}
      id={`${formMessageId}-ul`}
      className={cn(
        'flex flex-wrap w-full list-none text-sm font-medium',
        className,
      )}
      {...props}
    >
      {badges.map(({ isIssue, message }) => (
        <li key={message} className={cn('w-10')}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BadgeHint intent={isIssue ? 'issue' : 'success'} />
              </TooltipTrigger>
              <TooltipContent className='mx-4 min-w-fit text-xs leading-none'>
                <span>{message}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
      {/* {messages && (
        <li className='w-full text-sm font-medium text-destructive'>
          <p>{messages[0]}</p>
        </li>
      )} */}
    </ul>
  )
})
PasswordStrength.displayName = 'PasswordStrength'
