import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { heroImages, site, whatsappHref } from "@/content/site";
import { PageHero } from "@/components/ui";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Contact ALRA TRAINING INSTITUTE LTD/GTE by enquiry form, email, phone or WhatsApp to discuss training programmes and request a proposal.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a training proposal"
        intro="Tell us about the roles, skill gaps, cohort size and timing. Reach us by form, email, phone or WhatsApp and we will help shape the right training scope."
        image={heroImages.contact}
        alt="Professional correspondence and contact"
      />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-xl font-bold text-[#0e2a1c]">Company details</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <Mail size={17} className="mt-0.5 shrink-0 text-[#1a5c3a]" aria-hidden />
              <span>
                <span className="block font-semibold text-[#0e2a1c]">Email</span>
                <a href={`mailto:${site.email}`} className="text-[#1a5c3a] hover:underline">{site.email}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={17} className="mt-0.5 shrink-0 text-[#1a5c3a]" aria-hidden />
              <span>
                <span className="block font-semibold text-[#0e2a1c]">Phone</span>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-[#1a5c3a] hover:underline">{site.phone}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-[#1a5c3a]" aria-hidden />
              <span>
                <span className="block font-semibold text-[#0e2a1c]">Address</span>
                <span className="text-[#4b5a52]">{site.address}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock size={17} className="mt-0.5 shrink-0 text-[#1a5c3a]" aria-hidden />
              <span>
                <span className="block font-semibold text-[#0e2a1c]">Hours</span>
                <span className="text-[#4b5a52]">{site.hours}</span>
              </span>
            </li>
          </ul>
          <a
            href={whatsappHref("Hello ALRA Training Institute, I would like details about a training programme, including dates, duration, fees, venue and delivery options.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#1a5c3a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12452b]"
          >
            <MessageCircle size={18} aria-hidden /> Send us a WhatsApp message
          </a>
          <div className="border-l-2 border-[#c9a227] pl-4 text-sm leading-6 text-[#526159]">
            <p className="font-semibold text-[#0e2a1c]">Information available on request</p>
            <p>Programme dates, duration, fees, venue, delivery mode, cohort options and the applicable completion or certification pathway.</p>
          </div>
          <div className="rounded-sm border border-[#dfe6e1] bg-white p-4 text-xs leading-relaxed text-[#6b7871]">
            <p className="font-semibold text-[#0e2a1c]">What happens next</p>
            <p className="mt-1">1. We review the roles, headcount, timing and delivery context.</p>
            <p>2. We clarify the scope and recommend the right learning path.</p>
            <p>3. You receive a proposal covering content, delivery and next steps.</p>
          </div>
        </div>
        <div className="lg:col-span-3">
          <EnquiryForm defaultSubject="other" context="contact" heading="General / proposal enquiry" />
        </div>
      </section>
    </>
  );
}
