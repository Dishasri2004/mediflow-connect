import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Type, MousePointerClick } from "lucide-react";
import { Button } from "@/components/mf/Button";
import { Chip } from "@/components/mf/Chip";
import { specialties } from "@/lib/doctors";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediFlow — Find the right care, without the confusion" },
      {
        name: "description",
        content:
          "MediFlow is a human-centered design concept for booking a doctor's appointment in a few simple, accessible steps.",
      },
      { property: "og:title", content: "MediFlow — Find the right care, without the confusion" },
      {
        property: "og:description",
        content: "A small UX concept: find a doctor and book a convenient appointment time in a few simple steps.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, td } = useLang();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <section>
        <p className="text-label text-primary">{t("homeEyebrow")}</p>
        <h1 className="mt-3 max-w-2xl text-display">{t("homeTitle")}</h1>
        <p className="mt-4 max-w-xl text-body text-muted-foreground">
          {t("homeSubtitle")}
        </p>

        <form
          className="mt-8 max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/search", search: { q: query || undefined } });
          }}
        >
          <label htmlFor="home-search" className="text-small font-semibold">
            {t("searchLabel")}
          </label>
          <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="home-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchLabel")}
                className="min-h-13 w-full rounded-md border-2 border-input bg-surface py-3 pr-4 pl-12 text-body placeholder:text-muted-foreground/80 hover:border-border-strong focus:border-primary focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg">
              {t("findDoctor")}
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-label text-muted-foreground">{t("orChooseSpecialty")}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {specialties.map((s) => (
              <li key={s}>
                <Chip onClick={() => navigate({ to: "/search", search: { specialty: s } })}>{td(s)}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-8">
        <h2 className="text-h1">{t("howDesigned")}</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: MousePointerClick,
              title: t("hcd1Title"),
              body: t("hcd1Body"),
            },
            {
              icon: Type,
              title: t("hcd2Title"),
              body: t("hcd2Body"),
            },
            {
              icon: ShieldCheck,
              title: t("hcd3Title"),
              body: t("hcd3Body"),
            },
          ].map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-lg border border-border bg-card p-5 shadow-card">
              <Icon aria-hidden="true" className="size-5 text-primary" />
              <h3 className="mt-3 text-h2">{title}</h3>
              <p className="mt-1.5 text-small text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-small text-muted-foreground">
          {t("conceptNote")}{" "}
          <Link to="/design-system" className="font-semibold text-primary underline underline-offset-4">
            {t("readDesignNotes")}
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
