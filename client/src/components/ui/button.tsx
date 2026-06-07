import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-brand text-sm font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
  " hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border",
        outline:
          // Shows the background color of whatever card / sidebar / accent background it is inside of.
          // Inherits the current text color.
          " border [border-color:var(--button-outline)]  shadow-xs active:shadow-none ",
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border ",
        // Add a transparent border so that when someone toggles a border on later, it doesn't shift layout/size.
        ghost: "border border-transparent",
        luxury:
          "!rounded-brand !bg-black text-white border-2 !border-[#d4af37] shadow-lg disabled:!opacity-100 disabled:pointer-events-auto disabled:!cursor-not-allowed",
        brand:
          "min-h-0 rounded-brand border border-brand-champagne bg-brand-champagne px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90",
        brandGhost:
          "min-h-0 rounded-brand border border-brand-champagne bg-brand-ivory/10 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-champagne hover:bg-brand-ivory/15 hover:text-brand-champagne",
        brandOutline:
          "min-h-0 rounded-brand border border-brand-midnight px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-midnight/5",
        brandSapphire:
          "min-h-0 rounded-brand border border-brand-sapphire bg-brand-sapphire px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-sapphire/90",
        brandSapphireGhost:
          "min-h-0 rounded-brand border border-brand-ivory/35 bg-transparent px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-ivory hover:text-brand-midnight",
      },
      // Heights are set as "min" heights, because sometimes Ai will place large amount of content
      // inside buttons. With a min-height they will look appropriate with small amounts of content,
      // but will expand to fit large amounts of content.
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-brand px-3 text-xs",
        lg: "min-h-10 rounded-brand px-8",
        icon: "h-9 w-9 rounded-brand",
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
