import { Link } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="flex items-center gap-1 rounded-2xl border-2 border-border-strong bg-surface p-1">
      <span className="sr-only" id="lang-label">
        {t("language")}
      </span>
      {(["en", "hi"] as const).map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          aria-describedby="lang-label"
          onClick={() => setLang(code)}
          className={cn(
            "min-h-9 rounded-xl px-3 text-small transition-colors",
            lang === code
              ? "bg-primary font-semibold text-primary-foreground"
              : "text-foreground hover:bg-primary-soft",
          )}
        >
          {code === "en" ? "English" : "हिंदी"}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useLang();
  const link = "rounded-md px-2 py-1 text-small font-medium hover:text-primary hover:underline";

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2 rounded-md">
          <HeartPulse aria-hidden="true" className="size-6 shrink-0 text-primary" />
          <span className="truncate text-h2">{t("brand")}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
            <Link to="/search" className={link}>
              {t("findDoctor")}
            </Link>
            <Link to="/appointment" className={link}>
              {t("myAppointments")}
            </Link>
            <Link to="/design-system" className={link}>
              {t("designNotes")}
            </Link>
          </nav>
          <LanguageToggle />
        </div>
      </div>
      <nav aria-label="Main mobile" className="flex gap-1 border-t border-border px-3 py-2 sm:hidden">
        <Link to="/search" className={link}>
          {t("findDoctor")}
        </Link>
        <Link to="/appointment" className={link}>
          {t("myAppointments")}
        </Link>
        <Link to="/design-system" className={link}>
          {t("designNotes")}
        </Link>
      </nav>
    </header>
  );
}
