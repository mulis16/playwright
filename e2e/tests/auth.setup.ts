import { test as setup } from "@playwright/test";
import { loginWithKeycloak } from "../utils/auth-utils";
import fs from "fs";
import path from "path";
import { keycloakConfig } from "../config/auth.config";

const authFile = path.join(process.cwd(), "e2e", "auth", "user.json");

setup("authenticate", async ({ page }) => {
  // Make sure the directory exists
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  // Log in with Keycloak
  await loginWithKeycloak(page, keycloakConfig);

  // Save the authentication state
  await page.context().storageState({ path: authFile });
});
