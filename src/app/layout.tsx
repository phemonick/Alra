import type { Metadata } from "next";
import { Libre_Baskerville, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site, siteUrl } from "@/content/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const libre = Libre_Baskerville({ subsets: ["latin"], variable: "--font-display", weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ALRA TRAINING INSTITUTE LTD/GTE — Oil & Gas Technical Training",
    template: "%s | ALRA TRAINING INSTITUTE LTD/GTE",
  },
  description: site.description,
  openGraph: {
    title: "ALRA TRAINING INSTITUTE LTD/GTE — Oil & Gas Technical Training",
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: "en_NG",
    images: [{ url: "/images/alra-training-hero.jpg", width: 1920, height: 1080, alt: "ALRA technical training" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALRA TRAINING INSTITUTE LTD/GTE",
    description: site.description,
    images: ["/images/alra-training-hero.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${libre.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-[#1c2420] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: site.name,
              url: siteUrl,
              email: site.email,
              telephone: site.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: "10 Journalist Estate Road",
                addressLocality: "Arepo",
                addressRegion: "Ogun State",
                addressCountry: "NG",
              },
              areaServed: "Nigeria",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: site.phone,
                contactType: "training enquiries",
                availableLanguage: "English",
              },
              description: site.description,
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-sm focus:bg-[#c9a227] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0e2a1c]"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
