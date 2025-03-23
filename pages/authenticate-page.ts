import { expect, Page } from "@playwright/test";
import { keycloakConfig } from "../utils/auth.config";

import { BasePage } from "./base.page";

export class AuthenticatePage extends BasePage {
  private readonly usernameInput = this.page.locator("#username");
  private readonly passwordInput = this.page.locator("#password");

  public readonly loginButton = this.page.locator("#kc-login");
  public readonly userNameProfileButton = this.page.getByRole("button", {
    name: "E2e Tester",
  });

  constructor(page: Page) {
    super(page);
  }

  async navigateToAuthPage(config: typeof keycloakConfig): Promise<void> {
    const authUrl = `${config.keycloakUrl}/realms/${
      config.realm
    }/protocol/openid-connect/auth?client_id=${
      config.clientId
    }&redirect_uri=${encodeURIComponent(config.redirectUrl)}&response_type=${
      config.responseType
    }&scope=${config.scope}`;

    await this.page.goto(authUrl);
  }

  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }
}
