# Website Verification

Review date: 6 October 2026.

## Results

Lint and production build passed. The Formspree integration run passed all 112 Playwright checks across four viewports. The earlier runtime `npm audit --omit=dev` reported zero vulnerabilities; this integration adds no dependencies.

The final local Lighthouse 13.5.0 homepage run recorded:

| Check | Mobile | Desktop |
| --- | --- | --- |
| Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 2.3 s | 0.7 s |
| Cumulative Layout Shift | 0 | 0 |

Scores vary between runs; these are lab measurements, not a production field-data guarantee.

## Scope

- Production Next.js build, not development-mode performance.
- 18 public routes across Chromium viewports at 320, 375, 768 and 1440 pixels.
- Additional homepage layout spot checks at 1024 and 1280 pixels.
- Images, horizontal overflow, heading hierarchy, all axe findings, canonical URLs, sitemap, robots, public contact details and internal links.
- Catalogue filtering and empty results; mobile menu Escape and focus return.
- Enquiry validation, programme preselection, expired drafts, form-specific draft isolation, simulated delivery success and failure, and cleared successful drafts.
- Real API checks for malformed data, unsupported subjects, fractional participant counts, invalid phone numbers, cross-origin requests, minimum fill time and unconfigured production delivery.
- Production draft-page 404, security headers and permanent www-to-apex redirects preserving paths and queries.

## Repeat

Use Node 20.9 or newer (GitHub Actions uses Node 22):

```sh
npm ci
npm run lint
npm run build
npm audit --omit=dev
npm run test:quality
```

Playwright manages a production test server on port 3110. On macOS it uses installed Chrome; elsewhere install Chromium with `npx playwright install --with-deps chromium`. Screenshots, traces on failure and navigation timings are retained under git-ignored `test-results/`. GitHub Actions runs the same checks and uploads artifacts.

## Limits And Follow-Up

- Lighthouse measurements are local lab checks of the homepage, not field Core Web Vitals or a guarantee for all devices, networks or browsers. Real iOS/Safari and Android device testing remains useful.
- Mocked form delivery proves UI/API handling, not actual email arrival. Formspree is configured to notify verified `info@alratraining.com`, which forwards to both Gmail inboxes. Production environment configuration is set; deployment and real submission/receipt verification must be recorded separately before treating the enquiry workflow as launch-ready. The isolated test server deliberately has delivery configuration unset to test honest 503 responses.
- Formspree tests cover all three page contexts, complete field forwarding, readable programme labels, malformed endpoints, HTTP rejection, rate limits, invalid receipts and network failure. Free-plan over-limit acceptance does not guarantee notification delivery; see `EMAIL_SETUP.md`.
- Honeypot and fill-time checks are basic spam deterrents, not a durable distributed rate limiter. Review provider abuse controls before activating delivery.
- Runtime dependencies audit clean after upgrading Next to 16.3.8 and source-map-js. Development-only tooling still has a braces advisory through the Next ESLint plugin; npm currently has no patched braces release. Its suggested Next 14 downgrade is not an appropriate fix.
- Confirm actual privacy retention, authorised staff access and account recovery arrangements with the business.
- Publish only approved trainer credentials, real client endorsements, completed-project evidence and consented company photography. Current imagery and engagement examples are illustrative.
- Vercel Hobby is restricted to non-commercial use: https://vercel.com/docs/plans/hobby. A commercial-use-eligible free host is needed if the account remains on Hobby. Do not activate a paid plan or alter domain/email DNS as part of this code update.

Automated passes indicate the checked behaviours worked in the test environment. They do not mean every possible issue is resolved or that the site holds an external accessibility certification.
