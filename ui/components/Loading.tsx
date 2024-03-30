import React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/ui/utils/cn";

export function Loading({
  size = 30,
  className,
  wrapperClassName,
}: {
  size?: number;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={cn("w-full p-5 flex-center", wrapperClassName)  }>
      <LoaderCircle
        style={{
          animationDuration: "2s",
        }}
        className={cn(
          "animate-spin transition-transform text-indigo-600 dark:text-white",
          className
        )}
        size={size}
      />
    </div>
  );
}
