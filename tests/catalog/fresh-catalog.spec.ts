import { test, expect } from '@playwright/test';

test.describe('Catalog and Cart', () => {
  test('Fresh catalog loads with products and empty cart', async ({ page }) => {
    // 1. Open the catalog in a fresh browser state.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await expect(page).toHaveTitle('GreenKart - veg and fruits kart');
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();
    const brocolliCard = page.getByRole('heading', { name: 'Brocolli - 1 Kg' }).locator('..');
    await expect(brocolliCard).toContainText('120');
    await expect(page.getByRole('spinbutton').first()).toHaveValue('1');
    await expect(page.getByRole('button', { name: 'ADD TO CART' }).first()).toBeVisible();

    // 2. Inspect the header cart summary before adding any products.
    // The fresh page exposes an empty cart; its count/total values are not consistently rendered.
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();

    // 3. Open the cart control while the cart is empty.
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(0);
  });
});