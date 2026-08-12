import { RefreshCw, WifiOff } from "lucide-react";
import { Button } from "./Button";
import { useLang } from "@/lib/i18n";

/**
 * Single low-connectivity state. The app is not actually offline-capable —
 * this demonstrates how an interruption would be communicated.
 */
export function ConnectionError({ onRetry }: { onRetry: () => void }) {
  const { t } = useLang();

  return (
    <div role="alert" className="rounded-lg border-2 border-destructive bg-destructive-soft p-5">
      <div className="flex items-start gap-3">
        <WifiOff aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div className="min-w-0">
          <h2 className="text-h2 text-destructive">{t("connectionTitle")}</h2>
          <p className="mt-1 text-small">{t("connectionBody")}</p>
          <Button variant="primary" size="sm" className="mt-4" onClick={onRetry}>
            <RefreshCw aria-hidden="true" className="size-4" />
            {t("tryAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
}
