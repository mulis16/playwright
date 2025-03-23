import { expect, Page } from "@playwright/test";
import { keycloakConfig } from "./auth.config";
import { AuthenticatePage } from "../pages/authenticate-page";

export async function loginWithKeycloak(
  page: Page,
  config: typeof keycloakConfig
): Promise<void> {
  const authPage = new AuthenticatePage(page);

  await authPage.navigateToAuthPage(config);
  await authPage.fillCredentials(config.username, config.password);
  await authPage.loginButton.click();
  await expect(authPage.userNameProfileButton).toBeVisible();
}
