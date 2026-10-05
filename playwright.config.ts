import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  reporter: "line",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:3100",
    browserName: "chromium",
    launchOptions: {
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "mobile-320",
      use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 800 } },
    },
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } },
    },
  ],
});
