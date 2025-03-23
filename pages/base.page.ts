import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  protected getByText(text: string) {
    return this.page.getByText(text);
  }

  protected getNavigationItem(name: string) {
    return this.page.locator(`[test-navigation-item="${name}"]`);
  }

  protected getHeadingByText(text: string) {
    return this.page.getByRole("heading", { name: text });
  }

  protected getFilterOption(optionName: string) {
    return this.page.locator(`[test-filter-checkbox-option="${optionName}"]`);
  }
}
