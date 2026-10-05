# GreenKart Selenium Practice Test Plan

## Application Overview

Functional test plan for the GreenKart produce storefront at https://rahulshettyacademy.com/seleniumPractise/#/. Covers fresh catalog state, live product search, quantity controls, cart calculations and checkout, promo-code handling, country/terms order completion, and the Top Deals table search/sorting/pagination. The storefront displays product prices in ₹; the offers route is a separate sortable, searchable paginated table. Tests are independent and should begin with a fresh browser state unless setup steps specify otherwise.

## Test Scenarios

### 1. Catalog and Cart

**Seed:** `tests/seed.spec.ts`

#### 1.1. Fresh catalog loads with products and empty cart

**File:** `tests/catalog/fresh-catalog.spec.ts`

**Steps:**
  1. Open https://rahulshettyacademy.com/seleniumPractise/#/ in a fresh browser state.
    - expect: The GreenKart catalog is displayed with product cards, product prices, per-item quantity controls, and ADD TO CART buttons.
  2. Inspect the header cart summary before adding any products.
    - expect: The initial item count is 0 and the total price is 0.
  3. Open the cart control while the cart is empty.
    - expect: The empty-cart state is displayed and no product rows are present.

#### 1.2. Adjust product quantity and verify cart calculations

**File:** `tests/catalog/quantity-and-cart-calculations.spec.ts`

**Steps:**
  1. Open the catalog in a fresh browser state and locate Apple - 1 Kg, listed at ₹72.
    - expect: Apple - 1 Kg is visible with quantity 1 and the minus, quantity, and plus controls.
  2. Click the plus control once, then click ADD TO CART for Apple.
    - expect: The quantity control shows 2 before adding.
  3. Inspect the header cart summary and open the cart dropdown.
    - expect: The header reports 1 cart item and total price ₹144; the item count represents the distinct product line.
  4. Select PROCEED TO CHECKOUT and inspect the order table.
    - expect: The order review contains Apple - 1 Kg with quantity 2, unit price 72, and line total 144; the summary total is 144.

#### 1.3. Product search match, no-match, and clear behavior

**File:** `tests/catalog/product-search.spec.ts`

**Steps:**
  1. Open the catalog in a fresh browser state and enter Apple in the product search box.
    - expect: The product list filters to Apple - 1 Kg, with its price and add-to-cart controls.
  2. Replace the search text with a string that cannot match a product, such as zzz-no-product.
    - expect: No product cards are shown and the no-products-matched message is displayed.
  3. Clear the search box.
    - expect: The full product catalog is restored.

#### 1.4. Quantity decrement boundary before adding to cart

**File:** `tests/catalog/quantity-boundary.spec.ts`

**Steps:**
  1. Open the catalog in a fresh browser state and note a product's initial quantity of 1.
    - expect: The product quantity is 1 before any interaction.
  2. Click that product's minus control once and continue clicking minus while the value remains at its minimum.
    - expect: The quantity does not become negative; the displayed value remains within the supported minimum.
  3. If the interface permits adding the minimum quantity, add the product and inspect the cart summary.
    - expect: Cart quantity and total remain consistent with the accepted quantity; no negative quantity or negative price is added.

### 2. Checkout and Order Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Reject an invalid promo code without changing order total

**File:** `tests/checkout/invalid-promo-code.spec.ts`

**Steps:**
  1. In a fresh state, add one catalog product to the cart and select PROCEED TO CHECKOUT.
    - expect: The order review displays the selected item, quantity, line total, promo-code field, Apply button, discount, and total after discount.
  2. Record the original order total, enter an invalid promo code such as INVALID-CODE, and click Apply.
    - expect: The invalid code is rejected with visible feedback; no discount is applied and the order total remains unchanged.

#### 2.2. Complete checkout by selecting a country and agreeing to terms

**File:** `tests/checkout/complete-order.spec.ts`

**Steps:**
  1. In a fresh state, add one product and continue through the cart dropdown to the checkout review.
    - expect: The order review displays the selected product and its correct total.
  2. Click Place Order.
    - expect: The Choose Country step is displayed with a country selector, a terms checkbox, a Terms & Conditions link, and a Proceed button.
  3. Select India, check the terms agreement box, and click Proceed.
    - expect: Checkout completes and returns to the catalog; the cart is cleared. Any completion confirmation is visible if the application presents one.

#### 2.3. Country selection is required before proceeding

**File:** `tests/checkout/country-required.spec.ts`

**Steps:**
  1. In a fresh state, add one product, proceed through checkout, and click Place Order to reach Choose Country.
    - expect: The country selector starts at its Select placeholder.
  2. Leave the country unselected, check the terms checkbox, and click Proceed.
    - expect: The order is not completed; the user remains on the country step and receives visible validation feedback.

#### 2.4. Terms agreement is required before proceeding

**File:** `tests/checkout/terms-required.spec.ts`

**Steps:**
  1. In a fresh state, add one product, proceed through checkout, and click Place Order to reach Choose Country.
    - expect: The country selector and unchecked terms checkbox are visible.
  2. Select India, leave the terms checkbox unchecked, and click Proceed.
    - expect: The order is not completed; the user remains on the country step and receives visible validation feedback.

### 3. Top Deals

**Seed:** `tests/seed.spec.ts`

#### 3.1. Open Top Deals and verify the offers table

**File:** `tests/offers/offers-table-load.spec.ts`

**Steps:**
  1. Open the catalog in a fresh browser state and select Top Deals.
    - expect: The URL changes to the offers route and a table appears with produce name, price, and discount price columns.
  2. Inspect the initial table and pagination controls.
    - expect: Five rows are displayed at the default page size, sorting state is announced, and pagination indicates additional pages with First/Previous disabled on page 1.

#### 3.2. Search offers by product and handle no matches

**File:** `tests/offers/offers-search.spec.ts`

**Steps:**
  1. Open the Top Deals route in a fresh browser state and enter Tomato in the Search field.
    - expect: The table is filtered to the Tomato row, showing its price and discount price; pagination reflects the filtered result.
  2. Replace the search value with a string that matches no offer.
    - expect: No offer rows match the query and the table does not display unrelated products.
  3. Clear the Search field.
    - expect: The unfiltered offers list returns.

#### 3.3. Sort offers by price in ascending and descending order

**File:** `tests/offers/offers-sort.spec.ts`

**Steps:**
  1. Open Top Deals in a fresh browser state and click the Price column header once.
    - expect: The table announces sorting by price in ascending order, and visible prices are ordered from low to high.
  2. Click the Price column header again.
    - expect: The sort direction changes to descending and visible prices are ordered from high to low.

#### 3.4. Change offers page size and navigate pagination

**File:** `tests/offers/offers-pagination.spec.ts`

**Steps:**
  1. Open Top Deals in a fresh browser state and note the initial page size of 5.
    - expect: Five offer rows are shown and pagination exposes navigation to later pages.
  2. Change Page size to 10.
    - expect: Ten offer rows are shown on the current page and pagination updates to match the remaining data.
  3. Navigate to the next page, then use Previous to return to page 1.
    - expect: The current-page indicator and table rows update correctly; Previous is disabled on page 1 and Next is disabled on the last page.
  4. Use First and Last where enabled.
    - expect: First returns to page 1 and Last moves to the final page, with the corresponding boundary controls disabled.
