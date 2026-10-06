const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "393894584635";
export const siteUrl = new URL((process.env.NEXT_PUBLIC_SITE_URL || "https://alratraining.com").trim()).origin;

export const site = {
  name: "ALRA TRAINING INSTITUTE LTD/GTE",
  shortName: "ALRA",
  tagline: "Technical training and continuous professional development for the energy workforce.",
  description:
    "ALRA TRAINING INSTITUTE LTD/GTE develops skilled manpower for upstream, midstream and downstream oil and gas operations through technical training, certification pathways, refresher courses and project-based human capacity development.",
  email: (process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@alratraining.com").trim(),
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+39 389 458 4635",
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "10 Journalist Estate Road, Arepo, Ogun State, Nigeria",
  hours: process.env.NEXT_PUBLIC_COMPANY_HOURS || "Monday–Friday, 8:00–17:00 (WAT)",
  whatsapp: whatsappNumber,
  brochureUrl: process.env.NEXT_PUBLIC_BROCHURE_URL || "",
};

export function whatsappHref(message = "Hello ALRA Training Institute, I would like to ask about your training programmes.") {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training Programmes" },
  { href: "/hcd-tip", label: "HCD & TIP" },
  { href: "/corporate", label: "Corporate Training" },
  { href: "/contact", label: "Contact" },
];

export const heroImages = {
  home: "/images/alra-training-hero.jpg",
  about: "/images/alra-technical-workshop.jpg",
  training: "/images/alra-technical-workshop.jpg",
  hcd: "/images/alra-hcd-planning.jpg",
  corporate: "/images/alra-training-hero.jpg",
  contact: "/images/alra-hcd-planning.jpg",
};
