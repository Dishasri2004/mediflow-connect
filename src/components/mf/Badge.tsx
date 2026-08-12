import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "info" | "warning";

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground border-border-strong",
  success: "bg-success-soft text-success border-success/40",
  info: "bg-primary-soft text-primary border-primary/30",
  warning: "bg-accent/50 text-accent-foreground border-accent",
};

/** Status badge — always pairs colour with a text label. */
export function Badge({
  tone = "neutral",
  icon,
  children,
  className,
}: {
  tone?: Tone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[0.8125rem] font-semibold",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
