import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/mf/Button";
import { Field } from "@/components/mf/Field";
import { Steps } from "@/components/mf/Steps";
import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/book/details")({
  head: () => ({
    meta: [
      { title: "Patient details — MediFlow" },
      { name: "description", content: "A short four-field form with plain-language labels and recoverable error messages." },
      { property: "og:title", content: "Patient details — MediFlow" },
      { property: "og:description", content: "Step 3 of the MediFlow booking concept: who is this appointment for?" },
    ],
  }),
  component: DetailsPage,
});

type Errors = Partial<Record<"fullName" | "age" | "phone" | "reason", string>>;

function DetailsPage() {
  const { booking, update } = useBooking();
  const { t } = useLang();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};
    const name = (booking.fullName ?? "").trim();
    const age = (booking.age ?? "").trim();
    const phone = (booking.phone ?? "").replace(/\s/g, "");
    const reason = (booking.reason ?? "").trim();

    if (name.length < 2) next.fullName = "Enter the patient's full name, as you would like it on the appointment.";
    if (!/^\d{1,3}$/.test(age) || Number(age) < 1 || Number(age) > 120)
      next.age = "Enter an age between 1 and 120, in numbers.";
    if (!/^\d{10}$/.test(phone)) next.phone = "Enter a 10-digit phone number, without spaces or country code.";
    if (reason.length < 3) next.reason = "Tell us briefly why you want to see the doctor, for example “skin rash”.";
    return next;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        to="/book/time"
        className="inline-flex items-center gap-1.5 rounded-md text-small font-medium text-primary hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to date and time
      </Link>
      <div className="mt-4">
        <Steps current={3} />
      </div>

      <h1 className="text-h1">Who is this appointment for?</h1>
      <p className="mt-1.5 text-body text-muted-foreground">
        Four short questions. You can book for yourself or for someone else.
      </p>

      <p className="mt-5 flex items-start gap-2 rounded-md border border-border bg-primary-soft/60 p-3 text-small">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
        <span>Your answers are saved on this device as you type, so nothing is lost if you get interrupted.</span>
      </p>

      <form
        noValidate
        className="mt-6 grid gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          const next = validate();
          setErrors(next);
          if (Object.keys(next).length === 0) navigate({ to: "/book/review" });
        }}
      >
        <Field
          label="Full name"
          error={errors.fullName}
          inputProps={{
            value: booking.fullName ?? "",
            onChange: (e) => update({ fullName: e.target.value }),
            autoComplete: "name",
            name: "fullName",
          }}
        />
        <Field
          label="Age"
          hint="In years."
          error={errors.age}
          inputProps={{
            value: booking.age ?? "",
            onChange: (e) => update({ age: e.target.value }),
            inputMode: "numeric",
            name: "age",
          }}
        />
        <Field
          label="Phone number"
          hint="We use this only to confirm the appointment."
          error={errors.phone}
          inputProps={{
            value: booking.phone ?? "",
            onChange: (e) => update({ phone: e.target.value }),
            inputMode: "tel",
            autoComplete: "tel",
            name: "phone",
            placeholder: "10-digit number",
          }}
        />
        <Field
          label="Reason for visit"
          hint="A few words are enough."
          error={errors.reason}
          textarea
          textareaProps={{
            value: booking.reason ?? "",
            onChange: (e) => update({ reason: e.target.value }),
            name: "reason",
          }}
        />

        <div className="sticky bottom-0 -mx-4 border-t border-border bg-surface/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          <Button type="submit" size="lg" block className="sm:w-auto">
            {t("review")}
          </Button>
        </div>
      </form>
    </div>
  );
}
