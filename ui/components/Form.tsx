import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { Label } from "@/ui/components/Label"
import { BadgeHint } from "@/ui/components/Badge"
import { cn } from "@/ui/utils/cn"
import type { SafeParseResult, StringSchema } from "valibot"
import { passwordSchemaMessage } from "@/schemas"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

interface FormPasswordMessageProps
  extends React.HTMLAttributes<HTMLUListElement> {
    passwordResult: SafeParseResult<StringSchema>
  }

const FormMessagePassword = React.forwardRef<
  HTMLUListElement,
  FormPasswordMessageProps
>(({ className, passwordResult, ...props }, ref) => {
  const { issues, success } = passwordResult
  const { formMessageId, isTouched } = useFormField()
  
  const badges = React.useMemo(() => (
    Object.values(passwordSchemaMessage)
    .filter((message) => message.includes("At least"))
    .map((message) => ({
      message,
      isIssue: issues?.findIndex((issue) => issue.message === message) !== -1
    }))
    .sort((a, b) => {
      if (a.isIssue && !b.isIssue) {
        return 1
      } 
      return -1
    })
    ), [issues])
    
  const messages = React.useMemo(() => {
    const badgesMessages = badges.map(({message}) => message)
    return !success ? issues.map(({message}) => message).filter((message) => !badgesMessages.includes(message)) : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues, success]) 

  if (!isTouched) {
    return null
  }

  return (
    <>
      <ul
        ref={ref}
        id={formMessageId}
        className={cn("text-sm font-medium flex list-disc [&>li:not(:last-child)]:mr-1 [&>li]:flex-1", className)}
        {...props}
      >
        {badges.map(({ isIssue }, index) => (
          <BadgeHint
            key={index}
            intent={isIssue ? "error" : "pristine"}
          />
        ))}
      </ul>
      {messages && (
        <p 
          id={formMessageId}
          className="text-sm font-medium text-destructive"
        >
          {messages[0]}
        </p>
      )}
    </>
  )
})
FormMessagePassword.displayName = "FormPasswordMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormMessagePassword,
  FormField,
}
