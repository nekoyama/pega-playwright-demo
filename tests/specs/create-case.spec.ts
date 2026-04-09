import { test, expect } from '../fixtures/auth.fixture.js';
import { CreateCasePage } from '../pages/CreateCasePage.js';

test('Create a new case', async ({ page }) => {
  const createCase = new CreateCasePage(page);

  await page.goto('/');
  await createCase.createCase();

  await expect(
    page.getByTestId('case-id')
  ).toBeVisible();
});


test('Create a new case simple', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('create-case-btn').click();
});