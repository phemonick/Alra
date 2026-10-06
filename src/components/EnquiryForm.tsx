"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { enquirySubjects } from "@/content/programmes";
import { enquirySchema } from "@/lib/enquiry";
import { site } from "@/content/site";

export type EnquiryValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  participants: string;
  timing: string;
  message: string;
};

const STORAGE_KEY = "alra-enquiry-draft";

const emptyValues = (subject: string): EnquiryValues => ({
  name: "",
  company: "",
  email: "",
  phone: "",
  subject,
  participants: "",
  timing: "",
  message: "",
});

/** Client-only initial state: retained draft first, ?subject= wins for preselection. */
function readInitial(defaultSubject: string, querySubject: string | null, storageKey: string): EnquiryValues {
  const base = emptyValues(defaultSubject);
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.sessionStorage.getItem(storageKey);
    const draft = saved ? JSON.parse(saved) : null;
    const parsed: Partial<EnquiryValues> = {};
    if (draft && typeof draft.savedAt === "number" && Date.now() - draft.savedAt < 86400000 && draft.savedAt <= Date.now()) {
      for (const key of Object.keys(base) as (keyof EnquiryValues)[]) {
        if (typeof draft.values?.[key] === "string") parsed[key] = draft.values[key];
      }
    } else { window.sessionStorage.removeItem(storageKey); }
    const subject = querySubject || parsed.subject || defaultSubject;
    return {
      ...base,
      ...parsed,
      subject: enquirySubjects.some(s => s.value === subject) ? subject : defaultSubject,
    };
  } catch {
    return { ...base, subject: enquirySubjects.some(s => s.value === querySubject) ? querySubject! : defaultSubject };
  }
}

