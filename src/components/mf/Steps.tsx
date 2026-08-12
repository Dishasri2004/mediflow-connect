import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Progress indicator: 01 Doctor · 02 Time · 03 Details · 04 Confirm */
export function Steps({ current }: { current: 1 | 2 | 3 | 4 }) {
  const { t } = useLang();
  const steps = [t("stepDoctor"), t("stepTime"), t("stepDetails"), t("stepConfirm")];

  return (
    <nav aria-label="Booking progress" className="mb-6">
      <p className="sr-only">
        Step {current} of 4: {steps[current - 1]}
      </p>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {steps.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-2xl border-2 px-3 py-1.5 text-small",
                  active && "border-primary bg-primary text-primary-foreground font-semibold",
                  done && "border-primary/40 bg-primary-soft text-primary font-medium",
                  !active && !done && "border-border bg-surface text-muted-foreground",
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <span aria-hidden="true" className="tabular-nums">
                    0{n}
                  </span>
                )}
                <span>{label}</span>
              </span>
              {n < 4 && <span aria-hidden="true" className="h-px w-3 bg-border-strong sm:w-5" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
