# ALRA TRAINING INSTITUTE LTD/GTE — Website

Next.js 16 + TypeScript + Tailwind CSS 4 + Lucide icons + Zod validation.

## Assumptions
- No approved logo file was supplied: the site uses a restrained ALRA monogram and wordmark until the final identity is available.
- All commercial/certification details (dates, fees, duration, venue, delivery mode, certification) are **configurable per programme** in `src/content/programmes.ts` and default to “Contact us for details” — nothing is invented.
- In local development, enquiries are written as individual git-ignored JSON files under `data/enquiries/`. Production requires `ENQUIRY_WEBHOOK_URL`; the API returns a clear error instead of claiming success when delivery is not configured.
- The approved phone and WhatsApp contact are included by default and can be overridden through the public environment variables. Brochure links render only when `NEXT_PUBLIC_BROCHURE_URL` is set.
- Draft-stage programmes (from Entrepreneurship and Innovation Centre Ltd material) live in `draftProgrammes` in `src/content/programmes.ts` and on the unlinked, no-index `/drafts` review page — never in the public catalogue.
- Three original, project-owned image assets are stored under `public/images/` and served locally through `next/image`.

## Research basis (global + Nigeria)
- **Nigeria:** NCDMB HCD framework — project-based HCD applies to contracts ≥ ~$1M; Training Implementation Plans (TIP/HCDP) combine classroom + practical + on-the-job training with certification; plans are operator/contractor-submitted for review. Field-readiness skills in demand include subsea, automation/control, production & maintenance (electrical/instrument/mechanical), QA/QC incl. NDT L1–3, drilling/well services, HSE and digital skills.
- **Global:** programme language is informed by widely used discipline practices while avoiding unsupported claims about accreditation, partnerships or external awards.
- **B2B UX:** catalogue search + category filters, per-programme enquiry preselection (`/contact?subject=<slug>`), minimal required fields, RFQ-style proposal flow, answer-first HCD content.

## Setup
```bash
npm install
cp .env.example .env.local   # fill in real contact details
npm run dev                  # http://localhost:3000
```

## Content editing
- `src/content/site.ts` — company name, email, phone, address, hours, WhatsApp, brochure URL and local image assignments.
- `src/content/programmes.ts` — all 11 core programmes (audience, objectives, topics, prerequisites, duration/mode/venue/certification/dates/fees) + `draftProgrammes` + enquiry subjects.
- Pages: `src/app/page.tsx` (Home), `about/`, `training/` + `training/[slug]/`, `hcd-tip/`, `corporate/`, `contact/`, `drafts/` (unlinked review).

## Enquiry workflow
- Client validation + server validation (`src/app/api/enquiries/route.ts`, Zod).
- States: idle → sending (spinner) → success after confirmed delivery / error with entries retained in state and localStorage.
- Spam: honeypot field + minimum-fill-time trap (`ENQUIRY_MIN_FILL_SECONDS`).
- Privacy notice inline under the form.

## Integrations still needing credentials
- `ENQUIRY_WEBHOOK_URL` — required for production delivery through Formspree, Make, Zapier or a company backend.
- Real SMTP/transactional-email provider if you want auto-replies (not yet wired).
- Brochure PDF URL, when an approved brochure is available.
- Production database (e.g. Postgres via Prisma/Supabase) if JSON-file storage is insufficient — the API route is isolated so this is a small swap.
- Analytics (e.g. Plausible/GA) — not yet added.

## Business details needed before launch
1. Logo file + brand-green confirmation (#0e2a1c / #1a5c3a + gold #c9a227 currently).
2. Final production domain and enquiry-delivery integration.
3. Per programme: duration, delivery mode(s), venue(s), fees, schedule, certification route wording.
4. HCD/TIP: past project experience you *can* factually claim (or confirm “no claims yet”), typical cohort sizes, delivery footprint (Lagos/PH/on-site?).
5. Confirm or reject each of the 7 draft programmes before any go public; confirm facilitator credentials for NDT/AWS/CIPS routes.
6. Privacy/GDPR-NDPR contact for data-deletion requests; confirm enquiry retention period.
7. Replace generated launch photography with approved photos of ALRA delivery when a consented company library becomes available.

## Verify
```bash
npm run lint
npm run build && npm start
```
Check desktop + mobile: nav (incl. hamburger), catalogue search/filters, programme pages, all three enquiry forms (success + failure retention), keyboard focus rings, `/drafts` no-index.
