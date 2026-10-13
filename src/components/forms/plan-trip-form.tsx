"use client";

import { Suspense, useActionState, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flower2,
  HandHeart,
  Landmark,
  Leaf,
  type LucideIcon,
  MapPin,
  Minus,
  Mountain,
  PawPrint,
  Plus,
  Sparkles,
  Sprout,
  Sunrise,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { submitPlanTrip, type PlanTripField, type PlanTripState } from "@/actions/plan-trip";
import { Button } from "@/components/ui/button";
import { COMFORT_LEVELS, TRIP_BUDGETS, TRIP_INTERESTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const INITIAL: PlanTripState = { status: "idle" };

/** The four steps, in order, with the fields each one owns. */
const STEPS: { title: string; hint: string; fields: PlanTripField[] }[] = [
  {
    title: "Travel information",
    hint: "Who's coming, and when",
    fields: ["name", "email", "phone", "country", "arrival", "departure", "flexible", "adults", "children"],
  },
  { title: "Interests", hint: "What you'd love to do", fields: ["interests"] },
  {
    title: "Preferences",
    hint: "How you like to travel",
    fields: ["comfort", "budget", "occasion", "dietary", "health"],
  },
  { title: "Anything else?", hint: "The little things matter", fields: ["message"] },
];
const LAST = STEPS.length - 1;

/*
 * Glass fields — the form is a frosted panel, so inputs are a brighter frost
 * that turns solid white on focus.
 */
const FIELD =
  "mt-2 block w-full border border-white bg-white/75 px-5 text-sm text-ink shadow-sm " +
  "placeholder:text-muted/70 transition-[background-color,border-color,box-shadow] duration-200 ease-out " +
  "hover:border-brand/40 focus:border-brand focus:bg-white focus:outline-none focus-visible:outline-none " +
  "focus:ring-4 focus:ring-brand/15 aria-invalid:border-brand-dark";

const INPUT = cn(FIELD, "h-12 rounded-pill");
/* The wrapper carries the top margin so the chevron centres on the box. */
const SELECT = cn(INPUT, "mt-0 appearance-none pr-11");

/* Shared by every tile that wraps a visually hidden radio or checkbox. */
const TILE =
  "group relative cursor-pointer border border-white bg-white/60 shadow-sm select-none " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-out " +
  "hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white/90 " +
  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand";

const INTEREST_ICONS: Record<(typeof TRIP_INTERESTS)[number], LucideIcon> = {
  Agro: Sprout,
  Wellness: Flower2,
  Ayurveda: Leaf,
  Yoga: Sunrise,
  Culture: Landmark,
  Wildlife: PawPrint,
  Food: UtensilsCrossed,
  Beach: Waves,
  Adventure: Mountain,
};

/** The query keys other pages link here with, e.g. `?experience=tea-journey`. */
const SOURCE_KINDS = ["journey", "experience", "destination"] as const;

/**
 * The plan-your-trip form — the site's main conversion — as a four-step
 * glass card: a purple progress rail on the left, one step at a time on the
 * right. Every step stays in the DOM (hidden), so the whole form still posts
 * in one submission and the server action is unchanged. If the server sends
 * errors back, the form opens on the first step that has one.
 *
 * `sources` maps `kind:slug` to a readable title so a guest arriving from an
 * experience, destination or journey page sees it carried over.
 */
export function PlanTripForm({ sources }: { sources: Record<string, string> }) {
  const [state, action, pending] = useActionState(submitPlanTrip, INITIAL);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Jump to the first step with a server error, once per response.
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    const first = STEPS.findIndex((s) => s.fields.some((f) => state.errors?.[f]));
    if (first !== -1) {
      setStep(first);
      setReached(LAST);
    }
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-card border border-white/70 bg-white/70 px-6 py-16 text-center shadow-card backdrop-blur-xl sm:py-24"
      >
        <span className="grid size-16 place-items-center rounded-pill bg-brand text-white shadow-card">
          <CheckCircle2 aria-hidden="true" className="size-8" strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Your journey has begun</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">{state.message}</p>
      </div>
    );
  }

  const error = (name: PlanTripField) => state.errors?.[name];
  const value = (name: PlanTripField) => state.values?.[name];
  const describe = (name: PlanTripField) => (error(name) ? `plan-${name}-error` : undefined);
  const field = (name: PlanTripField) => ({
    id: `plan-${name}`,
    name,
    defaultValue: value(name),
    "aria-invalid": !!error(name),
    "aria-describedby": describe(name),
  });
  const chosenInterests = value("interests")?.split(",") ?? [];

  const goTo = (next: number) => {
    setStepError(null);
    setStep(next);
    setReached((r) => Math.max(r, next));
    // Bring the card's top back into view when a long step left it above.
    const top = formRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** Browser checks for the current step only; the server re-checks everything. */
  const next = () => {
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
    if (!panel) return;
    const invalid = Array.from(
      panel.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"),
    ).find((el) => !el.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    if (step === 1 && !panel.querySelector("input[name=interests]:checked")) {
      setStepError("Please choose at least one thing you'd love to do.");
      return;
    }
    goTo(step + 1);
  };

  // Keyed on the echoed values so the uncontrolled fields pick them up again
  // after a failed submit.
  return (
    <form
      ref={formRef}
      key={JSON.stringify(state.values ?? {})}
      action={action}
      noValidate
      // Enter moves forward a step instead of posting a half-filled form.
      onKeyDown={(e) => {
        if (e.key === "Enter" && step < LAST && !(e.target instanceof HTMLTextAreaElement) && !(e.target instanceof HTMLButtonElement)) {
          e.preventDefault();
          next();
        }
      }}
      className="scroll-mt-28 overflow-hidden rounded-card border border-white/60 bg-gradient-to-br from-white/50 to-white/25 shadow-card ring-1 ring-white/30 ring-inset backdrop-blur-2xl backdrop-saturate-150 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]"
    >
      <Rail step={step} reached={reached} onSelect={goTo} />

      <div className="flex min-h-[34rem] flex-col p-5 sm:p-8 lg:p-10">
        {state.status === "error" && state.message && (
          <p role="alert" className="mb-6 rounded-card bg-brand px-5 py-3 text-sm font-medium text-white">
            {state.message}
          </p>
        )}

        {/* Reads the query string, so it suspends during prerender — the rest
            of the form still ships as static HTML. */}
        <Suspense fallback={null}>
          <SourceNote sources={sources} />
        </Suspense>

        {/* ---- 01 Travel information ---- */}
        <StepPanel index={0} current={step}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5">
            <Field name="name" label="Full name" error={error("name")}>
              <input {...field("name")} type="text" autoComplete="name" required minLength={2} placeholder="Your name" className={INPUT} />
            </Field>

            <Field name="email" label="Email" error={error("email")}>
              <input {...field("email")} type="email" autoComplete="email" required placeholder="you@example.com" className={INPUT} />
            </Field>

            <Field name="phone" label="WhatsApp number" error={error("phone")}>
              <input {...field("phone")} type="tel" autoComplete="tel" required placeholder="+44 7700 900000" className={INPUT} />
            </Field>

            <Field name="country" label="Country of residence" error={error("country")}>
              <input
                {...field("country")}
                type="text"
                autoComplete="country-name"
                required
                minLength={2}
                placeholder="e.g. United Kingdom"
                className={INPUT}
              />
            </Field>

            <Field name="arrival" label="Arrival date" error={error("arrival")}>
              <input {...field("arrival")} type="date" required className={INPUT} />
            </Field>

            <Field name="departure" label="Departure date" error={error("departure")}>
              <input {...field("departure")} type="date" required className={INPUT} />
            </Field>

            <ChoiceSet name="flexible" legend="Flexible dates?" error={error("flexible")}>
              {/* Segmented control — two radios in one frosted track. */}
              <div className="mt-2 flex h-12 rounded-pill border border-white bg-white/60 p-1 shadow-sm">
                {[
                  { key: "yes", label: "Yes" },
                  { key: "no", label: "No" },
                ].map((option) => (
                  <label
                    key={option.key}
                    className="flex flex-1 cursor-pointer items-center justify-center rounded-pill text-sm text-ink transition-colors duration-200 ease-out select-none hover:text-brand has-checked:bg-brand has-checked:text-white has-checked:shadow-sm has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
                  >
                    <input
                      type="radio"
                      name="flexible"
                      value={option.key}
                      required
                      defaultChecked={value("flexible") === option.key}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </ChoiceSet>

            <Field name="adults" label="Adults" error={error("adults")}>
              <Stepper
                name="adults"
                min={1}
                max={12}
                initial={Number(value("adults") ?? 2)}
                invalid={!!error("adults")}
                describedBy={describe("adults")}
              />
            </Field>

            <Field name="children" label="Children (under 12)" error={error("children")}>
              <Stepper
                name="children"
                min={0}
                max={6}
                initial={Number(value("children") ?? 0)}
                invalid={!!error("children")}
                describedBy={describe("children")}
              />
            </Field>
          </div>
        </StepPanel>

        {/* ---- 02 Interests ---- */}
        <StepPanel index={1} current={step}>
          <ChoiceSet
            name="interests"
            legend="What would you love to do in Sri Lanka? Choose as many as you like."
            error={error("interests") ?? stepError ?? undefined}
          >
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TRIP_INTERESTS.map((interest) => {
                const Icon = INTEREST_ICONS[interest];
                return (
                  <label
                    key={interest}
                    className={cn(
                      TILE,
                      "flex items-center gap-3 rounded-card p-3 pr-8 has-checked:border-brand has-checked:bg-brand has-checked:text-white sm:p-4",
                    )}
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      defaultChecked={chosenInterests.includes(interest)}
                      onChange={() => setStepError(null)}
                      className="sr-only"
                    />
                    <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-brand-light text-brand transition-colors duration-200 ease-out group-has-checked:bg-white/20 group-has-checked:text-white sm:size-12">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium sm:text-base">{interest}</span>
                    <Check
                      aria-hidden="true"
                      className="absolute top-3 right-3 size-4 opacity-0 transition-opacity duration-200 ease-out group-has-checked:opacity-100"
                      strokeWidth={2.5}
                    />
                  </label>
                );
              })}
            </div>
          </ChoiceSet>
        </StepPanel>

        {/* ---- 03 Preferences ---- */}
        <StepPanel index={2} current={step}>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-5">
            <ChoiceSet name="comfort" legend="Travel style" error={error("comfort")} className="sm:col-span-2">
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {COMFORT_LEVELS.map((level, i) => (
                  <label
                    key={level.key}
                    className={cn(
                      TILE,
                      "flex flex-col rounded-card p-4 has-checked:border-brand has-checked:bg-white has-checked:ring-2 has-checked:ring-brand sm:p-5",
                    )}
                  >
                    <input
                      type="radio"
                      name="comfort"
                      value={level.key}
                      required
                      defaultChecked={value("comfort") === level.key}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-between">
                      {/* One to three marks — the tier at a glance. */}
                      <span aria-hidden="true" className="flex gap-1 text-brand">
                        {Array.from({ length: i + 1 }, (_, n) => (
                          <Sparkles key={n} className="size-3.5" strokeWidth={2} />
                        ))}
                      </span>
                      <span className="grid size-5 place-items-center rounded-pill border border-brand/40 bg-white transition-colors duration-200 ease-out group-has-checked:border-brand group-has-checked:bg-brand">
                        <Check aria-hidden="true" className="size-3 text-white" strokeWidth={3} />
                      </span>
                    </span>
                    <span className="mt-3 font-display text-xl text-ink">{level.label}</span>
                    <span className="mt-1 text-xs leading-relaxed text-ink/70">{level.text}</span>
                  </label>
                ))}
              </div>
            </ChoiceSet>

            <Field name="budget" label="Budget per person, excluding flights" optional error={error("budget")}>
              <SelectWrap>
                <select {...field("budget")} defaultValue={value("budget") ?? ""} className={SELECT}>
                  <option value="">Choose a range</option>
                  {TRIP_BUDGETS.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </SelectWrap>
            </Field>

            <Field name="occasion" label="Special occasion" optional error={error("occasion")}>
              <input
                {...field("occasion")}
                type="text"
                maxLength={500}
                placeholder="Honeymoon, birthday, anniversary…"
                className={INPUT}
              />
            </Field>

            <Field name="dietary" label="Dietary requirements" optional error={error("dietary")}>
              <input
                {...field("dietary")}
                type="text"
                maxLength={500}
                placeholder="Vegetarian, vegan, allergies…"
                className={INPUT}
              />
            </Field>

            <Field name="health" label="Health or accessibility needs" optional error={error("health")}>
              <input
                {...field("health")}
                type="text"
                maxLength={500}
                placeholder="Mobility, medical conditions…"
                className={INPUT}
              />
            </Field>
          </div>
        </StepPanel>

        {/* ---- 04 Anything else ---- */}
        <StepPanel index={3} current={step}>
          <Field name="message" label="Additional message" optional error={error("message")}>
            <textarea
              {...field("message")}
              rows={7}
              maxLength={3000}
              placeholder="Places you've dreamed of, the pace you like, children's ages, how you want to feel by the end…"
              className={cn(FIELD, "resize-y rounded-card py-3.5")}
            />
          </Field>
          <p className="mt-4 flex items-center gap-2 text-xs text-ink/60">
            <HandHeart aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
            Free to plan, no obligation to book. We never share your details.
          </p>
        </StepPanel>

        {/* Honeypot — hidden from people and assistive tech, left for bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="plan-company">Company</label>
          <input id="plan-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Step navigation, pinned to the foot of the panel. */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white pt-6">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={() => goTo(step - 1)} className="bg-white/60">
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Back
            </Button>
          ) : (
            <span className="text-xs text-ink/60">Takes about three minutes</span>
          )}

          {step < LAST ? (
            <Button type="button" onClick={next}>
              Continue
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={pending} className="shadow-card">
              {pending ? "Sending…" : "Design My Journey"}
              <Sparkles aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

/**
 * The progress rail. Large screens: a purple glass column listing the four
 * steps, with a reassurance at its foot. Phones: a slim bar over the panel.
 * Steps already reached can be revisited by clicking them.
 */
function Rail({
  step,
  reached,
  onSelect,
}: {
  step: number;
  reached: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="bg-brand-dark/70 p-5 text-white backdrop-blur-xl sm:px-8 lg:flex lg:flex-col lg:p-8">
      {/* Phones and tablets */}
      <div className="lg:hidden">
        <p className="flex items-baseline justify-between text-sm">
          <span className="font-display text-lg">{STEPS[step].title}</span>
          <span className="text-white/75">
            Step {step + 1} of {STEPS.length}
          </span>
        </p>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span
              key={s.title}
              className={cn(
                "h-1 flex-1 rounded-pill transition-colors duration-300 ease-out",
                i <= step ? "bg-white" : "bg-white/25",
              )}
            />
          ))}
        </div>
      </div>

      {/* Large screens */}
      <p className="hidden text-xs font-semibold tracking-[0.2em] uppercase lg:block">Your journey</p>
      <ol className="mt-8 hidden space-y-1 lg:block">
        {STEPS.map((s, i) => {
          const done = i < step;
          const current = i === step;
          const open = i <= reached;
          return (
            <li key={s.title} className="relative">
              {/* Connector to the next step */}
              {i < LAST && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-11 left-[1.1875rem] h-[calc(100%-2.25rem)] w-px transition-colors duration-300 ease-out",
                    done ? "bg-white" : "bg-white/25",
                  )}
                />
              )}
              <button
                type="button"
                disabled={!open}
                onClick={() => onSelect(i)}
                aria-current={current ? "step" : undefined}
                className="flex w-full items-start gap-4 rounded-card py-2 text-left transition-opacity duration-200 ease-out focus-visible:outline-white disabled:cursor-default"
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-pill border text-sm font-semibold transition-colors duration-300 ease-out",
                    current && "border-white bg-white text-brand",
                    done && "border-white bg-white/15 text-white",
                    !current && !done && "border-white/30 text-white/60",
                  )}
                >
                  {done ? <Check aria-hidden="true" className="size-4" strokeWidth={2.5} /> : `0${i + 1}`}
                </span>
                <span className="pt-1">
                  <span className={cn("block text-sm font-semibold", !current && !done && "text-white/70")}>
                    {s.title}
                  </span>
                  <span className={cn("mt-0.5 block text-xs", current ? "text-white/85" : "text-white/55")}>
                    {s.hint}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto hidden space-y-2.5 border-t border-white/20 pt-6 text-xs text-white/85 lg:block">
        <p className="flex items-center gap-2">
          <Clock aria-hidden="true" className="size-4 text-accent-gold" strokeWidth={1.75} />
          Reply within one working day
        </p>
        <p className="flex items-center gap-2">
          <HandHeart aria-hidden="true" className="size-4 text-accent-gold" strokeWidth={1.75} />
          Free to plan, no obligation
        </p>
      </div>
    </div>
  );
}

/**
 * One step's fields. Hidden steps stay mounted so their values still post;
 * the visible one rises in when it opens.
 */
function StepPanel({
  index,
  current,
  children,
}: {
  index: number;
  current: number;
  children: React.ReactNode;
}) {
  const active = index === current;
  return (
    <fieldset data-step={index} hidden={!active} className={cn("pb-8", active && "animate-rise-in")}>
      <legend className="sr-only">{STEPS[index].title}</legend>
      <div className="mb-6 hidden items-end gap-4 lg:flex">
        <span aria-hidden="true" className="font-display text-6xl leading-none font-light text-brand/25">
          0{index + 1}
        </span>
        <div className="pb-1">
          <h3 className="font-display text-2xl leading-tight text-ink">{STEPS[index].title}</h3>
          <p className="mt-0.5 text-xs text-ink/60">{STEPS[index].hint}</p>
        </div>
      </div>
      {children}
    </fieldset>
  );
}

/**
 * Carries the page the guest came from into the enquiry: a hidden pair of
 * fields plus a short note above the form. Renders nothing for a plain visit
 * or an unknown slug.
 */
function SourceNote({ sources }: { sources: Record<string, string> }) {
  const params = useSearchParams();
  const kind = SOURCE_KINDS.find((k) => params.has(k));
  const slug = kind ? (params.get(kind) ?? "") : "";
  const title = kind ? sources[`${kind}:${slug}`] : undefined;
  if (!kind || !title) return null;

  return (
    <div className="mb-6 flex items-center gap-3 rounded-card border border-white bg-white/75 px-4 py-3 text-sm text-ink shadow-sm">
      <input type="hidden" name="sourceType" value={kind} />
      <input type="hidden" name="sourceSlug" value={slug} />
      <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-brand text-white">
        <MapPin aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </span>
      <p>
        Planning around <strong className="font-semibold">{title}</strong> — we&rsquo;ll build your
        journey with it in mind.
      </p>
    </div>
  );
}

/**
 * − / + counter around a number input. The input stays real, so it can be
 * typed into, is labelled by the field's `<label>`, and submits with the form.
 */
function Stepper({
  name,
  min,
  max,
  initial,
  invalid,
  describedBy,
}: {
  name: PlanTripField;
  min: number;
  max: number;
  initial: number;
  invalid: boolean;
  describedBy?: string;
}) {
  const [count, setCount] = useState(Number.isFinite(initial) ? initial : min);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const button =
    "grid size-10 shrink-0 place-items-center rounded-pill bg-brand-light text-brand transition-colors duration-200 ease-out " +
    "hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="mt-2 flex h-12 items-center gap-2 rounded-pill border border-white bg-white/75 px-1 shadow-sm focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/15">
      <button
        type="button"
        onClick={() => setCount((c) => clamp(c - 1))}
        disabled={count <= min}
        aria-label={`Fewer ${name}`}
        aria-controls={`plan-${name}`}
        className={button}
      >
        <Minus aria-hidden="true" className="size-4" strokeWidth={2} />
      </button>
      <input
        id={`plan-${name}`}
        name={name}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={count}
        onChange={(e) => setCount(clamp(Number(e.target.value) || min))}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="w-full min-w-0 bg-transparent text-center font-display text-lg text-ink [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => setCount((c) => clamp(c + 1))}
        disabled={count >= max}
        aria-label={`More ${name}`}
        aria-controls={`plan-${name}`}
        className={button}
      >
        <Plus aria-hidden="true" className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}

/** A radio or checkbox group; the error ties to the fieldset. */
function ChoiceSet({
  name,
  legend,
  error,
  className,
  children,
}: {
  name: PlanTripField;
  legend: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset aria-describedby={error ? `plan-${name}-error` : undefined} className={className}>
      <legend className="pl-1 text-sm font-medium text-ink">{legend}</legend>
      {children}
      {error && (
        <p id={`plan-${name}-error`} role="alert" className="mt-2 pl-1 text-sm font-medium text-brand-dark">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-2">
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-brand"
      />
    </div>
  );
}

function Field({
  name,
  label,
  optional = false,
  error,
  className,
  children,
}: {
  name: PlanTripField;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`plan-${name}`} className="pl-1 text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-ink/55">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`plan-${name}-error`} className="mt-1.5 pl-1 text-sm font-medium text-brand-dark">
          {error}
        </p>
      )}
    </div>
  );
}
