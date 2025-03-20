import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "https://app.e2e.gcp.logineko.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
      testDir: ".",
      use: {
        headless: !!process.env.CI,
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".tmp/user.json",
        headless: !!process.env.CI,
      },
      dependencies: ["setup"],
    },
  ],
});
