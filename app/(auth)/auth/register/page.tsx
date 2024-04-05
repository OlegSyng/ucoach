'use client'

import { registerUserCoachSchema } from '@/schemas'
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
import { Input } from '@/ui/components/inputs'
import { PasswordStrength } from '@/ui/partials/PasswordStrength'
import { cn } from '@/ui/utils/cn'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { safeParse, Output } from 'valibot'
import { ICON_MD } from '@/ui/utils/CONSTS'

const passwordSchema = registerUserCoachSchema.entries.password

export default function RegisterRoute() {
  const [showPassword, setShowPassword] = useState(false)
  const { formState, ...form } = useForm({
    mode: 'onTouched',
    resolver: valibotResolver(registerUserCoachSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    },
  })

  const handleRegister: SubmitHandler<
    Output<typeof registerUserCoachSchema>
  > = async (data, event) => {
    event?.preventDefault()
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(data)
        resolve()
      }, 5000)
    })
  }

  return (
    <>
      <Heading level={4} className='mb-6'>
        Create your Account
      </Heading>
      <Form {...form} formState={formState}>
        <form
          onSubmit={form.handleSubmit(handleRegister) as () => void}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter your name' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter your last name' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    {...field}
                    placeholder='Enter your email'
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Create username' />
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
                    placeholder='Create password'
                    prefixSuffixClassName='pointer-events-auto'
                    suffix={
                      <Button
                        type='button'
                        onClick={() => {
                          setShowPassword((prev) => !prev)
                        }}
                        variant={{ intent: 'icon' }}
                        className='border-none'
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    }
                  />
                </FormControl>
                <PasswordStrength
                  passwordResult={safeParse(passwordSchema, field.value)}
                />
              </FormItem>
            )}
          />
          <div className='mt-6 flex justify-end'>
            <Button 
                type='submit'
                disabled={!formState.isValid || formState.isSubmitting}
                variant={{ intent: 'primary' }} 
            >
              <span className={cn(formState.isSubmitting && 'opacity-0')}>
                Sign Up
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
      </Form>
    </>
  )
}
