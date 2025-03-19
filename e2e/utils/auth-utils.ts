import { expect, Page } from "@playwright/test";

import { keycloakConfig } from "../config/auth.config";

export async function loginWithKeycloak(
  page: Page,
  config: typeof keycloakConfig
): Promise<void> {
  // Navigate directly to the full Keycloak authentication URL
  const authUrl = `${config.keycloakUrl}/realms/${
    config.realm
  }/protocol/openid-connect/auth?client_id=${
    config.clientId
  }&redirect_uri=${encodeURIComponent(config.redirectUrl)}&response_type=${
    config.responseType
  }&scope=${config.scope}`;

  await page.goto(authUrl);

  // Fill in login credentials
  await page.fill("#username", config.username);
  await page.fill("#password", config.password);

  // Submit the form
  await page.click("#kc-login");
  const locator = page.getByRole("button", { name: "E2e Tester" });
  await expect(locator).toBeVisible();
  // Wait for navigation to complete after successful login
}
