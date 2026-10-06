import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  reporter: "line",
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:3110",
    browserName: "chromium",
    launchOptions: {
      executablePath: existsSync(chrome) ? chrome : undefined,
    },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3110",
    url: "http://127.0.0.1:3110",
    reuseExistingServer: false,
    timeout: 60000,
    env: { NEXT_PUBLIC_COMPANY_EMAIL: "info@alratraining.com", ENQUIRY_WEBHOOK_URL: "", FORMSPREE_FORM_ID: "" },
  },
  projects: [
    {
      name: "mobile-320",
      use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 800 } },
    },
    {
      name: "mobile-375",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
    },
    {
      name: "tablet-768",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 }, hasTouch: true },
    },
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } },
    },
  ],
});
