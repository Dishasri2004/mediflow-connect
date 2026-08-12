import { useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  inputProps?: React.ComponentProps<"input">;
  textarea?: boolean;
  textareaProps?: React.ComponentProps<"textarea">;
};

/** Input / Textarea with label, hint, and an error state that is not colour-only. */
export function Field({ label, hint, error, inputProps, textarea, textareaProps }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errId = `${id}-error`;
  const described = [hint ? hintId : null, error ? errId : null].filter(Boolean).join(" ") || undefined;

  const base = cn(
    "w-full rounded-md border-2 bg-surface px-4 py-3 text-body text-foreground placeholder:text-muted-foreground/80",
    "transition-colors hover:border-border-strong focus:border-primary focus:outline-none",
    error ? "border-destructive bg-destructive-soft" : "border-input",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-semibold text-foreground">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-small text-muted-foreground">
          {hint}
        </p>
      )}
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          aria-describedby={described}
          aria-invalid={error ? true : undefined}
          className={cn(base, "min-h-24 resize-y")}
          {...textareaProps}
        />
      ) : (
        <input
          id={id}
          aria-describedby={described}
          aria-invalid={error ? true : undefined}
          className={cn(base, "min-h-12")}
          {...inputProps}
        />
      )}
      {error && (
        <p id={errId} className="flex items-start gap-1.5 text-small font-medium text-destructive">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
