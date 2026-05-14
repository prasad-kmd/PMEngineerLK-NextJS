
import { test, expect } from '@playwright/test';

test('verify final block rendering', async ({ page }) => {
  await page.goto('http://localhost:3000/pages/test-blocks');

  // Wait for content to load
  await page.waitForSelector('.prose');

  // Verify Button
  const button = page.locator('a:has-text("Go to Google")');
  await expect(button).toBeVisible();

  // Verify Tabs
  const tabs = page.locator('.interactive-tabs-placeholder');
  const tabTrigger = page.getByRole('tab', { name: 'Code' });
  await expect(tabTrigger).toBeVisible();

  // Verify Mermaid
  const mermaid = page.locator('.mermaid-block-container').first();
  await expect(mermaid).toBeVisible();

  // Verify File block
  const fileBlock = page.locator('a:has-text("resource-guide.pdf")');
  await expect(fileBlock).toBeVisible();

  await page.screenshot({ path: 'verification/screenshots/verification_v3.png', fullPage: true });
});
