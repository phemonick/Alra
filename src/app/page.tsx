import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, BookOpenCheck, ClipboardCheck, FileCheck2, Gauge, HardHat, Settings2, ShieldCheck, Users } from "lucide-react";
import { programmes } from "@/content/programmes";
import { clientTestimonials, engagementExamples, outcomeMeasures } from "@/content/evidence";
import { heroImages } from "@/content/site";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "ALRA TRAINING INSTITUTE LTD/GTE | Oil & Gas Technical Training",
  description: "Practical training and continuous professional development for upstream, midstream and downstream oil and gas operations, including corporate learning and project-based HCD Training Implementation Plans.",
};

const programmeIcons = [Gauge, HardHat, Settings2, BarChart3, FileCheck2, ShieldCheck];
const outcomes = [
  { title: "Competence that transfers to work", text: "Exercises, case work and supervised practice are built around the decisions people make on the job.", icon: BookOpenCheck },
  { title: "Delivery built around operations", text: "Cohorts, schedules and learning paths can be shaped around roles, shifts, project dates and site realities.", icon: Users },
  { title: "Records that show the journey", text: "Attendance, assessment and close-out reporting give project and training teams a clear line of sight.", icon: ClipboardCheck },
];
const delivery = [
  ["01", "Define the need", "We begin with the roles, current capability, work scope and the standard expected at the end."],
  ["02", "Build the learning path", "Modules, practical work and assessment are sequenced for the people and project in front of us."],
  ["03", "Deliver and assess", "Facilitated learning is supported by exercises, feedback and evidence of participation."],
  ["04", "Close out clearly", "The client receives agreed records, outcomes and recommendations for the next stage of development."],
];
const faqs = [
  ["Can training be delivered at our site?", "Yes. Programmes can be configured for client sites, classrooms or blended delivery. Venue readiness, equipment access and HSE requirements are confirmed during scoping."],
  ["Do you tailor programmes for specific roles or projects?", "Yes. We begin with the target roles, current capability and work requirements, then adjust the modules, practical activities and assessment approach to fit the cohort."],
  ["Does every programme lead to a certification?", "The applicable completion record or certification route is stated in each proposal. Where an external qualification applies, assessment and awards are controlled by the named independent body."],
  ["What information is needed for a proposal?", "Tell us the roles involved, estimated cohort size, location, preferred timing and the capability you want participants to demonstrate. Existing competency data or project milestones are also useful."],
  ["Can ALRA prepare a project-based HCD Training Implementation Plan?", "Yes. We can support needs analysis, programme architecture, cohort and schedule planning, delivery coordination, monitoring and close-out reporting for project-based HCD requirements."],
  ["Do you accept individual enquiries?", "Yes. Individuals may enquire about a programme, although dates and delivery arrangements depend on demand and the scope agreed for each cohort."],
];

