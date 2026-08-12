import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Ban, Check } from "lucide-react";
import { Button } from "@/components/mf/Button";
import { Steps } from "@/components/mf/Steps";
import { getDoctor, slotAvailability, timeSlots, upcomingDates } from "@/lib/doctors";
import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/time")({
  head: () => ({
    meta: [
      { title: "Choose a date and time — MediFlow" },
      { name: "description", content: "Pick an appointment date and time slot with clear available, selected and unavailable states." },
      { property: "og:title", content: "Choose a date and time — MediFlow" },
      { property: "og:description", content: "Step 2 of the MediFlow booking concept: pick a date and time." },
    ],
  }),
  component: TimePage,
});

function TimePage() {
  const { booking, update, hydrated } = useBooking();
  const { t } = useLang();
  const navigate = useNavigate();
  const dates = useMemo(() => upcomingDates(6), []);
  const [error, setError] = useState<string | null>(null);

  const doctor = booking.doctorId ? getDoctor(booking.doctorId) : undefined;
  const dateKey = booking.dateKey ?? dates[0]!.key;

  if (hydrated && !doctor) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-h1">Choose a doctor first</h1>
        <p className="mt-2 text-body text-muted-foreground">
          To pick a time, start by choosing the doctor you would like to see.
        </p>
        <Button asChild className="mt-6">
          <Link to="/search">{t("findDoctor")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        to="/doctors/$doctorId"
        params={{ doctorId: booking.doctorId ?? "" }}
        className="inline-flex items-center gap-1.5 rounded-md text-small font-medium text-primary hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to profile
      </Link>
      <div className="mt-4">
        <Steps current={2} />
      </div>

      <h1 className="text-h1">When would you like to be seen?</h1>
      <p className="mt-1.5 text-body text-muted-foreground">
        {doctor?.name} · {doctor?.consultation}
      </p>

      <section className="mt-7">
        <h2 className="text-label text-muted-foreground">Choose a date</h2>
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {dates.map((d) => {
            const selected = d.key === dateKey;
            return (
              <li key={d.key}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => update({ dateKey: d.key, slot: undefined })}
                  className={cn(
                    "flex min-h-20 w-24 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border-2 px-2 transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-strong bg-surface hover:border-primary hover:bg-primary-soft",
                  )}
                >
                  <span className="text-small font-semibold">{d.weekday}</span>
                  <span className="text-h2">{d.day}</span>
                  <span className="text-small">{d.month}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-label text-muted-foreground">Choose a time</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {timeSlots.map((slot) => {
            const available = slotAvailability(booking.doctorId ?? "", dateKey, slot);
            const selected = booking.slot === slot && available;
            return (
              <li key={slot}>
                <button
                  type="button"
                  disabled={!available}
                  aria-pressed={selected}
                  onClick={() => {
                    update({ slot });
                    setError(null);
                  }}
                  className={cn(
                    "flex min-h-13 w-full items-center justify-center gap-2 rounded-md border-2 px-3 text-body transition-colors",
                    !available &&
                      "cursor-not-allowed border-dashed border-border-strong bg-muted text-muted-foreground line-through",
                    available &&
                      !selected &&
                      "border-border-strong bg-surface hover:border-primary hover:bg-primary-soft",
                    selected && "border-primary bg-primary font-semibold text-primary-foreground",
                  )}
                >
                  {selected && <Check aria-hidden="true" className="size-4" />}
                  {!available && <Ban aria-hidden="true" className="size-4" />}
                  <span>{slot}</span>
                  {!available && <span className="sr-only">Unavailable</span>}
                  {selected && <span className="sr-only">Selected</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-small text-muted-foreground">
          Crossed-out times with a “no entry” icon are already taken. Selected times are marked with a tick.
        </p>
      </section>

      {error && (
        <p role="alert" className="mt-6 rounded-md border-2 border-destructive bg-destructive-soft p-3 text-small font-medium text-destructive">
          {error}
        </p>
      )}

      <div className="sticky bottom-0 mt-8 -mx-4 border-t border-border bg-surface/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
        <Button
          size="lg"
          block
          className="sm:w-auto"
          onClick={() => {
            if (!booking.slot) {
              setError("Choose a time slot to continue. Times marked with a tick are selected.");
              return;
            }
            update({ dateKey });
            navigate({ to: "/book/details" });
          }}
        >
          {t("continueLabel")}
        </Button>
      </div>
    </div>
  );
}
