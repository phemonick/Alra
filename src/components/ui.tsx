import Image from "next/image";
import Link from "next/link";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-extrabold tracking-[0.16em] text-[#1a5c3a] uppercase">{children}</p>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
  cta,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  alt: string;
  cta?: { href: string; label: string; secondary?: { href: string; label: string } };
}) {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-[#0e2a1c] text-white sm:min-h-[500px]">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,18,.97)_0%,rgba(7,28,18,.84)_48%,rgba(7,28,18,.2)_100%)]" />
      <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center px-4 py-16 sm:min-h-[500px] sm:px-6">
        <div className="reveal max-w-2xl">
        <p className="text-xs font-extrabold tracking-[0.16em] text-[#e3c860] uppercase">{eyebrow}</p>
        <h1 className="display-type mt-4 text-4xl leading-[1.12] font-bold sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">{intro}</p>
        {cta && (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={cta.href} className="bg-[#c9a227] px-6 py-3 text-center text-sm font-bold text-[#0e2a1c] hover:bg-[#e0c054]">
              {cta.label}
            </Link>
            {cta.secondary && (
              <Link href={cta.secondary.href} className="border border-white/45 px-6 py-3 text-center text-sm font-bold text-white hover:bg-white/10">
                {cta.secondary.label}
              </Link>
            )}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

export function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-[#dfe6e1] bg-white px-4 py-3">
      <p className="text-[11px] font-bold tracking-widest text-[#6b7871] uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#1c2420]">{value}</p>
    </div>
  );
}
