import { enquirySubjects } from "@/content/programmes";
import type { EnquiryValues } from "@/lib/enquiry";

export type EnquiryRecord = EnquiryValues & {
  id: string;
  receivedAt: string;
  context: string;
};

export class EnquiryDeliveryError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

export async function deliverToFormspree(
  formId: string,
  record: EnquiryRecord,
  send: typeof fetch = fetch,
) {
  // Keep the destination fixed; configuration must never become an arbitrary URL.
  if (!/^[a-zA-Z0-9]{6,32}$/.test(formId)) {
    throw new EnquiryDeliveryError(503, "Online enquiry delivery is being configured. Please email us directly for now.");
  }
  const programme = enquirySubjects.find(subject => subject.value === record.subject)?.label;
  const response = await send(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...record,
      subject: programme ?? record.subject,
      programmeId: record.subject,
      _subject: `ALRA training enquiry: ${programme ?? record.subject}`,
    }),
    redirect: "error",
    signal: AbortSignal.timeout(10000),
  });
  if (response.status === 429) {
    throw new EnquiryDeliveryError(429, "Enquiry delivery is temporarily busy. Please try again later or email us directly.");
  }
  if (!response.ok) throw new EnquiryDeliveryError(502, "We could not deliver your enquiry. Please try again or email us directly.");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    throw new EnquiryDeliveryError(502, "We could not confirm your enquiry was received. Please try again or email us directly.");
  }
}
