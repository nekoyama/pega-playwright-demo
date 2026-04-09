import { test, expect } from '@playwright/test';
import { CreateCasePage } from '../pages/CreateCasePage';

test('Create a new case', async ({ page }) => {
  const createCase = new CreateCasePage(page);

  await page.goto('/');
  await createCase.createCase();

  await expect(
    page.getByTestId('case-id')
  ).toBeVisible();
});