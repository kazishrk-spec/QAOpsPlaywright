import { test, expect } from '@playwright/test';

test.describe('Catalog and Cart', () => {
  test('Product search match, no-match, and clear behavior', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
    const appleHeading = page.getByRole('heading', { name: 'Apple - 1 Kg' });
    const appleCard = appleHeading.locator('..');

    // 1. Open the catalog and search for Apple.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await searchBox.fill('Apple');
    await expect(appleHeading).toBeVisible();
    await expect(appleCard).toContainText('72');
    await expect(appleCard.getByRole('button', { name: 'ADD TO CART' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toHaveCount(0);

    // 2. Replace the query with text that matches no product.
    await searchBox.fill('zzz-no-product');
    await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'ADD TO CART' })).toHaveCount(0);

    // 3. Clear the search field and confirm the full catalog returns.
    await searchBox.fill('');
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();
    await expect(appleHeading).toBeVisible();
    await expect(page.getByRole('button', { name: 'ADD TO CART' }).first()).toBeVisible();
  });
});