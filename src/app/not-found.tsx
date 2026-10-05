import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-bold tracking-[0.18em] text-[#1a5c3a] uppercase">Page not found</p>
      <h1 className="mt-2 text-3xl font-bold text-[#0e2a1c]">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-[#4b5a52]">Try the training catalogue, or send us an enquiry and we&apos;ll point you the right way.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/training" className="rounded-sm bg-[#0e2a1c] px-5 py-3 text-sm font-semibold text-white">Browse training</Link>
        <Link href="/contact" className="rounded-sm border border-[#0e2a1c] px-5 py-3 text-sm font-semibold text-[#0e2a1c]">Contact us</Link>
      </div>
    </section>
  );
}
