# ALRA TRAINING INSTITUTE LTD/GTE — Website

Next.js 16 + TypeScript + Tailwind CSS 4 + Lucide icons + Zod validation.

## Assumptions
- No approved logo file was supplied: the site uses a restrained ALRA monogram and wordmark until the final identity is available.
- All commercial/certification details (dates, fees, duration, venue, delivery mode, certification) are **configurable per programme** in `src/content/programmes.ts` and default to “Contact us for details” — nothing is invented.
- In local development, unconfigured enquiries are written as individual git-ignored JSON files under `data/enquiries/`. Production requires `FORMSPREE_FORM_ID` or an alternative `ENQUIRY_WEBHOOK_URL`; the API returns a clear error instead of claiming success when delivery is not configured.
- Calls go to +234 906 518 8808; WhatsApp goes to +39 389 458 4635. These are separate settings and can be overridden through public environment variables. Brochure links render only when `NEXT_PUBLIC_BROCHURE_URL` is set.
- Draft-stage programmes remain in source and on a development-only review page. `/drafts` returns 404 in production.
- Three generated, illustrative training images are stored under `public/images/` and served locally through `next/image`. The footer identifies them as illustrative, not evidence of actual ALRA projects.

## Research basis (global + Nigeria)
- **Nigeria:** project-based HCD planning covers skills needs, classroom and practical phases, on-the-job learning, assessment and reporting. Confirm current NCDMB requirements and any project-specific approval obligations directly with the responsible operator before making regulatory commitments. The site does not claim NCDMB accreditation or approval.
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
- States: idle → sending (15-second timeout) → success after confirmed delivery / error with entries retained in state and session storage. Drafts older than 24 hours are discarded on reopening; legacy localStorage drafts are deleted.
- Spam: honeypot field + minimum-fill-time trap (`ENQUIRY_MIN_FILL_SECONDS`).
- Privacy notice inline under the form.

## Integrations
- `FORMSPREE_FORM_ID` — configured in production, notifying verified `info@alratraining.com` which forwards to both personal inboxes. The live enquiry and forwarding delivery were verified on 6 October 2026. See `EMAIL_SETUP.md` for evidence, quotas and operation.
- `ENQUIRY_WEBHOOK_URL` — alternative JSON webhook for a company backend; ignored when the Formspree ID is set.
- Real SMTP/transactional-email provider if you want auto-replies (not yet wired).
- Brochure PDF URL, when an approved brochure is available.
- Formspree provides hosted enquiry storage; a separate production database is not required for this setup. Local JSON files are not production storage.
- Analytics (e.g. Plausible/GA) — not yet added.

## Business details needed before launch
1. Logo file + brand-green confirmation (#0e2a1c / #1a5c3a + gold #c9a227 currently).
2. Production domain `alratraining.com` and enquiry delivery are configured; monitor renewals and the free submission quota.
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
Run `npm run test:quality` after a production build. Playwright starts an isolated production server on port 3110 and checks all public routes at 320, 375, 768 and 1440 pixels. It covers images, overflow, all axe findings, canonical URLs, internal links, keyboard navigation, API rejection cases and mocked delivery success/failure. Mocked delivery tests do not prove real email arrival. GitHub Actions repeats lint, build, runtime audit and browser checks.

## Remaining external launch requirements
- Monitor Formspree's free submission quota and export needed records before its history expires. A live enquiry was archived and forwarded to both personal addresses; Inbox versus Spam placement still needs owner confirmation. Manual company-address replies work through Zoho webmail, not Gmail "Send mail as".
- Vercel Hobby excludes commercial use. Do not buy an upgrade without approval: choose a commercial-use-eligible free hosting plan and test its Next.js support before migration.
- Confirm privacy retention, responsible staff access, genuine trainer credentials, approved photographs and attributable client feedback. Illustrative engagements are not completed projects; never invent results or endorsements.
- Keep registrar renewal reminders and account recovery/MFA up to date. Verify production environment contact details after each deployment.
- The full development dependency audit still reports a braces advisory through the Next ESLint plugin. npm currently offers no patched braces release; do not apply its proposed Next 14 downgrade. Runtime dependency audit is clean after the Next 16.3.8 update.
