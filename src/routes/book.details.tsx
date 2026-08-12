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

    if (name.length < 2) next.fullName = t("errName");
    if (!/^\d{1,3}$/.test(age) || Number(age) < 1 || Number(age) > 120)
      next.age = t("errAge");
    if (!/^\d{10}$/.test(phone)) next.phone = t("errPhone");
    if (reason.length < 3) next.reason = t("errReason");
    return next;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        to="/book/time"
        className="inline-flex items-center gap-1.5 rounded-md text-small font-medium text-primary hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> {t("backToDateTime")}
      </Link>
      <div className="mt-4">
        <Steps current={3} />
      </div>

      <h1 className="text-h1">{t("detailsTitle")}</h1>
      <p className="mt-1.5 text-body text-muted-foreground">
        {t("detailsSubtitle")}
      </p>

      <p className="mt-5 flex items-start gap-2 rounded-md border border-border bg-primary-soft/60 p-3 text-small">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
        <span>{t("savedNote")}</span>
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
          label={t("fullName")}
          error={errors.fullName}
          inputProps={{
            value: booking.fullName ?? "",
            onChange: (e) => update({ fullName: e.target.value }),
            autoComplete: "name",
            name: "fullName",
          }}
        />
        <Field
          label={t("age")}
          hint={t("ageHint")}
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
          hint={t("phoneHint")}
          error={errors.phone}
          inputProps={{
            value: booking.phone ?? "",
            onChange: (e) => update({ phone: e.target.value }),
            inputMode: "tel",
            autoComplete: "tel",
            name: "phone",
            placeholder: t("phonePlaceholder"),
          }}
        />
        <Field
          label={t("reason")}
          hint={t("reasonHint")}
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
