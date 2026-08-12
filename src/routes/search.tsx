import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import { Chip } from "@/components/mf/Chip";
import { DoctorCard } from "@/components/mf/DoctorCard";
import { Steps } from "@/components/mf/Steps";
import { useLang } from "@/lib/i18n";
import { doctors, languages, specialties, type Specialty } from "@/lib/doctors";

type SearchParams = {
  q?: string | undefined;
  specialty?: string | undefined;
  language?: string | undefined;
  today?: boolean | undefined;
};

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    specialty: typeof search["specialty"] === "string" ? search["specialty"] : undefined,
    language: typeof search["language"] === "string" ? search["language"] : undefined,
    today: search["today"] === true || search["today"] === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Find a doctor — MediFlow" },
      {
        name: "description",
        content: "Browse a short list of doctors by specialty, language and availability in the MediFlow concept.",
      },
      { property: "og:title", content: "Find a doctor — MediFlow" },
      { property: "og:description", content: "Filter a small list of doctors by specialty, language and availability." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const params = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [query, setQuery] = useState(params.q ?? "");
  const { t, td } = useLang();

  const setFilter = (patch: Partial<SearchParams>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const results = doctors.filter((d) => {
    const q = (params.q ?? "").trim().toLowerCase();
    const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
    const matchesSpecialty = !params.specialty || d.specialty === (params.specialty as Specialty);
    const matchesLanguage = !params.language || d.languages.includes(params.language);
    const matchesToday = !params.today || d.nextAvailable.startsWith("Today");
    return matchesQuery && matchesSpecialty && matchesLanguage && matchesToday;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-md text-small font-medium text-primary hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> {t("home")}
      </Link>
      <div className="mt-4">
        <Steps current={1} />
      </div>
      <h1 className="text-h1">{t("chooseDoctor")}</h1>
      <p className="mt-1.5 text-body text-muted-foreground">
        {results.length === 1 ? t("doctorAvailable") : t("doctorsAvailable", { n: results.length })}
      </p>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          setFilter({ q: query || undefined });
        }}
      >
        <label htmlFor="results-search" className="text-small font-semibold">
          {t("searchLabel")}
        </label>
        <div className="relative mt-1.5">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="results-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchLabel")}
            className="min-h-12 w-full rounded-md border-2 border-input bg-surface py-3 pr-4 pl-12 text-body hover:border-border-strong focus:border-primary focus:outline-none"
          />
        </div>
      </form>

      <div className="mt-6 grid gap-4">
        <fieldset>
          <legend className="text-label text-muted-foreground">{t("filterSpecialty")}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {specialties.map((s) => (
              <Chip
                key={s}
                selected={params.specialty === s}
                onClick={() => setFilter({ specialty: params.specialty === s ? undefined : s })}
              >
                {td(s)}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-label text-muted-foreground">{t("filterLanguage")}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {languages.map((l) => (
              <Chip
                key={l}
                selected={params.language === l}
                onClick={() => setFilter({ language: params.language === l ? undefined : l })}
              >
                {td(l)}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-label text-muted-foreground">{t("filterAvailability")}</legend>
          <div className="mt-2">
            <Chip selected={!!params.today} onClick={() => setFilter({ today: params.today ? undefined : true })}>
              {t("availableToday")}
            </Chip>
          </div>
        </fieldset>
      </div>

      <div aria-live="polite" className="mt-8 grid gap-4 sm:grid-cols-2">
        {results.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-8 rounded-lg border-2 border-dashed border-border-strong bg-surface p-6">
          <h2 className="text-h2">{t("noMatchTitle")}</h2>
          <p className="mt-1.5 text-small text-muted-foreground">
            {t("noMatchBody")}
          </p>
        </div>
      )}
    </div>
  );
}
