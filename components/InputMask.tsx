"use client"
import { forwardRef, LegacyRef } from 'react';
import { cn } from '@/lib/utils';
import emailMask from 'text-mask-addons/dist/emailMask';
import MaskedInput, { MaskedInputProps, Mask } from 'react-text-mask';

const twClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const InputMask = forwardRef<MaskedInput, MaskedInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <MaskedInput
          className={cn(twClasses, className)}
          ref={ref as LegacyRef<MaskedInput>}
          {...props}
      />
    );
  }
)
InputMask.displayName = "InputMask"

const EmailInputMask = forwardRef<MaskedInput, Omit<MaskedInputProps, "mask">>(
  ({ className, ...props }, ref ) => {
    return (
      <MaskedInput
          className={cn(twClasses, className)}
          mask={emailMask as Mask}
          ref={ref as LegacyRef<MaskedInput>}
          {...props}
      />
    );
  }
)
EmailInputMask.displayName = "EmailInputMask"

export { InputMask, EmailInputMask }