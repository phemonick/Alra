"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import BrandMark from "@/components/BrandMark";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <header onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }} className="sticky top-0 z-50 border-b border-white/10 bg-[#0e2a1c]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-1 whitespace-nowrap xl:flex">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                prefetch={!["/contact", "/hcd-tip", "/corporate"].includes(item.href)} href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 px-3 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:outline-none ${
                  active ? "border-[#c9a227] text-white" : "border-transparent text-white/75 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            prefetch={false} href="/contact?subject=other"
            className="ml-2 bg-[#c9a227] px-4 py-2.5 text-sm font-bold text-[#0e2a1c] transition-colors hover:bg-[#e0c054] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Request Proposal
          </Link>
        </nav>

        <button
          ref={toggle}
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-sm text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:outline-none xl:hidden"
          aria-expanded={open}
          aria-controls={open ? "mobile-nav" : undefined}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-white/10 px-4 pt-2 pb-4 xl:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    prefetch={!["/contact", "/hcd-tip", "/corporate"].includes(item.href)} href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-sm px-3 py-2.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:outline-none ${
                      active ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                prefetch={false} href="/contact?subject=other"
                onClick={() => setOpen(false)}
                className="block rounded-sm bg-[#c9a227] px-3 py-2.5 text-center text-sm font-semibold text-[#0e2a1c]"
              >
                Request a Training Proposal
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
