import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How ALRA TRAINING INSTITUTE LTD/GTE handles information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[#0e2a1c] text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-bold tracking-[0.18em] text-[#e3c860] uppercase">Website information</p>
          <h1 className="display-type mt-3 text-3xl font-bold sm:text-5xl">Privacy notice</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/80">This notice explains how information sent through the ALRA website is used and handled.</p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-9 text-sm leading-7 text-[#526159]">
          <section>
            <h2 className="text-xl font-bold text-[#0e2a1c]">Information you provide</h2>
            <p className="mt-2">When you submit an enquiry, we may receive your name, organisation, work email, telephone number, programme interest, expected participant numbers, preferred timing and the message you choose to provide.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0e2a1c]">How we use it</h2>
            <p className="mt-2">We use enquiry information to understand your request, respond to you, prepare or discuss a proposal, and keep an appropriate record of the conversation. We do not sell information submitted through this website.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0e2a1c]">Storage and service providers</h2>
            <p className="mt-2">Information may be processed by the website hosting, communications or enquiry-handling services used to operate this site. Access should be limited to people and providers who need it for those purposes.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#0e2a1c]">Retention and your choices</h2>
            <p className="mt-2">We keep enquiry information only for as long as it remains useful for the request, business records and any applicable obligations. You may contact us to ask about, correct or request deletion of information you have submitted, subject to records we need to retain.</p>
          </section>
          <section className="border-l-4 border-[#c9a227] bg-[#f4f7f5] p-5">
            <h2 className="text-xl font-bold text-[#0e2a1c]">Contact</h2>
            <p className="mt-2">For a privacy question or request, email <a className="font-semibold text-[#1a5c3a] hover:underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </section>
        </div>
        <Link href="/contact" className="mt-10 inline-flex min-h-11 items-center border-b-2 border-[#c9a227] text-sm font-bold text-[#0e2a1c] hover:text-[#1a5c3a]">Return to contact</Link>
      </main>
    </>
  );
}
