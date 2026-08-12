import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Button component — variants + states mirror the Figma component set. */
export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:opacity-55 disabled:saturate-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/75 active:bg-secondary/85",
        outline:
          "border-2 border-border-strong bg-surface text-foreground hover:border-primary hover:bg-primary-soft",
        ghost: "text-primary underline underline-offset-4 hover:bg-primary-soft",
      },
      size: {
        md: "min-h-12 px-5 text-[1rem]",
        sm: "min-h-11 px-4 text-small",
        lg: "min-h-14 px-6 text-[1.0625rem]",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

export function Button({
  className,
  variant,
  size,
  block,
  asChild,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, block }), className)} {...props} />;
}
