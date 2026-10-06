import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { site, whatsappHref } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-[#071c12] text-white/75">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 lg:flex-row lg:items-end">
          <div>
            <BrandMark />
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">Technical training and human capacity development for the people who plan, build, operate and maintain energy projects.</p>
          </div>
          <Link prefetch={false} href="/contact?subject=other" className="inline-flex w-fit items-center gap-2 border-b border-[#c9a227] pb-1 text-sm font-extrabold text-white hover:text-[#e3c860]">Discuss a training need <ArrowUpRight size={16} /></Link>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="text-xs font-extrabold tracking-[0.14em] text-[#c9a227] uppercase">Explore</p>
            <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <li><Link className="hover:text-white" href="/about">About ALRA</Link></li>
              <li><Link className="hover:text-white" href="/training">Training programmes</Link></li>
              <li><Link className="hover:text-white" href="/hcd-tip">HCD and TIP services</Link></li>
              <li><Link className="hover:text-white" href="/corporate">Corporate training</Link></li>
            </ul>
          </nav>
          <div>
            <p className="text-xs font-extrabold tracking-[0.14em] text-[#c9a227] uppercase">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a className="hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a className="hover:text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li><a className="hover:text-white" href={whatsappHref()} target="_blank" rel="noreferrer">Send a WhatsApp message</a></li>
              <li>{site.address}</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-extrabold tracking-[0.14em] text-[#c9a227] uppercase">Programme enquiries</p>
            <p className="mt-4 text-sm leading-6">Share the role, cohort size, location and timing. We will help shape the right scope.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link className="hover:text-white" href="/privacy">Privacy notice</Link>
            <p>Technical training · Corporate learning · HCD implementation</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/60">Training imagery is illustrative, not a record of completed ALRA engagements.</p>
      </div>
    </footer>
  );
}
