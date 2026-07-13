import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { focusRing } from "@/lib/design-system"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-body-sm font-medium",
    "h-12 px-7 transition-opacity duration-brand ease-brand-out",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "no-default-hover-elevate no-default-active-elevate",
    focusRing,
  ),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border",
        outline:
          "border border-brand-border bg-transparent text-brand-ink hover:opacity-80",
        secondary:
          "border border-brand-border bg-brand-surface text-brand-ink hover:opacity-80",
        ghost: "border border-transparent text-brand-ink hover:opacity-80",
        luxury:
          "rounded-button border border-brand-gold bg-brand-navy text-brand-ivory hover:opacity-90",
        brand:
          "border border-brand-brass bg-brand-brass text-brand-navy hover:opacity-90",
        brandGhost:
          "border border-brand-border bg-transparent text-brand-ink hover:opacity-80",
        brandOutline:
          "border border-brand-navy/25 bg-transparent text-brand-ink hover:opacity-80",
        brandSapphire:
          "border border-brand-navy-secondary bg-brand-navy-secondary text-brand-ivory hover:opacity-90",
        brandSapphireGhost:
          "border border-brand-ivory/30 bg-transparent text-brand-ivory hover:opacity-80",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 rounded-button px-5 text-body-sm",
        compact: "h-9 rounded-button px-4 text-[0.8125rem] font-normal tracking-[0.01em]",
        lg: "h-12 px-8",
        icon: "h-12 w-12 rounded-button",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
