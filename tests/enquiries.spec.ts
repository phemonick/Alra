import { expect, test } from "@playwright/test";

const enquiry = {
  name: "Test Participant", company: "Test Organisation", email: "qa@example.com", phone: "",
  subject: "other", participants: "12", timing: "", message: "Please provide a technical training proposal for our team.", fillSeconds: 10,
};

test("production rejects invalid enquiries and never pretends unconfigured delivery succeeded", async ({ request }) => {
  expect((await request.post("/api/enquiries", { data: { ...enquiry, participants: "1.5" } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: { ...enquiry, phone: "letters" } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: { ...enquiry, subject: "unpublished" } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: { ...enquiry, fillSeconds: 0 } })).status()).toBe(429);
  expect((await request.post("/api/enquiries", { data: enquiry, headers: { origin: "https://untrusted.example" } })).status()).toBe(403);
  expect((await request.post("/api/enquiries", { data: "{", headers: { "content-type": "application/json" } })).status()).toBe(400);
  expect((await request.post("/api/enquiries", { data: enquiry })).status()).toBe(503);
  expect((await request.get("/drafts")).status()).toBe(404);
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  const redirect = await request.get("/contact?subject=other", { headers: { host: "www.alratraining.com" }, maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe("https://alratraining.com/contact?subject=other");
});

test("form preserves a failed enquiry and clears a successful draft", async ({ page }) => {
  await page.goto("/contact?subject=drilling-engineering");
  await expect(page.locator("#eq-subject")).toHaveValue("drilling-engineering");
  await page.locator("#eq-name").fill(enquiry.name);
  await page.locator("#eq-company").fill(enquiry.company);
  await page.locator("#eq-email").fill(enquiry.email);
  await page.locator("#eq-message").fill(enquiry.message);
  await page.route("**/api/enquiries", route => route.fulfill({ status: 502, json: { ok: false, error: "Test delivery unavailable." } }));
  await page.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Your entries have been kept");
  await page.reload();
  await expect(page.locator("#eq-name")).toHaveValue(enquiry.name);
  await page.unroute("**/api/enquiries");
  await page.route("**/api/enquiries", route => route.fulfill({ json: { ok: true } }));
  await page.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Enquiry received");
  expect(await page.evaluate(() => sessionStorage.getItem("alra-enquiry-draft:contact"))).toBeNull();
});

test("expired drafts and invalid programme query values are ignored", async ({ page }) => {
  await page.goto("/contact");
  await page.evaluate(() => sessionStorage.setItem("alra-enquiry-draft:contact", JSON.stringify({ savedAt: Date.now() - 86400001, values: { name: "Expired Person" } })));
  await page.goto("/contact?subject=unpublished");
  await expect(page.locator("#eq-name")).toHaveValue("");
  await expect(page.locator("#eq-subject")).toHaveValue("other");
  await page.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(page.locator("#eq-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#eq-name")).toHaveAttribute("aria-describedby", "eq-name-error");
});

test("corporate and HCD forms preserve their own subjects and draft boundaries", async ({ page }) => {
  for (const [path, subject] of [["/corporate", "corporate"], ["/hcd-tip", "hcd-tip"]]) {
    await page.goto(path);
    await expect(page.locator("#eq-subject")).toHaveValue(subject);
    await expect(page.locator("#eq-name")).toHaveValue("");
    await page.locator("#eq-name").fill(`Test ${subject}`);
    await page.reload();
    await expect(page.locator("#eq-name")).toHaveValue(`Test ${subject}`);
  }
});
