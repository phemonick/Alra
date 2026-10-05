import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().min(1).max(120),
  participants: z.string().trim().max(12).optional().default(""),
  timing: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(20).max(5000),
  context: z.string().trim().max(60).optional().default("general"),
  website: z.string().max(200).optional().default(""), // honeypot
  fillSeconds: z.number().optional().default(999),
});

async function forwardToWebhook(url: string, record: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Enquiry endpoint returned ${response.status}`);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { ok: false, error: "Please check the highlighted fields and try again." },
        { status: 400 }
      );
    }
    const v = parsed.data;

    // Spam protection: honeypot + minimum fill time
    if (v.website && v.website.length > 0) {
      // Pretend success to spambots
      return Response.json({ ok: true });
    }
    const minFill = Number(process.env.ENQUIRY_MIN_FILL_SECONDS || "4");
    if ((v.fillSeconds ?? 999) < minFill) {
      return Response.json(
        { ok: false, error: "That was very fast — please take a moment to review your enquiry and resend." },
        { status: 429 }
      );
    }
    if (v.phone && v.phone.replace(/\D/g, "").length > 0 && v.phone.replace(/\D/g, "").length < 7) {
      return Response.json({ ok: false, error: "Please check the phone number." }, { status: 400 });
    }

    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      receivedAt: new Date().toISOString(),
      ...v,
      website: undefined,
    };

    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      await forwardToWebhook(webhookUrl, record as Record<string, unknown>);
    } else if (process.env.NODE_ENV === "production") {
      return Response.json(
        { ok: false, error: "Online enquiry delivery is being configured. Please email us directly for now." },
        { status: 503 }
      );
    } else {
      // Local development only: one file per enquiry avoids read/modify/write races.
      const dir = path.join(process.cwd(), "data", "enquiries");
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, `${record.id}.json`), JSON.stringify(record, null, 2), "utf8");
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "We could not deliver your enquiry. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
