import { Page } from '@playwright/test';

export class CreateCasePage {
  constructor(private page: Page) {}

  createButton = this.page.getByTestId('create-btn');
  caseType      = this.page.getByTestId('case-type');
  submitButton  = this.page.getByTestId('submit-btn');

  async createCase() {
    await this.createButton.click();
    await this.caseType.click();
    await this.submitButton.click();
  }
}