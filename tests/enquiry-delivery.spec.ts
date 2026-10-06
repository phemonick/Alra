import { expect, test } from "@playwright/test";
import { deliverToFormspree } from "../src/lib/enquiry-delivery";
import { POST } from "../src/app/api/enquiries/route";

const record = {
  id: "test-reference", receivedAt: "2026-10-06T12:00:00Z", context: "contact",
  name: "Test Participant", company: "Test Organisation", email: "qa@example.com",
  phone: "+2349065188808", subject: "drilling-engineering", participants: "12",
  timing: "Contact us for details", message: "Please provide a technical training proposal for our team.",
};

test("Formspree receives the complete enquiry and a usable reply-to field", async () => {
  let sent = false;
  const send: typeof fetch = async (url, options) => {
    sent = true;
    expect(url).toBe("https://formspree.io/f/abcdefgh");
    expect(options?.headers).toEqual({ "Content-Type": "application/json", Accept: "application/json" });
    expect(options?.redirect).toBe("error");
    const body = JSON.parse(String(options?.body));
    expect(body.email).toBe(record.email);
    expect(body.programmeId).toBe(record.subject);
    expect(body.subject).toContain("Drilling");
    expect(body._subject).toContain("ALRA training enquiry");
    for (const key of ["id", "receivedAt", "context", "name", "company", "phone", "participants", "timing", "message"]) {
      expect(body[key]).toBe(record[key as keyof typeof record]);
    }
    expect(body).not.toHaveProperty("website");
    return Response.json({ ok: true });
  };
  await deliverToFormspree("abcdefgh", record, send);
  expect(sent).toBe(true);
});

test("misconfigured Formspree destinations cannot send data", async () => {
  const send: typeof fetch = async () => { throw new Error("Must not send"); };
  for (const id of ["", "https://untrusted.example/f/abc", "../abc", "abc def"]) {
    await expect(deliverToFormspree(id, record, send)).rejects.toMatchObject({ status: 503 });
  }
});

test("Formspree failures never become success", async () => {
  for (const status of [400, 403, 404, 422, 429, 500, 503]) {
    await expect(deliverToFormspree("abcdefgh", record, async () => Response.json({ error: "failure" }, { status })))
      .rejects.toMatchObject({ status: status === 429 ? 429 : 502 });
  }
  for (const body of [{ ok: false }, {}, { ok: "true" }]) {
    await expect(deliverToFormspree("abcdefgh", record, async () => Response.json(body))).rejects.toMatchObject({ status: 502 });
  }
  await expect(deliverToFormspree("abcdefgh", record, async () => new Response("<html>Not a receipt</html>"))).rejects.toThrow();
  await expect(deliverToFormspree("abcdefgh", record, async () => { throw new DOMException("timeout", "TimeoutError"); })).rejects.toThrow();
});

test("the website API forwards each form context and rejects provider failures", async () => {
  const originalFetch = globalThis.fetch;
  const originalId = process.env.FORMSPREE_FORM_ID;
  process.env.FORMSPREE_FORM_ID = "abcdefgh";
  const request = (context: string, website = "") => new Request("https://alratraining.com/api/enquiries", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: "https://alratraining.com" },
    body: JSON.stringify({ ...record, context, website, fillSeconds: 10 }),
  });
  try {
    for (const context of ["contact", "corporate", "hcd-tip"]) {
      globalThis.fetch = async (_url, options) => {
        const body = JSON.parse(String(options?.body));
        expect(body.context).toBe(context);
        expect(body.email).toBe(record.email);
        expect(body.id).toMatch(/^[a-f0-9-]{36}$/);
        return Response.json({ ok: true });
      };
      const response = await POST(request(context));
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ ok: true });
    }
    globalThis.fetch = async () => Response.json({ error: "Private provider diagnostic" }, { status: 429 });
    const limited = await POST(request("contact"));
    expect(limited.status).toBe(429);
    expect(await limited.text()).not.toContain("Private provider diagnostic");
    globalThis.fetch = async () => { throw new Error("Private network diagnostic"); };
    const failed = await POST(request("contact"));
    expect(failed.status).toBe(500);
    expect(await failed.text()).not.toContain("Private network diagnostic");
    const honeypot = await POST(request("contact", "spam.example"));
    expect(honeypot.status).toBe(200);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalId === undefined) delete process.env.FORMSPREE_FORM_ID;
    else process.env.FORMSPREE_FORM_ID = originalId;
  }
});
