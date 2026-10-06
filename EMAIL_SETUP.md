# ALRA enquiry and email setup

## Intended configuration

- Website hosting stays unchanged for this email task. Vercel Hobby's commercial-use restriction remains a separate unresolved issue.
- One Formspree form receives Contact, Corporate Training and HCD/TIP enquiries. Each record includes its page context, programme label and identifier, reference, received time and all enquiry fields.
- Notify the verified address `info@alratraining.com`, which forwards through ImprovMX to `adedureo@gmail.com` and `jesufemiadekunle@gmail.com`. Formspree's two linked-email slots include the existing account login email, leaving one slot for ALRA. Never accept a recipient address from a website visitor.
- Keep incoming `info@alratraining.com` mail forwarding through ImprovMX.
- SMTP2GO Free can provide authenticated outgoing replies through Gmail. It is not an inbox and is not automatically connected by the website code.
- Do not enable a trial, paid plan, paid integration or automatic upgrade.

## Formspree setup

1. Verify the account's email address and create an `ALRA website enquiries` form.
2. Configure and verify `info@alratraining.com`. Confirm its forwarding destinations and that the form's notification action is active. Test receipt in both Gmail inboxes.
3. Check spam/CAPTCHA settings. A server-to-server integration cannot silently solve an interactive CAPTCHA; test the actual configured form before enabling production.
4. Set the server-only environment variable `FORMSPREE_FORM_ID` to the ID at the end of `https://formspree.io/f/FORM_ID` in Vercel Production. Redeploy to apply it. Never use a `NEXT_PUBLIC_` variable for server configuration.
5. The API validates the enquiry, applies the existing honeypot and minimum fill time, then submits JSON with `Accept: application/json`. The visitor's `email` field supplies the reply-to address; `_subject` gives staff a readable notification title.
6. Provider errors, unconfirmed responses and network failures produce an error, preserving the visitor's draft for retry. Success means provider acceptance, not independently verified arrival in an inbox.

## Free-plan limits and operations

Formspree Free currently allows 50 submissions per month, two linked email addresses (including the account login email) and 30 days of submission history. All three website forms share the same allowance when sent to one endpoint. Tests also consume submissions.

Above the quota, Formspree stops normal processing and email notifications. It may retain submissions in an over-limit folder even when the submission experience appears successful. Do not treat an HTTP acceptance as proof of notification delivery. Monitor the quota and dashboard regularly; maintain direct email, phone and WhatsApp as alternatives. Export needed records before the history expires, then protect and delete exports according to the company's retention arrangements.

The quota cannot be reliably monitored from an individual submission response. Changing providers or purchasing capacity requires an explicit decision, not an automatic paid upgrade.

## Outgoing email setup

1. Sign up for SMTP2GO Free and complete any account review. Its current allowance is 1,000 messages monthly and 200 daily.
2. Verify `alratraining.com` using the exact DNS records shown in its dashboard. Preserve the existing website records and ImprovMX MX records. Do not create multiple SPF TXT records at the same hostname.
3. In each Gmail account, add `info@alratraining.com` under Settings > Accounts and Import > Send mail as, using SMTP2GO's authenticated SMTP server and TLS settings.
4. Keep passwords and SMTP credentials private. The account owner should enter credentials and complete confirmation steps. Separate SMTP users for each person make access revocation easier.
5. Test replies to an external inbox and inspect authentication results: SPF, DKIM and DMARC alignment. Verify the visible From address is `info@alratraining.com` and replies return through ImprovMX to both inboxes.
6. Agree which person handles each enquiry to avoid duplicate replies. Receiving forwarded messages does not create shared Sent folders or shared read status.

## Launch acceptance checklist

- Submit one clearly labelled website test from Contact; find the full record in Formspree and confirm notification receipt in both Gmail inboxes, including Spam.
- Verify Corporate and HCD/TIP contexts and programme preselection. Use local mocked tests for repeated checks to conserve the quota.
- Test invalid values, too-fast submission, honeypot, provider rejection, timeout, retained drafts and success clearing.
- Confirm mobile 320px/375px and desktop 1440px layouts, accessible error messages and no console errors.
- Send an authenticated reply as `info@alratraining.com`; confirm delivery and a reply arriving in both personal inboxes.
- Review privacy wording, authorised staff, storage outside Nigeria and deletion across provider history, exports and both inboxes. Do not invent a legal retention period.
- Record which external checks actually passed; account configuration alone does not prove mail delivery.

## Official references

- https://help.formspree.io/articles/account-management/account-limits
- https://help.formspree.io/articles/form-and-project-settings/over-limit-submissions
- https://support.smtp2go.com/hc/en-gb/articles/223087947-Free-Plan
- https://www.smtp2go.com/setupguide/gmail/
- https://vercel.com/docs/plans/hobby
