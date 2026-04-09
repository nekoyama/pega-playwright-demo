import { test as base } from '@playwright/test';
import type { Page, Browser } from '@playwright/test';

export const test = base.extend<{
  page: Page;
}>({
  // Runs once per worker, authenticates using saved state
  page: async ({ browser }: { browser: Browser }, use: (page: Page) => Promise<void>) => {
    const context = await browser.newContext({
      storageState: './auth.json',
    });

    const page = await context.newPage();
    await use(page);

    await context.close();
  }
});

export const expect = base.expect;