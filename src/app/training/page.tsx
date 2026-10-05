import type { Metadata } from "next";
import { heroImages } from "@/content/site";
import { PageHero } from "@/components/ui";
import Catalogue from "./Catalogue";

export const metadata: Metadata = {
  title: "Training Programmes",
  description:
    "Searchable catalogue of ALRA TRAINING INSTITUTE LTD/GTE training programmes — drilling, subsea, automation, operations and maintenance, project management, document control, HSE and NDT.",
};

export default function TrainingIndex() {
  return (
    <>
      <PageHero
        eyebrow="Training catalogue"
        title="Find the programme your team needs"
        intro="Search by skill or filter by category. Every programme page lists audience, objectives, practical topics and prerequisites — with commercial details confirmed on enquiry."
        image={heroImages.training}
        alt="Engineers in technical training with industrial equipment"
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Catalogue />
        <aside className="mt-10 rounded-md bg-[#f4f7f5] p-6 text-sm leading-relaxed text-[#4b5a52]">
          <h2 className="font-semibold text-[#0e2a1c]">Can&apos;t find an exact match?</h2>
          <p className="mt-1">
            Many clients need a blend — for example, instrumentation plus control-room shadowing,
            or HSE bundled into every technical module. Send an enquiry describing the roles and
            skill gaps and we will propose a tailored blend.
          </p>
        </aside>
      </section>
    </>
  );
}
