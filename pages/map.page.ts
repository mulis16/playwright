import { BasePage } from "./base.page";
import { expect, Page } from "@playwright/test";

export class MapPage extends BasePage {
  drawerClosed = /drawer--close/;
  drawerOpened = /drawer--open/;

  private readonly menuSidebar = this.page.locator(".map-sidebar");
  // TODO: move this two locators somewhere else
  public readonly filtersNavigationItemButton =
    this.getNavigationItem("Filters");
  public readonly displayOptionsNavigationItemButton =
    this.getNavigationItem("Display options");

  private readonly filtersHeading = this.page.locator(".header-container", {
    hasText: "Filters",
  });
  public readonly showMoreButton = this.getByText("Show more");
  public readonly showLessButton = this.getByText("Show less");

  // Crops
  private readonly cropsHeading = this.getHeadingByText("Crops");
  private readonly oatsCropOption = this.getByText("Oats");
  private readonly wheatCropOption = this.getByText("Wheat");
  private readonly peasCropOption = this.getByText("Peas");
  private readonly barrenCropOption = this.getByText("Barren");
  private readonly flaxCropOption = this.getByText("Flax");
  public readonly speltCropOption = this.getByText("Spelt");
  // Operations
  private readonly operationsHeading = this.getHeadingByText("Operations");
  private readonly plantMaterialSamplingOption = this.getByText(
    "Plant material sampling"
  );
  private readonly otherOption = this.getByText("Other");
  private readonly tillageOption = this.page.getByText("Tillage", {
    exact: true,
  });
  private readonly sowingOption = this.getByText("Sowing");
  private readonly mechanicalOption = this.getByText("Mechanical");
  public readonly harvestOption = this.getByText("Harvest");
  // Monitoring
  private readonly monitoringHeading = this.getHeadingByText("Monitoring");
  private readonly multiSpectralImagingOption = this.getByText(
    "Multi-spectral Imaging"
  );
  private readonly rgbImagingOption = this.getByText("RGB Imaging");
  private readonly cropEvaluationOption = this.getByText("Crop evaluation");
  private readonly weedsPestsDiseasesOption = this.getByText(
    "Weeds, pests and diseases"
  );
  private readonly soilEvaluationTillageOption = this.getByText(
    "Soil evaluation (Tillage review)"
  );
  public readonly soilEvaluationOption = this.page.getByText(
    "Soil evaluation",
    { exact: true }
  );

  public readonly addFilterButton = this.getByText("Add filter");
  public readonly addFilterDropdown = this.page.getByRole("menu");
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("/logineko/map");
    await this.page.waitForLoadState("networkidle");
  }

  async assertDrawerClosed() {
    await expect(this.menuSidebar).toHaveClass(this.drawerClosed);
    await expect(this.menuSidebar).not.toHaveClass(this.drawerOpened);
  }

  async assertFiltersDrawerOpened() {
    await expect(this.menuSidebar).toHaveClass(this.drawerOpened);
    await expect(this.menuSidebar).not.toHaveClass(this.drawerClosed);
    await expect(this.filtersHeading).toBeVisible();
    await expect(this.cropsHeading).toBeVisible();
    await expect(this.operationsHeading).toBeVisible();
    await expect(this.monitoringHeading).toBeVisible();
  }

  async assertDefaultCropsOptions() {
    await expect(this.oatsCropOption).toBeVisible();
    await expect(this.wheatCropOption).toBeVisible();
    await expect(this.peasCropOption).toBeVisible();
    await expect(this.barrenCropOption).toBeVisible();
    await expect(this.flaxCropOption).toBeVisible();
  }

  async assertDefaultOperationsOptions() {
    await expect(this.plantMaterialSamplingOption).toBeVisible();
    await expect(this.otherOption).toBeVisible();
    await expect(this.tillageOption).toBeVisible();
    await expect(this.sowingOption).toBeVisible();
    await expect(this.mechanicalOption).toBeVisible();
  }

  async assertDefaultMonitoringOptions() {
    await expect(this.multiSpectralImagingOption).toBeVisible();
    await expect(this.rgbImagingOption).toBeVisible();
    await expect(this.cropEvaluationOption).toBeVisible();
    await expect(this.weedsPestsDiseasesOption).toBeVisible();
    await expect(this.soilEvaluationTillageOption).toBeVisible();
  }
}