function FormInner({
  defaultSubject = "other",
  context = "general",
  heading = "Request a training proposal",
}: {
  defaultSubject?: string;
  context?: string;
  heading?: string;
}) {
  const searchParams = useSearchParams();
  const querySubject = searchParams.get("subject");
  const storageKey = `${STORAGE_KEY}:${context}`;
  // Lazy initializer runs client-side only here (parent Suspense + useSearchParams
  // opts this boundary out of static prerender), so window access is safe.
  const [values, setValues] = useState<EnquiryValues>(() =>
    readInitial(defaultSubject, querySubject, storageKey)
  );
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [formStartedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState(""); // honeypot

  // Restore retained draft + apply ?subject= preselection handled in lazy
  // initializer above (runs once, client-side only).
  // Retain entered information on every change (so failed submits keep data)
  useEffect(() => {
    try {
      if (status !== "success") window.sessionStorage.setItem(storageKey, JSON.stringify({ savedAt: Date.now(), values }));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [values, status, storageKey]);

  const subjectLabel = useMemo(
    () => enquirySubjects.find((s) => s.value === values.subject)?.label ?? values.subject,
    [values.subject]
  );

  function set<K extends keyof EnquiryValues>(key: K, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(v: EnquiryValues) {
    const e: Partial<Record<keyof EnquiryValues, string>> = {};
    const result = enquirySchema.safeParse(v);
    if (!result.success) for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof EnquiryValues;
      e[key] ??= issue.message;
    }
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerMessage("");
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const fieldIds: Record<keyof EnquiryValues, string> = {
        name: "eq-name", company: "eq-company", email: "eq-email", phone: "eq-phone",
        subject: "eq-subject", participants: "eq-count", timing: "eq-timing", message: "eq-message",
      };
      const firstKey = (Object.keys(e) as (keyof EnquiryValues)[])[0];
      document.getElementById(fieldIds[firstKey])?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          ...values,
          context,
          website, // honeypot
          fillSeconds: Math.round((Date.now() - formStartedAt) / 1000),
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }
      setStatus("success");
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch { /* noop */ }
    } catch (err) {
      setStatus("error");
      setServerMessage(err instanceof DOMException && (err.name === "TimeoutError" || err.name === "AbortError")
        ? "Delivery took too long. Please retry or contact us directly."
        : err instanceof Error ? err.message : "Something went wrong.");
      // Retain the session draft for a retry.
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-md border border-[#1a5c3a]/30 bg-[#eef6f0] p-6">
        <h3 className="text-lg font-semibold text-[#0e2a1c]">Enquiry received — thank you.</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#24352c]">
          We have received your enquiry about <strong>{subjectLabel}</strong>. Our team will
          respond to <strong>{values.email}</strong> with a proposal or next steps.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(emptyValues(defaultSubject));
            setErrors({});
            setServerMessage("");
            setStatus("idle");
          }}
          className="mt-4 rounded-sm border border-[#0e2a1c] px-4 py-2 text-sm font-semibold text-[#0e2a1c] hover:bg-[#0e2a1c] hover:text-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const inputCls = (bad?: string) =>
    `min-h-11 w-full rounded-sm border bg-white px-3 py-2.5 text-sm text-[#1c2420] placeholder:text-[#8a938d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5c3a] ${
      bad ? "border-red-600" : "border-[#c8d2cb]"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate aria-label={heading} className="rounded-md border border-[#dfe6e1] bg-white p-5 sm:p-7">
      <h3 className="text-lg font-semibold text-[#0e2a1c]">{heading}</h3>
      <p className="mt-1 text-sm text-[#4b5a52]">Share enough context for us to prepare a useful first response.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="eq-name" className="mb-1 block text-sm font-medium text-[#1c2420]">Full name *</label>
          <input id="eq-name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "eq-name-error" : undefined} maxLength={120} required data-error={errors.name ? "true" : undefined} className={inputCls(errors.name)} autoComplete="name"
            value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Adaeze Okafor" />
          {errors.name && <p id="eq-name-error" role="alert" className="mt-1 text-xs text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="eq-company" className="mb-1 block text-sm font-medium text-[#1c2420]">Company / organisation *</label>
          <input id="eq-company" aria-invalid={!!errors.company} aria-describedby={errors.company ? "eq-company-error" : undefined} maxLength={160} required data-error={errors.company ? "true" : undefined} className={inputCls(errors.company)} autoComplete="organization"
            value={values.company} onChange={(e) => set("company", e.target.value)} placeholder="e.g. ABC Energy Ltd" />
          {errors.company && <p id="eq-company-error" role="alert" className="mt-1 text-xs text-red-700">{errors.company}</p>}
        </div>
        <div>
          <label htmlFor="eq-email" className="mb-1 block text-sm font-medium text-[#1c2420]">Work email *</label>
          <input id="eq-email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "eq-email-error" : undefined} maxLength={160} required type="email" data-error={errors.email ? "true" : undefined} className={inputCls(errors.email)} autoComplete="email"
            value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
          {errors.email && <p id="eq-email-error" role="alert" className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="eq-phone" className="mb-1 block text-sm font-medium text-[#1c2420]">Phone <span className="font-normal text-[#6b7871]">(optional)</span></label>
          <input id="eq-phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "eq-phone-error" : undefined} maxLength={40} type="tel" className={inputCls(errors.phone)} autoComplete="tel"
            value={values.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+234 ..." />
          {errors.phone && <p id="eq-phone-error" role="alert" className="mt-1 text-xs text-red-700">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="eq-subject" className="mb-1 block text-sm font-medium text-[#1c2420]">Programme / service *</label>
          <select id="eq-subject" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "eq-subject-error" : undefined} required className={inputCls(errors.subject)} value={values.subject} onChange={(e) => set("subject", e.target.value)}>
            {enquirySubjects.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errors.subject && <p id="eq-subject-error" role="alert" className="mt-1 text-xs text-red-700">{errors.subject}</p>}
        </div>
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
          <div>
            <label htmlFor="eq-count" className="mb-1 block text-sm font-medium text-[#1c2420]">Participants <span className="font-normal text-[#6b7871]">(est.)</span></label>
            <input id="eq-count" aria-invalid={!!errors.participants} aria-describedby={errors.participants ? "eq-count-error" : undefined} maxLength={5} inputMode="numeric" className={inputCls(errors.participants)} value={values.participants}
              onChange={(e) => set("participants", e.target.value)} placeholder="e.g. 15" />
            {errors.participants && <p id="eq-count-error" role="alert" className="mt-1 text-xs text-red-700">{errors.participants}</p>}
          </div>
          <div>
            <label htmlFor="eq-timing" className="mb-1 block text-sm font-medium text-[#1c2420]">Preferred timing</label>
            <input id="eq-timing" aria-invalid={!!errors.timing} aria-describedby={errors.timing ? "eq-timing-error" : undefined} maxLength={120} className={inputCls()} value={values.timing} onChange={(e) => set("timing", e.target.value)} placeholder="e.g. Q1 2027" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="eq-message" className="mb-1 block text-sm font-medium text-[#1c2420]">What do you need? *</label>
          <textarea id="eq-message" aria-invalid={!!errors.message} aria-describedby={errors.message ? "eq-message-error" : undefined} maxLength={5000} required rows={5} data-error={errors.message ? "true" : undefined} className={inputCls(errors.message)}
            value={values.message} onChange={(e) => set("message", e.target.value)}
            placeholder="Project or role context, skill gaps, locations, delivery preference (classroom / on-site / blended), and anything else that helps us scope a proposal." />
          {errors.message && <p id="eq-message-error" role="alert" className="mt-1 text-xs text-red-700">{errors.message}</p>}
        </div>
      </div>

      {/* Honeypot — hidden from humans */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Website <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#6b7871]">
        We use your details to respond and prepare a proposal. See our <a href="/privacy" className="font-semibold text-[#1a5c3a] underline-offset-2 hover:underline">privacy notice</a>.
      </p>

      {status === "error" && (
        <p role="alert" className="mt-3 rounded-sm border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
          {serverMessage} Your entries have been kept. Try again, or <a className="font-semibold underline" href={`mailto:${site.email}`}>email {site.email}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#0e2a1c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a5c3a] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          "Submit enquiry"
        )}
      </button>
    </form>
  );
}

export default function EnquiryForm(props: {
  defaultSubject?: string;
  context?: string;
  heading?: string;
}) {
  return (
    <Suspense
      fallback={
        <div aria-busy="true" className="rounded-md border border-[#dfe6e1] bg-white p-5 sm:p-7">
          <p className="text-sm text-[#4b5a52]">Loading enquiry form…</p>
        </div>
      }
    >
      <FormInner key={`${props.context}:${props.defaultSubject}`} {...props} />
    </Suspense>
  );
}
