import { Link } from "@tanstack/react-router";
import { Clock, Languages, Video, MapPin } from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { useLang } from "@/lib/i18n";
import type { Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { t } = useLang();
  const Icon = doctor.consultation === "Video consultation" ? Video : MapPin;

  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/50">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-[0.95rem] font-bold text-primary"
        >
          {doctor.initials}
        </span>
        <div className="min-w-0">
          <h3 className="text-h2">{doctor.name}</h3>
          <p className="text-small text-muted-foreground">
            {doctor.specialty} · {doctor.experience} years experience
          </p>
        </div>
      </div>

      <dl className="mt-4 grid gap-2 text-small">
        <div className="flex items-center gap-2">
          <Languages aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          <dt className="sr-only">Languages</dt>
          <dd>{doctor.languages.join(" · ")}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          <dt className="sr-only">Consultation type</dt>
          <dd>{doctor.consultation}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          <dt className="sr-only">Next available</dt>
          <dd>
            <Badge tone="success">Next available: {doctor.nextAvailable}</Badge>
          </dd>
        </div>
      </dl>

      <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
        <Link to="/doctors/$doctorId" params={{ doctorId: doctor.id }}>
          {t("viewProfile")}
          <span className="sr-only"> — {doctor.name}</span>
        </Link>
      </Button>
    </article>
  );
}
