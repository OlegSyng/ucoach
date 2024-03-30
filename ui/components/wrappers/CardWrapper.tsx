import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants"
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/ui/utils/cn";

const cardVariants = tv({
  base: "rounded-sm border p-5 shadow-lg",
  variants: {
    intent: {
      default:
        "border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export const CardWrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> &
    VariantProps<typeof cardVariants> & {
      asChild?: boolean;
    }
>(({ className, intent, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      {...props}
      data-role="box"
      ref={ref}
      className={cn(cardVariants({ intent }), className)}
    />
  );
});

CardWrapper.displayName = "CardWrapper";
