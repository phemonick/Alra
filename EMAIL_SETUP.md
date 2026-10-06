# ALRA enquiry and email setup

## Verified configuration (6 October 2026)

- Production website test reference: `0748c123-4e73-41c0-b7ce-0de07e83e5f5`, received at `2026-10-06T09:51:47.773Z`. The archived Formspree record contains Drilling Engineering, 12 participants, Contact context and the complete enquiry message.
- ImprovMX logs show Gmail accepted notification copies for both personal addresses. The owner also supplied the received Formspree notification. Inbox versus Spam placement in both accounts has not been independently confirmed.
- A separate test sent from the existing Zoho mailbox as `info@alratraining.com` appears in Sent, and the owner confirmed receipt. Professional replies can be sent from Zoho webmail; Gmail "Send mail as" has not been configured.
- SMTP2GO registration returned "Error code 3 - Service unavailable". No SMTP2GO account or sending configuration was completed; use the working Zoho mailbox instead.
- Code commit `949b473` passed 112 local browser checks and GitHub Actions run `37445502812`; its Vercel production deployment was ready before the live submission.
- No paid plan, subscription or DNS change was enabled during this setup. The existing Zoho subscription status is not newly verified here.

## Configuration

- Website hosting stays unchanged for this email task. Vercel Hobby's commercial-use restriction remains a separate unresolved issue.
- One Formspree form receives Contact, Corporate Training and HCD/TIP enquiries. Each record includes its page context, programme label and identifier, reference, received time and all enquiry fields.
- Notify the verified address `info@alratraining.com`, which forwards through ImprovMX to `adedureo@gmail.com` and `jesufemiadekunle@gmail.com`. Formspree's two linked-email slots include the existing account login email, leaving one slot for ALRA. Never accept a recipient address from a website visitor.
- Keep incoming `info@alratraining.com` mail forwarding through ImprovMX.
- Staff send professional replies using the existing Zoho webmail mailbox. Forwarded Gmail notifications do not themselves enable sending as the company address.
- Do not enable a trial, paid plan, paid integration or automatic upgrade.

## Formspree setup

1. Verify the account's email address and create an `ALRA website enquiries` form.
2. Configure and verify `info@alratraining.com`. Confirm its forwarding destinations and that the form's notification action is active. Test receipt in both Gmail inboxes.
3. Check spam/CAPTCHA settings. A server-to-server integration cannot silently solve an interactive CAPTCHA; test the actual configured form before enabling production.
4. Set the server-only environment variable `FORMSPREE_FORM_ID` to the ID at the end of `https://formspree.io/f/FORM_ID` in Vercel Production. Redeploy to apply it. Never use a `NEXT_PUBLIC_` variable for server configuration.
5. The API validates the enquiry, applies the existing honeypot and minimum fill time, then submits JSON with `Accept: application/json`. The visitor's `email` field supplies the reply-to address; the programme label supplies a readable subject, with `_subject` also included.
6. Provider errors, unconfirmed responses and network failures produce an error, preserving the visitor's draft for retry. Success means provider acceptance, not independently verified arrival in an inbox.

## Free-plan limits and operations

Formspree Free currently allows 50 submissions per month, two linked email addresses (including the account login email) and 30 days of submission history. All three website forms share the same allowance when sent to one endpoint. Tests also consume submissions.

Above the quota, Formspree stops normal processing and email notifications. It may retain submissions in an over-limit folder even when the submission experience appears successful. Do not treat an HTTP acceptance as proof of notification delivery. Monitor the quota and dashboard regularly; maintain direct email, phone and WhatsApp as alternatives. Export needed records before the history expires, then protect and delete exports according to the company's retention arrangements.

The quota cannot be reliably monitored from an individual submission response. Changing providers or purchasing capacity requires an explicit decision, not an automatic paid upgrade.

## Outgoing email operation

1. Open the existing Zoho webmail account and compose from `info@alratraining.com`.
2. Address the reply to the visitor's email in the enquiry, not Formspree's notification sender. Check the recipient before sending.
3. Keep incoming mail forwarding through ImprovMX to both personal inboxes. Do not replace the MX records to enable outgoing replies.
4. Agree which authorised person handles each enquiry to avoid duplicate replies. Forwarding does not create shared read status in Gmail. Keep account credentials private and use available MFA.
5. Outgoing delivery was tested, but full message-header SPF/DKIM/DMARC alignment and Inbox placement are not recorded as verified. Inspect these if delivery problems arise.
6. Gmail "Send mail as", automated acknowledgements and SMTP2GO remain unconfigured. No additional paid service is required for the verified manual Zoho reply workflow; confirm the existing mailbox's plan and limits before changing it.

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
