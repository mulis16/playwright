import { test as base } from "@playwright/test";
import { MapPage } from "../pages/map.page";

export type Pages = {
  mapPage: MapPage;
};

export const test = base.extend<Pages>({
  mapPage: async ({ page }, use) => {
    const mapPage = new MapPage(page);
    await use(mapPage);
  },
});

export { expect } from "@playwright/test";
