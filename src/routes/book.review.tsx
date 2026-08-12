import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/mf/Button";
import { ConnectionError } from "@/components/mf/ConnectionError";
import { Steps } from "@/components/mf/Steps";
import { formatFullDate, getDoctor } from "@/lib/doctors";
import { makeAppointmentId, useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/book/review")({
  head: () => ({
    meta: [
      { title: "Review your appointment — MediFlow" },
      { name: "description", content: "Check the doctor, date, time and patient details before confirming." },
      { property: "og:title", content: "Review your appointment — MediFlow" },
      { property: "og:description", content: "Step 4 of the MediFlow booking concept: review, then confirm." },
    ],
  }),
  component: ReviewPage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 border-b border-border py-3 last:border-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-label text-muted-foreground">{label}</dt>
      <dd className="text-body">{value}</dd>
    </div>
  );
}

function ReviewPage() {
  const { booking, update, hydrated } = useBooking();
  const { t } = useLang();
  const navigate = useNavigate();
  const [state, setState] = useState<"idle" | "saving" | "offline">("idle");

  const doctor = booking.doctorId ? getDoctor(booking.doctorId) : undefined;

  if (hydrated && (!doctor || !booking.slot || !booking.fullName)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-h1">Let's finish the earlier steps</h1>
        <p className="mt-2 text-body text-muted-foreground">
          We still need a doctor, a time and the patient's details before you can review the appointment.
        </p>
        <Button asChild className="mt-6">
          <Link to="/search">{t("findDoctor")}</Link>
        </Button>
      </div>
    );
  }

  function confirm(simulateFailure: boolean) {
    setState("saving");
    window.setTimeout(() => {
      if (simulateFailure) {
        setState("offline");
        return;
      }
      update({ appointmentId: makeAppointmentId() });
      setState("idle");
      navigate({ to: "/appointment" });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        to="/book/details"
        className="inline-flex items-center gap-1.5 rounded-md text-small font-medium text-primary hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to patient details
      </Link>
      <div className="mt-4">
        <Steps current={4} />
      </div>

      <h1 className="text-h1">Please check these details</h1>
      <p className="mt-1.5 text-body text-muted-foreground">
        Nothing is booked yet. You can go back and change any answer.
      </p>

      {state === "offline" && (
        <div className="mt-6">
          <ConnectionError onRetry={() => confirm(false)} />
        </div>
      )}

      <dl className="mt-6 rounded-lg border border-border bg-card p-5 shadow-card">
        <Row label="Doctor" value={`${doctor?.name} · ${doctor?.specialty}`} />
        <Row label="Date" value={booking.dateKey ? formatFullDate(booking.dateKey) : "—"} />
        <Row label="Time" value={booking.slot ?? "—"} />
        <Row label="Type" value={doctor?.consultation ?? "—"} />
        <Row label="Fee" value={doctor ? `₹${doctor.fee}` : "—"} />
        <Row label="Patient" value={`${booking.fullName}, age ${booking.age}`} />
        <Row label="Phone" value={booking.phone ?? "—"} />
        <Row label="Reason" value={booking.reason ?? "—"} />
      </dl>

      <div className="sticky bottom-0 mt-8 -mx-4 border-t border-border bg-surface/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
        <Button size="lg" block className="sm:w-auto" disabled={state === "saving"} onClick={() => confirm(false)}>
          {state === "saving" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Booking your appointment…
            </>
          ) : (
            t("confirm")
          )}
        </Button>
        <p aria-live="polite" className="sr-only">
          {state === "saving" ? "Booking your appointment" : ""}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 sm:mt-0 sm:ml-3"
          onClick={() => confirm(true)}
        >
          Demo: confirm with a poor connection
        </Button>
      </div>
    </div>
  );
}
