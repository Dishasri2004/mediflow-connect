import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock, IndianRupee, Languages, MapPin, Video } from "lucide-react";
import { Badge } from "@/components/mf/Badge";
import { Button } from "@/components/mf/Button";
import { Steps } from "@/components/mf/Steps";
import { getDoctor, timeSlots } from "@/lib/doctors";
import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/doctors/$doctorId")({
  loader: ({ params }) => {
    const doctor = getDoctor(params.doctorId);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Doctor not found — MediFlow" }, { name: "robots", content: "noindex" }] };
    }
    const { doctor } = loaderData;
    const title = `${doctor.name}, ${doctor.specialty} — MediFlow`;
    const description = `${doctor.name} — ${doctor.experience} years experience, ${doctor.consultation.toLowerCase()}. Fictional profile in the MediFlow booking concept.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DoctorProfile,
});

function DoctorProfile() {
  const { doctor } = Route.useLoaderData();
  const { update } = useBooking();
  const { t, td, lang } = useLang();
  const navigate = useNavigate();
  const Icon = doctor.consultation === "Video consultation" ? Video : MapPin;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        to="/search"
        className="inline-flex items-center gap-1.5 rounded-md text-small font-medium text-primary hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> {t("backToDoctors")}
      </Link>
      <div className="mt-4">
        <Steps current={1} />
      </div>

      <header className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
        <span
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-soft text-h2 text-primary"
        >
          {doctor.initials}
        </span>
        <div className="min-w-0">
          <h1 className="text-h1">{doctor.name}</h1>
          <p className="mt-1 text-body text-muted-foreground">
            {td(doctor.specialty)} · {doctor.experience} {t("yearsExperience")}
          </p>
        </div>
      </header>

      <dl className="mt-6 grid gap-3 rounded-lg border border-border bg-card p-5 text-body shadow-card sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <Languages aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-label text-muted-foreground">{t("languagesLabel")}</dt>
            <dd className="mt-0.5">{doctor.languages.map((l) => td(l)).join(" · ")}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-label text-muted-foreground">{t("howConsultation")}</dt>
            <dd className="mt-0.5">{td(doctor.consultation)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <IndianRupee aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-label text-muted-foreground">{t("consultationFee")}</dt>
            <dd className="mt-0.5">₹{doctor.fee}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-label text-muted-foreground">{t("nextAvailable")}</dt>
            <dd className="mt-1">
              <Badge tone="success">{td(doctor.nextAvailable)}</Badge>
            </dd>
          </div>
        </div>
      </dl>

      <section className="mt-8">
        <h2 className="text-h2">{t("about")}</h2>
        <p className="mt-2 max-w-prose text-body text-muted-foreground">{lang === "hi" ? doctor.bioHi : doctor.bio}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-h2">{t("usualTimes")}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <li
              key={slot}
              className="rounded-2xl border border-border bg-surface px-3 py-1.5 text-small text-muted-foreground"
            >
              {td(slot)}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-small text-muted-foreground">
          {t("usualTimesNote")}
        </p>
      </section>

      <div className="sticky bottom-0 mt-10 -mx-4 border-t border-border bg-surface/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
        <Button
          size="lg"
          block
          className="sm:w-auto"
          onClick={() => {
            update({ doctorId: doctor.id });
            navigate({ to: "/book/time" });
          }}
        >
          {t("chooseAppointment")}
        </Button>
      </div>
    </div>
  );
}
