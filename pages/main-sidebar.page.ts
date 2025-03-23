import { BasePage } from "./base.page";
import { expect, Page } from "@playwright/test";

export class MainSidebarPage extends BasePage {
  public readonly filtersNavigationItemButton =
    this.getNavigationItem("Filters");
  public readonly displayOptionsNavigationItemButton =
    this.getNavigationItem("Display options");
  public readonly warehouseNavigationItemButton = this.getByText("Warehouse");
  public readonly receiveOrdersNavigationItemButton =
    this.getNavigationItem("Receive orders");

  constructor(page: Page) {
    super(page);
  }
}
