import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Building2, ClipboardCheck, FileText, GraduationCap, RefreshCcw } from "lucide-react";
import { heroImages } from "@/content/site";
import { PageHero } from "@/components/ui";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Tailored oil and gas training for organisations — graduate trainee schemes, operations and maintenance workforce development, and supervisor upskilling from ALRA TRAINING INSTITUTE LTD/GTE.",
};

const offers = [
  { icon: Building2, title: "Tailored programmes for organisations", text: "Role-based learning paths for operations, maintenance, projects and HSE — scoped to your equipment, procedures and shift realities. Delivered at your site, our venue or blended." },
  { icon: GraduationCap, title: "Graduate & technician trainees", text: "Structured intakes that bridge academic knowledge and field practice: technical foundations, safety discipline, documentation, teamwork and supervised exercises." },
  { icon: RefreshCcw, title: "Workforce development initiatives", text: "Multi-cohort upskilling and refresher schemes with skills-gap analysis, progress tracking and close-out reporting for management review." },
];

const deliverables = [
  { icon: BookOpenCheck, title: "Agreed learning plan", text: "A role-led curriculum, delivery sequence and practical activities matched to the target capability." },
  { icon: GraduationCap, title: "Prepared delivery", text: "Facilitation, participant materials and exercises configured for the cohort and delivery environment." },
  { icon: ClipboardCheck, title: "Assessment evidence", text: "Agreed checks, attendance records and progress evidence that show how the cohort engaged and performed." },
  { icon: FileText, title: "Useful close-out", text: "A concise completion report with outcomes, observations and practical recommendations for what comes next." },
];

export default function Corporate() {
  return (
    <>
      <PageHero
        eyebrow="Corporate training"
        title="Training shaped around your people and operating reality"
        intro="We work with training managers, HR and project leads to build coherent programmes for graduate intakes, technical teams and experienced workforce groups."
        image={heroImages.corporate}
        alt="Corporate team in a technical workshop"
        cta={{ href: "#enquire", label: "Discuss a corporate programme", secondary: { href: "/training", label: "Browse the catalogue" } }}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((o) => (
            <div key={o.title} className="rounded-md border border-[#dfe6e1] bg-white p-6">
              <o.icon size={24} className="text-[#1a5c3a]" aria-hidden />
              <h2 className="mt-3 text-lg font-semibold text-[#0e2a1c]">{o.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4b5a52]">{o.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#cbd6ce] pt-10">
          <p className="text-xs font-bold tracking-[0.16em] text-[#1a5c3a] uppercase">What the client receives</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold text-[#0e2a1c] sm:text-3xl">A complete programme, not a collection of course slides.</h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-[#d8e0da] bg-[#d8e0da] sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <div key={item.title} className="bg-white p-6">
                <item.icon size={22} className="text-[#1a5c3a]" aria-hidden />
                <h3 className="mt-4 font-bold text-[#0e2a1c]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#526159]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-md bg-[#0e2a1c] p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold">What we need from you to scope well</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-white/85 sm:grid-cols-2">
            {["Roles and headcount per cohort", "Current competence vs. target duties", "Timing, shift patterns and mobilisation dates", "Site, venue and equipment constraints", "Language and accessibility needs", "How you want progress reported"].map((t) => (
              <li key={t} className="flex gap-2"><span aria-hidden className="text-[#e3c860]">—</span> {t}</li>
            ))}
          </ul>
          <Link href="/contact?subject=corporate" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#c9a227] px-5 py-3 text-sm font-semibold text-[#0e2a1c] hover:bg-[#dbb93a]">
            Start scoping <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section id="enquire" className="bg-[#f4f7f5] scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#1a5c3a] uppercase">Corporate enquiry</p>
            <h2 className="mt-2 text-2xl font-bold text-[#0e2a1c]">Tell us about your workforce</h2>
            <p className="mt-3 leading-relaxed text-[#4b5a52]">
              Describe the cohorts, current capability, target roles and timing. We will use that
              information to prepare for a focused scoping conversation.
            </p>
          </div>
          <EnquiryForm defaultSubject="corporate" context="corporate" heading="Corporate training enquiry" />
        </div>
      </section>
    </>
  );
}
