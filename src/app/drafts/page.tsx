import type { Metadata } from "next";
import Link from "next/link";
import { draftProgrammes } from "@/content/programmes";

export const metadata: Metadata = {
  title: "Draft Programmes — Internal Review",
  description: "Unpublished draft programmes awaiting confirmation. Not public offerings.",
  robots: { index: false, follow: false },
};

// NOTE: This page is intentionally NOT linked in site navigation.
// It exists so reviewers can inspect draft-stage content before any decision
// to publish. Do not link it publicly until each item is confirmed.
export default function Drafts() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="inline-block rounded-sm bg-amber-100 px-3 py-1 text-xs font-bold tracking-widest text-amber-900 uppercase">
        Internal review only — do not publish
      </p>
      <h1 className="mt-3 text-3xl font-bold text-[#0e2a1c]">Draft programmes (unpublished)</h1>
      <p className="mt-3 leading-relaxed text-[#4b5a52]">
        These items originated from information about a separate company
        (Entrepreneurship and Innovation Centre Ltd) and must <strong>not</strong> be
        presented as ALRA offerings until each one is individually confirmed. They are kept
        in <code className="rounded bg-[#f4f7f5] px-1">src/content/programmes.ts</code> as{" "}
        <code className="rounded bg-[#f4f7f5] px-1">draftProgrammes</code> and excluded from the
        public catalogue, search and enquiry subjects.
      </p>
      <ul className="mt-8 space-y-4">
        {draftProgrammes.map((d) => (
          <li key={d.slug} className="rounded-md border border-dashed border-[#c8a227] bg-[#fdf9ec] p-5">
            <h2 className="font-semibold text-[#0e2a1c]">{d.title}</h2>
            <p className="mt-1 text-sm text-[#4b5a52]">{d.summary}</p>
            <p className="mt-2 text-xs font-medium text-amber-900">⚠ {d.note}</p>
          </li>
        ))}
      </ul>
      <Link href="/training" className="mt-8 inline-block text-sm font-semibold text-[#1a5c3a] hover:underline">
        ← Back to the public catalogue
      </Link>
    </section>
  );
}
