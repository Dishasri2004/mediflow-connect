import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Video, MapPin } from "lucide-react";
import { Badge } from "@/components/mf/Badge";
import { Button } from "@/components/mf/Button";
import { formatFullDate, getDoctor } from "@/lib/doctors";
import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Your appointment — MediFlow" },
      { name: "description", content: "A confirmed appointment summary with ID, doctor, date, time and consultation type." },
      { property: "og:title", content: "Your appointment — MediFlow" },
      { property: "og:description", content: "Confirmation screen of the MediFlow booking concept." },
    ],
  }),
  component: AppointmentPage,
});

function AppointmentPage() {
  const { booking, reset, hydrated } = useBooking();
  const { t } = useLang();
  const doctor = booking.doctorId ? getDoctor(booking.doctorId) : undefined;

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <p className="text-body text-muted-foreground">Loading your appointment…</p>
      </div>
    );
  }

  if (!booking.appointmentId || !doctor) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-h1">You have no appointment yet</h1>
        <p className="mt-2 text-body text-muted-foreground">
          When you book an appointment, the details will appear here.
        </p>
        <Button asChild className="mt-6">
          <Link to="/search">{t("findDoctor")}</Link>
        </Button>
      </div>
    );
  }

  const Icon = doctor.consultation === "Video consultation" ? Video : MapPin;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex items-start gap-3">
        <CheckCircle2 aria-hidden="true" className="mt-1 size-7 shrink-0 text-success" />
        <div className="min-w-0">
          <h1 className="text-h1">Your appointment is booked.</h1>
          <p className="mt-1.5 text-body text-muted-foreground">
            We have saved these details. Please arrive or join five minutes early.
          </p>
        </div>
      </div>

      <div className="mt-7 rounded-lg border border-border bg-card p-5 shadow-card">
        <Badge tone="success" icon={<CheckCircle2 aria-hidden="true" className="size-4" />}>
          Confirmed
        </Badge>
        <p className="mt-4 text-label text-muted-foreground">Appointment ID</p>
        <p className="text-h2 tabular-nums">{booking.appointmentId}</p>

        <dl className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <dt className="text-label text-muted-foreground">Doctor</dt>
            <dd className="mt-0.5 text-body">
              {doctor.name}
              <span className="block text-small text-muted-foreground">{doctor.specialty}</span>
            </dd>
          </div>
          <div>
            <dt className="text-label text-muted-foreground">Date and time</dt>
            <dd className="mt-0.5 text-body">
              {booking.dateKey ? formatFullDate(booking.dateKey) : "—"}
              <span className="block text-small text-muted-foreground">{booking.slot}</span>
            </dd>
          </div>
          <div>
            <dt className="text-label text-muted-foreground">Type</dt>
            <dd className="mt-0.5 flex items-center gap-2 text-body">
              <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
              {doctor.consultation}
            </dd>
          </div>
          <div>
            <dt className="text-label text-muted-foreground">Patient</dt>
            <dd className="mt-0.5 text-body">{booking.fullName}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link to="/search">{t("bookAppointment")}</Link>
        </Button>
        <Button asChild variant="outline" size="lg" onClick={() => reset()}>
          <Link to="/">{t("home")}</Link>
        </Button>
      </div>
    </div>
  );
}
