import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-zen-grey-light-3 focus-visible:border-zen-grey-light-2 aria-invalid:ring-red-300 aria-invalid:border-red-300",
   {
    variants: {
      variant: {
        default:
          "bg-zen-grey-dark-1 text-zen-white-1 shadow-lg hover:bg-zen-grey-dark-2 hover:scale-105",
        destructive:
          "bg-red-500 text-white shadow-lg hover:bg-red-600 focus-visible:ring-red-300",
        outline:
          "border bg-transparent border-zen-grey-light-3 shadow-md hover:bg-zen-grey-light-1 hover:text-zen-grey-dark-1",
        secondary:
          "bg-zen-grey-light-2 text-zen-grey-dark-1 shadow-md hover:bg-zen-grey-light-3",
        ghost:
          "hover:bg-zen-grey-light-2 hover:text-zen-grey-dark-1",
        link: "text-zen-grey-dark-1 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    icon?: React.ReactNode
    iconPosition?: "left" | "right"
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  icon,
  iconPosition = "left",
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-1 flex items-center">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-1 flex items-center">{icon}</span>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
