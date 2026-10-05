import { test, expect } from '@playwright/test';

test.describe('Catalog and Cart', () => {
  test('Quantity decrement boundary before adding to cart', async ({ page }) => {
    // 1. Open the catalog and verify the default quantity.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const productCard = page.getByRole('heading', { name: 'Brocolli - 1 Kg' }).locator('..');
    const quantity = productCard.getByRole('spinbutton');
    await expect(quantity).toHaveValue('1');

    // 2. Click minus at the minimum and verify quantity does not become negative.
    await productCard.getByRole('link', { name: '–' }).click();
    await expect(quantity).toHaveValue('1');

    // 3. Add the displayed minimum quantity and verify the cart has a valid item and total.
    await productCard.getByRole('button', { name: 'ADD TO CART' }).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('row', { name: 'Items : 1' })).toBeVisible();
    await expect(page.getByRole('row', { name: 'Price : 120' })).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(1);
  });
});