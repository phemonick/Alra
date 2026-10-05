import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/training",
  "/training/digital-skills-ict",
  "/training/drilling-engineering",
  "/training/subsea-engineering",
  "/training/automation-control",
  "/training/electrical-maintenance",
  "/training/instrumentation-maintenance",
  "/training/mechanical-maintenance",
  "/training/project-management",
  "/training/document-control",
  "/training/hse",
  "/training/ndt-levels-1-2-3",
  "/hcd-tip",
  "/corporate",
  "/contact",
  "/privacy",
];

type AxeResult = {
  violations: Array<{ id: string; impact: string | null; help: string; nodes: unknown[] }>;
};

test.describe("responsive quality", () => {
  for (const route of routes) {
    test(`${route} has sound layout, images and accessibility`, async ({ page }, testInfo) => {
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).toHaveTitle(/ALRA/);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.trim().length).toBeGreaterThanOrEqual(40);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("body")).not.toContainText(/HEROCK/i);

      const layout = await page.evaluate(() => ({
        viewport: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
      }));
      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewport);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(150);
      const failedImages = await page.locator("img").evaluateAll((images) =>
        images
          .filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0)
          .map((image) => (image as HTMLImageElement).currentSrc)
      );
      expect(failedImages).toEqual([]);

      await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
      const axe = await page.evaluate(async () => {
        const runner = (window as unknown as { axe: { run: () => Promise<AxeResult> } }).axe;
        return runner.run();
      });
      const highImpact = axe.violations.filter((item) => item.impact === "critical" || item.impact === "serious");
      expect(highImpact, JSON.stringify(highImpact, null, 2)).toEqual([]);

      const timing = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        return { load: navigation.loadEventEnd, domReady: navigation.domContentLoadedEventEnd };
      });
      expect(timing.domReady).toBeLessThan(3000);
      expect(timing.load).toBeLessThan(4000);

      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: testInfo.outputPath(`${name}-full-page.png`),
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});

test("site identity, discovery files and internal links are complete", async ({ page, request }) => {
  const discovered = new Set<string>();
  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href")).filter(Boolean) as string[]
    );
    for (const href of hrefs) discovered.add(href.split("?")[0].split("#")[0] || "/");
  }

  for (const href of discovered) {
    const response = await request.get(href);
    expect(response.status(), `${href} should resolve`).toBeLessThan(400);
  }

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of routes) expect(sitemap).toContain(route === "/" ? "<loc>" : route);
  expect(sitemap).not.toContain("/drafts");

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /drafts");
  expect((await request.get("/not-a-real-page")).status()).toBe(404);

  await page.goto("/");
  const organisation = await page.locator('script[type="application/ld+json"]').textContent();
  expect(organisation).toContain("ALRA TRAINING INSTITUTE LTD/GTE");
  expect(organisation).toContain("10 Journalist Estate Road");
  expect(organisation).toContain("+39 389 458 4635");

  await page.goto("/contact");
  const contactMain = page.locator("main");
  await expect(contactMain.getByRole("link", { name: "adedureo@gmail.com" })).toBeVisible();
  await expect(contactMain.getByRole("link", { name: "+39 389 458 4635" })).toHaveAttribute("href", "tel:+393894584635");
  await expect(contactMain.getByRole("link", { name: "Send us a WhatsApp message" })).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/393894584635\?text=/
  );
  await expect(contactMain.getByText("Monday–Friday, 8:00–17:00 (WAT)")).toBeVisible();
  await expect(contactMain.getByText(/10 Journalist Estate Road, Arepo, Ogun State, Nigeria/)).toBeVisible();
});

test("core interactions remain keyboard and touch friendly", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  }

  await page.getByText("Can training be delivered at our site?").click();
  await expect(page.getByText(/programmes can be configured for client sites/i)).toBeVisible();

  await page.goto("/training");
  if (await page.getByLabel("Filter by discipline").isVisible()) {
    await page.getByLabel("Filter by discipline").selectOption("Operations & Maintenance");
  } else {
    await page.getByRole("button", { name: "Operations & Maintenance" }).click();
  }
  await expect(page.getByText("Showing 3 of 11 programmes in Operations & Maintenance.")).toBeVisible();

  await page.goto("/contact");
  await page.getByRole("button", { name: "Submit enquiry" }).click();
  await expect(page.locator("#eq-name")).toBeFocused();
});
