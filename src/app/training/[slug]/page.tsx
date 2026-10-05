import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { programmeBySlug, programmes } from "@/content/programmes";
import { whatsappHref } from "@/content/site";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = programmeBySlug(slug);
  if (!p) return { title: "Programme not found" };
  return { title: p.title, description: p.summary };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = programmeBySlug(slug);
  if (!p) notFound();

  return (
    <>
      <section className="bg-[#0e2a1c] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Link href="/training" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
            <ArrowLeft size={15} /> Back to catalogue
          </Link>
          <p className="mt-5 text-xs font-bold tracking-[0.18em] text-[#e3c860] uppercase">{p.category}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">{p.title}</h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/85">{p.summary}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="relative h-60 overflow-hidden rounded-md sm:h-80">
              <Image src={p.image} alt={`${p.title} practical training session`} fill sizes="(max-width:1024px) 100vw, 66vw" className="object-cover" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0e2a1c]">Who it is for</h2>
              <ul className="mt-3 space-y-2">
                {p.audience.map((a) => (
                  <li key={a} className="flex gap-2 text-sm leading-relaxed text-[#24352c]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1a5c3a]" aria-hidden /> {a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0e2a1c]">Learning objectives</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#24352c]">
                {p.objectives.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0e2a1c]">Practical topics</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#24352c]">
                {p.topics.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>

            <div className="rounded-md bg-[#f4f7f5] p-5">
              <h2 className="text-base font-bold text-[#0e2a1c]">Prerequisites</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4b5a52]">{p.prerequisites}</p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="border-t-4 border-[#c9a227] bg-[#f4f7f5] p-5">
              <h2 className="text-lg font-bold text-[#0e2a1c]">Programme planning</h2>
              <p className="mt-2 text-sm leading-6 text-[#4b5a52]">
                Each delivery is scoped around the roles, cohort and operating environment.
              </p>
              <dl className="mt-5 divide-y divide-[#d8e0da] text-sm">
                <div className="py-3">
                  <dt className="font-bold text-[#0e2a1c]">Format and location</dt>
                  <dd className="mt-1 leading-6 text-[#526159]">Classroom, on-site or blended, agreed during scoping.</dd>
                </div>
                <div className="py-3">
                  <dt className="font-bold text-[#0e2a1c]">Schedule and cohort</dt>
                  <dd className="mt-1 leading-6 text-[#526159]">Duration, dates and group size are set against the learning objectives.</dd>
                </div>
                <div className="py-3">
                  <dt className="font-bold text-[#0e2a1c]">Commercial proposal</dt>
                  <dd className="mt-1 leading-6 text-[#526159]">Fees are confirmed after the delivery scope and requirements are understood.</dd>
                </div>
                <div className="pt-3">
                  <dt className="font-bold text-[#0e2a1c]">Certification</dt>
                  <dd className="mt-1 leading-6 text-[#526159]">
                    {p.certification === "Contact us for details"
                      ? "The applicable completion record or external certification route is confirmed in the proposal."
                      : p.certification}
                  </dd>
                </div>
              </dl>
            </div>
            <Link
              href={`/contact?subject=${p.slug}`}
              className="block rounded-sm bg-[#c9a227] px-5 py-3 text-center text-sm font-semibold text-[#0e2a1c] hover:bg-[#dbb93a]"
            >
              Enquire about {p.title}
            </Link>
            <a
              href={whatsappHref(`Hello ALRA Training Institute, I would like details about ${p.title}, including dates, duration, fees, venue and delivery mode.`)}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[#1a5c3a] px-5 py-3 text-center text-sm font-semibold text-[#1a5c3a] hover:bg-[#eef5f0]"
            >
              <MessageCircle size={17} aria-hidden /> Ask about this programme on WhatsApp
            </a>
            <p className="text-xs leading-relaxed text-[#6b7871]">Where an external qualification applies, assessment and awards remain the responsibility of the named independent body.</p>
            <Link href="/hcd-tip" className="block text-center text-sm font-semibold text-[#1a5c3a] hover:underline">
              Need this for a project workforce? See HCD &amp; TIP →
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
