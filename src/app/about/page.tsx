import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, FlaskConical, Globe2, Users } from "lucide-react";
import { heroImages } from "@/content/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "ALRA TRAINING INSTITUTE LTD/GTE develops skilled manpower for upstream, midstream and downstream oil and gas operations and supports continuous professional development.",
};

const pillars = [
  { icon: FlaskConical, title: "Practical skills first", text: "Classroom concepts are always paired with exercises, simulations and supervised practice, so learning transfers to the job." },
  { icon: Users, title: "Workforce development", text: "We design for cohorts — graduate trainees, craft teams, supervisors — with clear objectives and measurable progress." },
  { icon: Compass, title: "Nigerian industry focus", text: "Programmes are shaped for the mix of operators, contractors, projects and operating environments found across Nigeria's energy sector." },
  { icon: Globe2, title: "Global outlook", text: "We keep an international view of technical practice while designing delivery around the people, equipment and project conditions at hand." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About ALRA"
        title="Training built around the work, the people and the outcome"
        intro="ALRA TRAINING INSTITUTE LTD/GTE develops technical capability for upstream, midstream and downstream operations through focused programmes, certification pathways, refresher courses and project-based human capacity development."
        image={heroImages.about}
        alt="Nigerian professionals in a collaborative training session"
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="display-type text-3xl font-bold text-[#0e2a1c]">Built for useful learning</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-[#4b5a52]">
              <p>
                Our portfolio covers drilling, subsea, automation and control,
                electrical, instrumentation and mechanical operations and maintenance, project
                management, document control, health, safety and environment (HSE) and
                non-destructive testing (NDT), together with the digital skills that support modern operations.
              </p>
              <p>
                For project and corporate teams, we prepare Human Capacity Development (HCD)
                Training Implementation Plans (TIP) covering
                needs assessment, skills-gap analysis, curriculum, scheduling, resourcing,
                assessment, monitoring and reporting.
              </p>
              <p>Every engagement starts with context: who is being trained, what they need to do, where the gaps sit and how progress should be demonstrated.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/training" className="rounded-sm bg-[#0e2a1c] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#1a5c3a]">
                Browse programmes
              </Link>
              <Link href="/hcd-tip" className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#0e2a1c] px-5 py-3 text-sm font-semibold text-[#0e2a1c] hover:bg-[#0e2a1c] hover:text-white">
                HCD &amp; TIP services <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-md">
            <Image
              src="/images/alra-technical-workshop.jpg"
              alt="Industrial training facility with technical equipment"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-[#d8e0da] bg-[#d8e0da] md:grid-cols-2">
          <div className="bg-[#0e2a1c] p-7 text-white sm:p-9">
            <p className="text-xs font-extrabold tracking-[0.16em] text-[#e3c860] uppercase">Our first objective</p>
            <h2 className="display-type mt-3 text-2xl font-bold">Develop skilled manpower across the oil and gas value chain.</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">Build relevant technical capability for people working in, or preparing to enter, upstream, midstream and downstream operations.</p>
          </div>
          <div className="bg-white p-7 sm:p-9">
            <p className="text-xs font-extrabold tracking-[0.16em] text-[#1a5c3a] uppercase">Our second objective</p>
            <h2 className="display-type mt-3 text-2xl font-bold text-[#0e2a1c]">Support continuous professional development.</h2>
            <p className="mt-4 text-sm leading-7 text-[#526159]">Provide certification-aligned learning and refresher courses that help professionals renew knowledge, strengthen practice and remain ready for changing responsibilities.</p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="border-t-2 border-[#1a5c3a] bg-[#f7f9f7] p-6">
              <p.icon size={22} className="text-[#1a5c3a]" aria-hidden />
              <h3 className="mt-3 text-base font-extrabold text-[#0e2a1c]">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4b5a52]">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-l-4 border-[#c9a227] bg-[#0e2a1c] p-6 text-white sm:p-8">
          <h2 className="display-type text-2xl font-bold">Nigerian Content in practice</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4b5a52]">
            <span className="text-white/80">Meaningful local participation requires more than attendance. It requires relevant learning, practical exposure, clear assessment and records that project teams can use. That is the standard we bring to workforce planning and delivery.</span>
          </p>
        </div>
      </section>
    </>
  );
}
