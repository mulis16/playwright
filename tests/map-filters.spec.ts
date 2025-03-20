import { test, expect } from "@playwright/test";
import { MapPage } from "../pages/map.page";

let mapPage: MapPage;
test.describe("Map - Filters", () => {
  test.beforeEach(async ({ page }) => {
    mapPage = new MapPage(page);
    await mapPage.goto();
  });

  test("show more/show less button functionality", async () => {
    mapPage.assertDrawerClosed();

    await mapPage.filtersNavigationItemButton.click();
    await mapPage.assertFiltersDrawerOpened();

    await mapPage.assertDefaultCropsOptions();
    await mapPage.assertDefaultOperationsOptions();
    await mapPage.assertDefaultMonitoringOptions();

    await mapPage.cropsShowMoreButton.click();
    await expect(mapPage.speltCropOption).toBeVisible();

    await mapPage.showLessButton.click();
    await expect(mapPage.speltCropOption).not.toBeVisible();

    await mapPage.operationsShowMoreButton.click();
    await expect(mapPage.harvestOption).toBeVisible();

    await mapPage.showLessButton.click();
    await expect(mapPage.harvestOption).not.toBeVisible();

    await mapPage.monitoringShowMoreButton.click();
    await expect(mapPage.soilEvaluationOption).toBeVisible();

    await mapPage.showLessButton.click();
    await expect(mapPage.soilEvaluationOption).not.toBeVisible();
  });

  test("verify Add filter elements are present in dropdown", async () => {
    mapPage.assertDrawerClosed();

    await mapPage.filtersNavigationItemButton.click();
    await mapPage.addFilterButton.click();
    await mapPage.assertAddFilterDropdownElements();
  });
});

test.describe("Map - Display options", () => {
  test.beforeEach(async ({ page }) => {
    mapPage = new MapPage(page);
    await mapPage.goto();
  });

  test("switching between RGB and NDVI shows/hides the scale", async () => {
    mapPage.assertDrawerClosed();
    await mapPage.displayOptionsNavigationItemButton.click();
    await mapPage.assertDisplayOptionsDrawerOpened();

    await mapPage.ndviDroneOption.click();
    await expect(mapPage.ndviDroneOption).toBeChecked();
    await expect(mapPage.scaleContainer).toBeVisible();

    await mapPage.rgbDroneOption.click();
    await expect(mapPage.rgbDroneOption).toBeChecked();
    await expect(mapPage.scaleContainer).not.toBeVisible();
  });

  test("assert that counter shows 2 when “NDVI drone” and “Weather stations” selected", async () => {
    mapPage.assertDrawerClosed();
    await mapPage.displayOptionsNavigationItemButton.click();
    await mapPage.assertDisplayOptionsDrawerOpened();

    await mapPage.ndviDroneOption.click();
    await expect(mapPage.displayOptionsCounter).toHaveText("1");

    await mapPage.weatherStationsOption.click();
    await expect(mapPage.displayOptionsCounter).toHaveText("2");
  });
});
