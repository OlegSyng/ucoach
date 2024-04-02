import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/ui/utils/cn"

const badgeVariants = tv({
    base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}


const badgeHintVariants = tv({
  base: "inline-flex items-center rounded-[2px] px-4 py-0.5 min-h-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    intent: {
      issue: "text-foreground bg-slate-100",
      success: "text-foreground bg-emerald-300",
    },
  },
  defaultVariants: {
    intent: "issue",
  },
})

export interface BadgeHintProps 
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeHintVariants> {}

function BadgeHint({ className, intent, ...props  }: BadgeHintProps) {
  return (
    <div className={cn(badgeHintVariants({ intent }), className)} {...props} />
  )
}

export { Badge, BadgeHint, badgeVariants }
