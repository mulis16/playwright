import { expect, Page } from "@playwright/test";
import { keycloakConfig } from "./auth.config";
// move to POM
export async function loginWithKeycloak(
  page: Page,
  config: typeof keycloakConfig
): Promise<void> {
  const authUrl = `${config.keycloakUrl}/realms/${
    config.realm
  }/protocol/openid-connect/auth?client_id=${
    config.clientId
  }&redirect_uri=${encodeURIComponent(config.redirectUrl)}&response_type=${
    config.responseType
  }&scope=${config.scope}`;

  await page.goto(authUrl);
  await page.fill("#username", config.username);
  await page.fill("#password", config.password);

  await page.click("#kc-login");
  const locator = page.getByRole("button", { name: "E2e Tester" });
  await expect(locator).toBeVisible();
}
