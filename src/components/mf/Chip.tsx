import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Filter chip — selected state uses an icon + weight, not colour alone. */
export function Chip({
  selected,
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-2xl border-2 px-4 text-small transition-colors",
        selected
          ? "border-primary bg-primary-soft font-semibold text-primary"
          : "border-border-strong bg-surface text-foreground hover:border-primary hover:bg-primary-soft/60",
        className,
      )}
      {...props}
    >
      {selected && <Check aria-hidden="true" className="size-4" />}
      {children}
    </button>
  );
}
