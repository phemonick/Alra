"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { categories, programmes } from "@/content/programmes";

export default function Catalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmes.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      const inQuery =
        !q ||
        [p.title, p.summary, p.category, ...p.topics].join(" ").toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="relative flex-1">
          <Search size={17} aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#6b7871]" />
          <label htmlFor="catalogue-search" className="sr-only">Search training programmes</label>
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes, topics, skills…"
            className="w-full rounded-sm border border-[#c8d2cb] bg-white py-2.5 pr-3 pl-9 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5c3a]"
          />
        </div>
        <div className="lg:hidden">
          <label htmlFor="catalogue-category" className="mb-1.5 block text-sm font-semibold text-[#24352c]">
            Filter by discipline
          </label>
          <select
            id="catalogue-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-11 w-full rounded-sm border border-[#c8d2cb] bg-white px-3 text-sm text-[#24352c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5c3a]"
          >
            {["All", ...categories].map((c) => (
              <option key={c} value={c}>{c === "All" ? "All disciplines" : c}</option>
            ))}
          </select>
        </div>
        <div className="hidden flex-wrap gap-2 lg:flex" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-xs font-semibold whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#1a5c3a] focus-visible:outline-none ${
                category === c
                  ? "border-[#0e2a1c] bg-[#0e2a1c] text-white"
                  : "border-[#c8d2cb] bg-white text-[#24352c] hover:border-[#0e2a1c]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-4 text-sm text-[#4b5a52]">
        Showing {results.length} of {programmes.length} programmes
        {category !== "All" ? ` in ${category}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}.
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-md border border-dashed border-[#c8d2cb] bg-white p-8 text-center">
          <p className="font-semibold text-[#0e2a1c]">No programmes match your search.</p>
          <p className="mt-1 text-sm text-[#4b5a52]">Try a broader term, or contact us and we will scope it for you.</p>
          <Link href="/contact?subject=other" className="mt-4 inline-block rounded-sm bg-[#0e2a1c] px-5 py-2.5 text-sm font-semibold text-white">
            Ask about this need
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/training/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-[#dfe6e1] bg-white transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#1a5c3a] focus-visible:outline-none"
              >
                <div className="relative h-40 shrink-0">
                  <Image src={p.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-bold tracking-widest text-[#1a5c3a] uppercase">{p.category}</p>
                  <h2 className="mt-1.5 text-base font-semibold text-[#0e2a1c] group-hover:underline">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#4b5a52]">{p.summary}</p>
                  <span className="mt-4 text-sm font-semibold text-[#1a5c3a]">View programme →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
