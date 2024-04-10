'use client'

import { loginSchema } from '@/schemas'
import { Button } from '@/ui/components/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/ui/components/Form'
import { Heading } from '@/ui/components/Heading'
import { Loading } from '@/ui/components/Loading'
import { Separator } from '@/ui/components/Separator'
import { Input } from '@/ui/components/inputs'
import { toast } from '@/ui/components/toast'
import { Link } from '@/ui/router-events'
import { ICON_MD } from '@/ui/utils/CONSTS'
import { cn } from '@/ui/utils/cn'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { parse } from 'valibot'

export default function LoginRoute({
  searchParams: { action, target },
}: {
  searchParams: { action?: string; target?: string }
}) {
  const [showPassword, setShowPassword] = useState(false)
  const { push } = useRouter()
  const { formState, ...form } = useForm({
    mode: 'onTouched',
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function handleRegister(
    data: unknown,
    event?: React.BaseSyntheticEvent,
  ) {
    event?.preventDefault()
    try {
      const { username, password } = parse(loginSchema, data)
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      if (result?.ok) {
        toast({
          title: 'Signed in successfully',
          description: 'Redirecting you to your dashboard',
          intent: 'success',
        })
        if (action === 'redirect_after' && target) {
          push(target)
        } else {
          push('/')
        }
      } else {
        throw new Error('An error occurred')
      }
    } catch (error) {
      toast({
        title: 'Error signing you in',
        description: 'Please try again',
        intent: 'error',
      })
    }
  }

  return (
    <>
      <Heading level={4} className='mb-6'>
        Welcome Back
      </Heading>
      <Form {...form} formState={formState}>
        <form
          onSubmit={form.handleSubmit(handleRegister) as () => void}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter your username' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='off'
                    {...field}
                    placeholder='Enter your password'
                    prefixSuffixClassName='pointer-events-auto'
                    suffix={
                      <Button
                        type='button'
                        onClick={() => {
                          setShowPassword((prev) => !prev)
                        }}
                        variant={{ intent: 'icon' }}
                        className='border-none bg-transparent shadow-none'
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='mt-6 flex items-center justify-between'>
            <div className='mr-1'>
              <Link
                className='text-sm underline hover:no-underline'
                href='/auth/reset-password'
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type='submit'
              disabled={!formState.isValid || formState.isSubmitting}
              variant={{ intent: 'primary' }}
            >
              <span className={cn(formState.isSubmitting && 'opacity-0')}>
                Sign In
              </span>
              {formState.isSubmitting && (
                <Loading
                  size={ICON_MD}
                  wrapperClassName='p-0 inset-0 absolute'
                />
              )}
            </Button>
          </div>
        </form>
        <Separator className='my-4' />
        <div className='text-sm'>
          Do not you have an account?{' '}
          <Link
            className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
            href='/auth/register'
          >
            Sign Up
          </Link>
        </div>
      </Form>
    </>
  )
}
