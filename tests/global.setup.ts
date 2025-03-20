import { test as setup } from "@playwright/test";
import { loginWithKeycloak } from "../utils/auth-utils";
import { keycloakConfig } from "../utils/auth.config";
import fs from "fs";
import path from "path";

const ensureTmpFolderExists = () => {
  const tmpDir = path.join(__dirname, "..", ".tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const userJsonPath = path.join(tmpDir, "user.json");
  if (fs.existsSync(userJsonPath)) {
    fs.unlinkSync(userJsonPath);
    console.log("Deleted existing user.json file");
  }
};

ensureTmpFolderExists();

setup("authenticate", async ({ page }) => {
  const authFile = path.join(process.cwd(), ".tmp", "user.json");
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  await loginWithKeycloak(page, keycloakConfig);
  await page.context().storageState({ path: authFile });
});
