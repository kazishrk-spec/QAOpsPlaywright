import { test, expect } from '@playwright/test';

test.describe('Catalog and Cart', () => {
  test('Adjust product quantity and verify cart calculations', async ({ page }) => {
    // 1. Open the catalog and locate Apple - 1 Kg.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const appleCard = page.getByRole('heading', { name: 'Apple - 1 Kg' }).locator('..');
    const appleQuantity = appleCard.getByRole('spinbutton');
    await expect(appleCard).toBeVisible();
    await expect(appleCard).toContainText('72');
    await expect(appleQuantity).toHaveValue('1');
    await expect(appleCard.getByRole('link', { name: '–' })).toBeVisible();
    await expect(appleCard.getByRole('link', { name: '+' })).toBeVisible();

    // 2. Increase the quantity once and add Apple to the cart.
    await appleCard.getByRole('link', { name: '+' }).click();
    await expect(appleQuantity).toHaveValue('2');
    await appleCard.getByRole('button', { name: 'ADD TO CART' }).click();

    // 3. Inspect the header cart summary and open the cart dropdown.
    await expect(page.getByRole('row', { name: 'Items : 1' })).toBeVisible();
    await expect(page.getByRole('row', { name: 'Price : 144' })).toBeVisible();
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();

    // 4. Open checkout and verify the order review.
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await expect(page.getByRole('row', { name: 'Apple - 1 Kg 2 72 144' })).toBeVisible();
    await expect(page.getByText(/Total After Discount\s*:\s*144/)).toBeVisible();
  });
});