import type { Metadata } from "next";
import {
  ClipboardList,
  SearchCheck,
  BookOpenCheck,
  CalendarClock,
  Boxes,
  BadgeCheck,
  MonitorDot,
  FileBarChart,
} from "lucide-react";
import { heroImages } from "@/content/site";
import { PageHero } from "@/components/ui";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "HCD & Training Implementation Plans (TIP)",
  description:
    "ALRA TRAINING INSTITUTE LTD/GTE helps operators and EPC contractors design project-specific Human Capacity Development Training Implementation Plans — needs assessment, curriculum, scheduling, assessment, monitoring and reporting.",
};

const scope = [
  { icon: SearchCheck, title: "Training needs assessment", text: "Analyse project roles, work scopes and schedules to define who must be trained, to what level, and by when." },
  { icon: ClipboardList, title: "Skills gap analysis", text: "Compare available personnel against required competences — technical, safety and soft skills — and prioritise gaps." },
  { icon: BookOpenCheck, title: "Curriculum planning", text: "Sequence classroom learning, workshop practice and on-the-job phases with clear objectives and entry requirements." },
  { icon: CalendarClock, title: "Delivery scheduling", text: "Align training cohorts and intakes with mobilisation dates, site access and project milestones." },
  { icon: Boxes, title: "Resource planning", text: "Plan instructors, venues, equipment, materials, PPE, welfare and certification logistics." },
  { icon: BadgeCheck, title: "Assessment", text: "Define knowledge checks, practical assessments and competence sign-off criteria per discipline." },
  { icon: MonitorDot, title: "Monitoring", text: "Track attendance, progress and competence development with transparent records." },
  { icon: FileBarChart, title: "Reporting", text: "Produce structured progress and close-out reports suitable for internal governance and client review." },
];

export default function HcdPage() {
  return (
    <>
      <PageHero
        eyebrow="HCD & Training Implementation Plans"
        title="A workforce plan connected to project delivery"
        intro="We help operators, EPC contractors and project owners turn workforce requirements into a structured programme of learning, practical exposure, assessment and reporting."
        image={heroImages.hcd}
        alt="Project engineers planning workforce training"
        cta={{ href: "#enquire", label: "Request a project proposal", secondary: { href: "/training", label: "Browse training programmes" } }}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="display-type text-3xl font-bold text-[#0e2a1c]">What a TIP covers with us</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-[#4b5a52]">
          A Training Implementation Plan connects a project&apos;s scope and schedule to the people
          who will deliver it. Our service is typically structured around eight elements —
          scoped to your project, not sold as a fixed template.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scope.map((s) => (
            <div key={s.title} className="border-t-2 border-[#1a5c3a] bg-[#f7f9f7] p-5">
              <s.icon size={22} className="text-[#1a5c3a]" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-[#0e2a1c]">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4b5a52]">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-md bg-[#f4f7f5] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#0e2a1c]">How engagements typically run</h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-[#24352c]">
              <li><strong>1. Scoping call</strong> — project scope, disciplines, headcount, timing and site constraints.</li>
              <li><strong>2. Needs &amp; gap analysis</strong> — roles mapped to competences; gaps prioritised.</li>
              <li><strong>3. TIP draft</strong> — curriculum, schedule, resources, assessment and reporting plan.</li>
              <li><strong>4. Review &amp; alignment</strong> — walkthrough with your training and project leads.</li>
              <li><strong>5. Delivery &amp; tracking</strong> — phased training with monitoring and progress reports.</li>
            </ol>
          </div>
          <div className="border-l-4 border-[#c9a227] bg-[#0e2a1c] p-6 text-white sm:p-8">
            <h3 className="text-lg font-bold">Project governance and reporting</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4b5a52]">
              <span className="text-white/80">Where a project has Nigerian Content HCD requirements, the operator or contractor remains responsible for its approval route. ALRA supports that process with a clear training plan, delivery records, assessment evidence and close-out reporting.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4b5a52]">
              <span className="text-white/65">The scope, responsibilities and reporting format are agreed at the start of each engagement.</span>
            </p>
          </div>
        </div>
      </section>

      <section id="enquire" className="bg-[#f4f7f5] scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#1a5c3a] uppercase">Project enquiry</p>
            <h2 className="mt-2 text-2xl font-bold text-[#0e2a1c]">Request a project-specific proposal</h2>
            <p className="mt-3 leading-relaxed text-[#4b5a52]">
              Share the project name, scope, disciplines, estimated trainee numbers, locations
              and timing. The form preselects the HCD/TIP service — add project detail in the
              message field.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#24352c]">
              {["EPC and construction workforces", "Operations and maintenance ramp-up", "Graduate and technician intake schemes", "Multi-site and multi-contractor programmes"].map((t) => (
                <li key={t} className="flex gap-2"><span aria-hidden className="text-[#1a5c3a]">✓</span> {t}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-[#5f6b64]">
              Prefer email? Write to us directly and mention &quot;HCD/TIP&quot; in the subject line.
            </p>
          </div>
          <EnquiryForm defaultSubject="hcd-tip" context="hcd-tip" heading="HCD / TIP project enquiry" />
        </div>
      </section>
    </>
  );
}
