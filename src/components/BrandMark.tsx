import Link from "next/link";

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="ALRA Training Institute Ltd/Gte home">
      <span
        aria-hidden
        className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden border border-[#d8bb56]/50 bg-[#c9a227] text-[#0e2a1c]"
      >
        <span className="display-type relative z-10 text-lg font-bold">A</span>
        <span className="absolute -right-2 -bottom-3 h-7 w-7 rotate-45 bg-[#0e2a1c]/12" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block max-w-[190px] text-[12px] font-extrabold tracking-[0.04em] text-white sm:max-w-none sm:text-sm xl:text-base">
          ALRA TRAINING INSTITUTE LTD/GTE
        </span>
        {!compact && (
          <span className="mt-0.5 hidden text-[11px] font-semibold tracking-[0.16em] text-white/65 uppercase min-[420px]:block">
            Energy skills and professional development
          </span>
        )}
      </span>
    </Link>
  );
}
