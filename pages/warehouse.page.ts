import { BasePage } from "./base.page";
import { expect, Page } from "@playwright/test";

export class WarehousePage extends BasePage {
  // receive orders locators
  public readonly receiveOrdersHeading =
    this.getHeadingByText("Receive orders");
  private readonly newOrderButton = this.getByText("NEW ORDER");
  private readonly receiveFromHarvestButton = this.page.locator(
    ".v-list-item__title",
    { hasText: "Receive from harvest" }
  );
  private readonly tableHeaderRootLocator = this.page.locator(".table__head");
  private readonly typeFilter = this.tableHeaderRootLocator.locator(
    'button[test-filter-btn="TYPE"]'
  );
  private readonly statusFilter = this.tableHeaderRootLocator.locator(
    'button[test-filter-btn="STATUS"]'
  );
  private readonly positionFilter = this.tableHeaderRootLocator.locator(
    'button[test-filter-btn="POSITIONS"]'
  );
  private readonly filterByTypeText = this.getByText("Filter by TYPE");
  private readonly filterByStatusText = this.getByText("Filter by STATUS");
  private readonly filterByPositionText = this.getByText("Filter by POSITIONS");
  private readonly receiveFromHarvestTypeFilter = this.page.locator(
    '[test-filter-checkbox-option="Receive from harvest"]'
  );
  private readonly todoStatusFilter = this.page.locator(
    '[test-filter-checkbox-option="To-Do"]'
  );
  private readonly durumPsenicaOrganicPosition = this.page.locator(
    '[test-filter-checkbox-option="Durum Pšenica, Organic"]'
  );
  private readonly applyFilterButton = this.getByText("Apply");
  private readonly firstElementInReceiveOrdersTable = this.page
    .locator(".table__row")
    .first();
  private readonly markAsCancelledButton = this.page.locator(
    "div.v-list-item__title",
    { hasText: "Mark as Cancelled" }
  );

  // side panel locators
  private readonly sidePanelRootElement = this.page.locator(
    "div[test-action-side-panel]"
  );
  private readonly newReceiveFromHarvestText =
    this.sidePanelRootElement.locator(".action-bar__header", {
      hasText: "NEW RECEIVE FROM HARVEST",
    });
  private readonly toLocationDropdown = this.sidePanelRootElement.locator(
    "div[test-to-location-dropdown]"
  );
  private readonly toLocatioDropdownOpened = this.sidePanelRootElement.locator(
    ".action-bar__dropdown"
  );
  private readonly mosorinDropdownOption = this.sidePanelRootElement.locator(
    ".v-list-item__title",
    { hasText: "Mošorin" }
  );
  private readonly expectedDeliveryDate =
    this.sidePanelRootElement.locator(".date-picker");
  private readonly expectedDeliveryDateDropdown = this.page.locator(
    ".v-date-picker-table--date"
  );
  private readonly addPostitionButton =
    this.sidePanelRootElement.getByText("ADD POSITION");
  private readonly addItemDropdown = this.page.locator("input[placeholder='']");
  private readonly durumPsenicaOrganicOption =
    this.sidePanelRootElement.getByText("Durum Pšenica, Organic");
  private readonly quantityInput = this.sidePanelRootElement.locator(
    'input[test-number-quantity="0"]'
  );
  private readonly confirmButton =
    this.sidePanelRootElement.getByText("Confirm");
  private readonly dateInDatePicker = (date: string) => {
    return this.page.getByRole("button", { name: date });
  };

  constructor(page: Page) {
    super(page);
  }

  async tomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  async assertFilterOptionSelected(optionName: string) {
    const filterOption = this.getFilterOption(optionName);
    await expect(filterOption).toHaveAttribute("aria-selected", "true");
  }

  async createReceiveFromHarvestOrder() {
    const getNumberOfTheDayFromDate = (await this.tomorrowDate())
      .split(" ")[1]
      .replace(",", "");
    await this.newOrderButton.click();
    await this.receiveFromHarvestButton.click();
    await expect(this.newReceiveFromHarvestText).toBeVisible();
    await this.toLocationDropdown.click();
    await expect(this.toLocatioDropdownOpened).toBeVisible();
    await this.mosorinDropdownOption.click();
    await expect(this.toLocationDropdown).toContainText("Mošorin");
    await this.expectedDeliveryDate.click();
    await expect(this.expectedDeliveryDateDropdown).toBeVisible();
    await this.dateInDatePicker(getNumberOfTheDayFromDate).click();
    await expect(this.expectedDeliveryDate).toContainText(
      await this.tomorrowDate()
    );
    await this.addPostitionButton.click();
    await this.addItemDropdown.click();
    await this.durumPsenicaOrganicOption.click();
    await this.quantityInput.fill("100");
    await this.confirmButton.click();
  }

  async filterByReceiveFromHarvestType() {
    await this.typeFilter.click();
    await expect(this.filterByTypeText).toBeVisible();
    await this.getFilterOption("Receive from harvest").click();
    await this.assertFilterOptionSelected("Receive from harvest");
    await this.applyFilterButton.click();
  }

  async filterByToDoStatus() {
    await this.statusFilter.click();
    await expect(this.filterByStatusText).toBeVisible();
    await this.getFilterOption("To-Do").click();
    await this.assertFilterOptionSelected("To-Do");
    await this.applyFilterButton.click();
  }

  async filterByDurumPsenicaOrganicPosition() {
    await this.positionFilter.click();
    await expect(this.filterByPositionText).toBeVisible();
    await this.getFilterOption("Durum Pšenica, Organic").click();
    await this.assertFilterOptionSelected("Durum Pšenica, Organic");
    await this.applyFilterButton.click();
  }

  async validateOrder(status: string) {
    await expect(this.firstElementInReceiveOrdersTable).toContainText(
      "Receive from harvest"
    );
    await expect(this.firstElementInReceiveOrdersTable).toContainText(
      "LOGIN EKO DOO"
    );
    await expect(this.firstElementInReceiveOrdersTable).toContainText(
      `Mošorin ${await this.tomorrowDate()}`
    );
    await expect(this.firstElementInReceiveOrdersTable).toContainText(status);
    await expect(this.firstElementInReceiveOrdersTable).toContainText(
      "Durum Pšenica, Organic"
    );
  }

  async markOrderAsCancelled() {
    await this.firstElementInReceiveOrdersTable.click({ button: "right" });
    await expect(this.markAsCancelledButton).toBeVisible();
    await this.markAsCancelledButton.click();
  }
}
