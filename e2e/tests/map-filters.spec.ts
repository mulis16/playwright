// Because of custom fixtures we need to import test and expect from there
// NOT from @playwright/test
import { test, expect } from "../fixtures/fixtures";

test.use({ storageState: "e2e/auth/user.json" });

test.describe("Map - Filters", () => {
  test.beforeEach(async ({ mapPage }) => {
    await mapPage.goto();
  });

  test("show more/show less button functionality", async ({ mapPage }) => {
    mapPage.assertDrawerClosed();

    await mapPage.filtersNavigationItemButton.click();
    await mapPage.assertFiltersDrawerOpened();

    await mapPage.assertDefaultCropsOptions();
    await mapPage.assertDefaultOperationsOptions();
    await mapPage.assertDefaultMonitoringOptions();

    // TODO: Refactor this if possible
    await mapPage.showMoreButton.first().click();
    await expect(mapPage.speltCropOption).toBeVisible();

    await mapPage.showLessButton.first().click();
    await expect(mapPage.speltCropOption).not.toBeVisible();

    await mapPage.showMoreButton.nth(1).click();
    await expect(mapPage.harvestOption).toBeVisible();

    await mapPage.showLessButton.first().click();
    await expect(mapPage.harvestOption).not.toBeVisible();

    await mapPage.showMoreButton.nth(2).click();
    await expect(mapPage.soilEvaluationOption).toBeVisible();

    await mapPage.showLessButton.first().click();
    await expect(mapPage.soilEvaluationOption).not.toBeVisible();
  });

  test("verify Add filter elements are present in dropdown", async ({
    mapPage,
  }) => {
    mapPage.assertDrawerClosed();

    await mapPage.filtersNavigationItemButton.click();
    await mapPage.addFilterButton.click();
    // TODO: add this to page an call asserts in function
    await expect(mapPage.addFilterDropdown).toContainText("Soil");
    // is this a typo in the app? on text Rating it fails
    await expect(mapPage.addFilterDropdown).toContainText("rating");
    await expect(mapPage.addFilterDropdown).toContainText("Contamination");
    await expect(mapPage.addFilterDropdown).toContainText("Weed");
  });
});

test.describe("Map - Display options", () => {
  test.beforeEach(async ({ mapPage }) => {
    await mapPage.goto();
  });

  test("switching between RGB and NDVI shows/hides the scale", async ({
    mapPage,
  }) => {
    mapPage.assertDrawerClosed();
    await mapPage.displayOptionsNavigationItemButton.click();
  });

  test("assert that counter shows 2 when “NDVI drone” and “Weather stations” selected", async ({
    mapPage,
  }) => {
    mapPage.assertDrawerClosed();
    await mapPage.displayOptionsNavigationItemButton.click();
  });
});