export default function Home() {
  const featured = programmes.slice(0, 6);
  return (
    <>
      <section className="relative min-h-[570px] overflow-hidden bg-[#071c12] text-white sm:min-h-[660px]">
        <Image src={heroImages.home} alt="Nigerian engineers receiving practical process equipment training" fill priority sizes="100vw" className="object-cover object-[64%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,15,.98)_0%,rgba(5,24,15,.91)_42%,rgba(5,24,15,.34)_72%,rgba(5,24,15,.12)_100%)]" />
        <div className="relative mx-auto flex min-h-[570px] max-w-6xl items-center px-4 py-12 sm:min-h-[660px] sm:px-6 sm:py-16">
          <div className="reveal max-w-2xl">
            <p className="text-xs font-extrabold tracking-[0.16em] text-[#e3c860] uppercase">Oil and gas training institute</p>
            <h1 className="display-type mt-5 text-4xl leading-[1.08] font-bold sm:text-6xl">Technical training for the work that keeps energy moving.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">ALRA TRAINING INSTITUTE LTD/GTE develops skilled manpower for upstream, midstream and downstream operations through practical technical training and continuous professional development.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/training" className="inline-flex items-center justify-center gap-2 bg-[#c9a227] px-6 py-3.5 text-sm font-extrabold text-[#0e2a1c] hover:bg-[#e0c054]">Explore programmes <ArrowRight size={17} /></Link>
              <Link href="/contact?subject=other" className="inline-flex items-center justify-center border border-white/45 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10">Request a proposal</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-5 text-sm text-white/70">
              <span>Operators and asset teams</span><span>EPC and service companies</span><span>Graduate and technician cohorts</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dfe6e1] bg-white">
        <div className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item.title} className="border-b border-[#dfe6e1] px-4 py-7 last:border-b-0 sm:border-r sm:border-b-0 sm:px-6 sm:last:border-r-0">
              <item.icon size={22} className="text-[#1a5c3a]" aria-hidden />
              <h2 className="mt-3 text-base font-extrabold text-[#0e2a1c]">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#526159]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fine-grid bg-[#f7f9f7]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Core programmes</Eyebrow>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="display-type max-w-2xl text-3xl leading-tight font-bold text-[#0e2a1c] sm:text-4xl">Technical depth, connected to field reality.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#526159]">Choose a focused programme or combine disciplines into a learning path for a team, project or intake.</p>
            </div>
            <Link href="/training" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1a5c3a] hover:underline">View all 11 programmes <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-[#d8e0da] bg-[#d8e0da] sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((programme, index) => {
              const Icon = programmeIcons[index];
              return (
                <Link key={programme.slug} href={`/training/${programme.slug}`} className="group min-h-64 bg-white p-7 hover:bg-[#f0f5f1] focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#1a5c3a] focus-visible:outline-none">
                  <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center bg-[#edf4ef] text-[#1a5c3a]"><Icon size={22} /></span><span className="text-xs font-bold text-[#5f6b64]">0{index + 1}</span></div>
                  <p className="mt-7 text-xs font-extrabold tracking-[0.12em] text-[#1a5c3a] uppercase">{programme.category}</p>
                  <h3 className="mt-2 text-xl font-extrabold text-[#0e2a1c] group-hover:underline">{programme.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#526159]">{programme.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0e2a1c] text-white">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[620px]"><Image src={heroImages.hcd} alt="Project team developing a workforce training plan" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
          <div className="flex flex-col justify-center px-4 py-14 sm:px-10 lg:px-14">
            <p className="text-xs font-extrabold tracking-[0.16em] text-[#e3c860] uppercase">HCD and Training Implementation Plans</p>
            <h2 className="display-type mt-4 text-3xl leading-tight font-bold sm:text-4xl">A workforce plan people can deliver and leaders can follow.</h2>
            <p className="mt-5 leading-7 text-white/80">We connect project roles and schedules to training needs, practical delivery, assessment and reporting. The result is a plan with clear ownership and a useful record of progress.</p>
            <ul className="mt-7 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              {["Needs and skills-gap analysis", "Curriculum and cohort planning", "Practical and on-the-job phases", "Monitoring and close-out reporting"].map((item) => <li key={item} className="flex gap-2"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#e3c860]" />{item}</li>)}
            </ul>
            <Link href="/hcd-tip" className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#e3c860] pb-1 text-sm font-extrabold text-white hover:text-[#e3c860]">Explore HCD and TIP services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="display-type mt-3 max-w-2xl text-3xl leading-tight font-bold text-[#0e2a1c] sm:text-4xl">A clear line from training need to evidence of progress.</h2>
          <div className="mt-10 grid border-t border-[#cbd6ce] md:grid-cols-4">
            {delivery.map(([number, title, text]) => (
              <div key={number} className="border-b border-[#cbd6ce] py-7 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <span className="display-type text-2xl font-bold text-[#806614]">{number}</span><h3 className="mt-4 text-base font-extrabold text-[#0e2a1c]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526159]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dfe6e1] bg-[#f7f9f7]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Eyebrow>Representative engagements</Eyebrow>
          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h2 className="display-type max-w-3xl text-3xl leading-tight font-bold text-[#0e2a1c] sm:text-4xl">What a well-scoped engagement can look like.</h2>
              <p className="mt-4 max-w-3xl leading-7 text-[#526159]">These examples illustrate how ALRA can structure common workforce requirements. The final scope, targets and evidence are agreed for each client.</p>
            </div>
            <Link href="/contact?subject=corporate" className="inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 border-[#c9a227] text-sm font-extrabold text-[#0e2a1c] hover:text-[#1a5c3a]">Discuss your requirement <ArrowRight size={16} /></Link>
          </div>

          <div className="mt-10 divide-y divide-[#cbd6ce] border-y border-[#cbd6ce]">
            {engagementExamples.map((example, index) => (
              <article key={example.title} className="grid gap-5 py-8 md:grid-cols-[0.18fr_0.82fr] md:gap-8">
                <div>
                  <span className="display-type text-2xl font-bold text-[#806614]">0{index + 1}</span>
                  <p className="mt-2 text-xs font-extrabold tracking-[0.12em] text-[#1a5c3a] uppercase">{example.label}</p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#0e2a1c]">{example.title}</h3>
                  <p className="mt-3 max-w-3xl leading-7 text-[#526159]">{example.brief}</p>
                  <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div><dt className="text-sm font-bold text-[#0e2a1c]">Delivery approach</dt><dd className="mt-1 text-sm leading-6 text-[#526159]">{example.approach}</dd></div>
                    <div><dt className="text-sm font-bold text-[#0e2a1c]">Evidence produced</dt><dd className="mt-1 text-sm leading-6 text-[#526159]">{example.evidence}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0e2a1c] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-extrabold tracking-[0.16em] text-[#e3c860] uppercase">Measurable outcomes</p>
          <h2 className="display-type mt-3 max-w-3xl text-3xl leading-tight font-bold sm:text-4xl">Agree the evidence before delivery begins.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/75">Useful measurement starts with the required capability. ALRA can report the measures below against targets agreed during scoping, without presenting attendance alone as proof of competence.</p>
          <div className="mt-10 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {outcomeMeasures.map((measure) => (
              <div key={measure.value} className="border-b border-white/20 py-7 sm:px-6 sm:nth-[odd]:pl-0 lg:border-r lg:px-6 lg:last:border-r-0 lg:first:pl-0">
                <span className="display-type text-2xl font-bold text-[#e3c860]">{measure.value}</span>
                <h3 className="mt-4 font-extrabold">{measure.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{measure.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {clientTestimonials.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <Eyebrow>Client feedback</Eyebrow>
            <h2 className="display-type mt-3 text-3xl font-bold text-[#0e2a1c] sm:text-4xl">What clients say about the work.</h2>
            <div className="mt-9 grid gap-px overflow-hidden border border-[#d8e0da] bg-[#d8e0da] lg:grid-cols-3">
              {clientTestimonials.map((testimonial) => (
                <figure key={`${testimonial.name}-${testimonial.organisation}`} className="bg-[#f7f9f7] p-7">
                  <blockquote className="text-lg leading-8 text-[#24352c]">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm text-[#526159]"><strong className="block text-[#0e2a1c]">{testimonial.name}</strong>{testimonial.role}, {testimonial.organisation}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[#dfe6e1] bg-[#f7f9f7]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Questions clients ask</Eyebrow>
            <h2 className="display-type mt-3 text-3xl leading-tight font-bold text-[#0e2a1c] sm:text-4xl">Useful answers before we scope the work.</h2>
            <p className="mt-4 max-w-md leading-7 text-[#526159]">Every engagement is shaped around the requirement, but these are the practical starting points.</p>
          </div>
          <div className="divide-y divide-[#cbd6ce] border-y border-[#cbd6ce]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-bold text-[#0e2a1c] marker:content-none">
                  <span>{question}</span>
                  <span aria-hidden className="text-xl font-normal text-[#1a5c3a] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-[#526159]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#c9a227]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center">
          <div><p className="text-xs font-extrabold tracking-[0.15em] text-[#0e2a1c] uppercase">Start with the work requirement</p><h2 className="display-type mt-2 max-w-3xl text-2xl font-bold text-[#0e2a1c] sm:text-3xl">Tell us who needs to be ready, for what role and by when.</h2></div>
          <Link href="/contact?subject=other" className="inline-flex shrink-0 items-center gap-2 bg-[#0e2a1c] px-6 py-3.5 text-sm font-extrabold text-white hover:bg-[#1a5c3a]">Request a proposal <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
