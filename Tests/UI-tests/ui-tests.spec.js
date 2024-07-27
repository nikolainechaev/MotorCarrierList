// @ts-check
const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Assert visibility of headers', () => {
  test(' "Motor Carriers" header is visible', async ({ page }) => {
    // create locator
    const motorCarrierHeader = page.locator('//form/h1')
    // Make sure header has correct text.
    await expect(motorCarrierHeader).toHaveText('Motor Carriers')
  })
})
