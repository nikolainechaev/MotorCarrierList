import { test, expect } from '@playwright/test'
const MainForm = require('./pages/main-form.js')

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Assert visibility of header', () => {
  let mainForm
  test('"Motor Carriers" header is visible', async ({ page }) => {
    mainForm = new MainForm(page)
    await expect(mainForm.motorCarrierHeader).toHaveText('Motor Carriers')
  })
})

test.describe('Assert if contact can be created', () => {
  let mainForm
  test('Create contact function is working', async ({ page }) => {
    mainForm = new MainForm(page)
    await mainForm.nameInput.fill('First Last')
    await mainForm.companyInput.fill('SomeCompany LLC')
    await mainForm.emailInput.fill('someemail@gmail.com')
    await mainForm.phoneInput.fill('513-282-0000')
    await page.waitForTimeout(1000)
    await mainForm.addButton.click()
    await page.waitForTimeout(2000)
    await page.reload()
    expect(mainForm.contactFirstAndLastName).toContainText('First Last')
    // clean up
    await mainForm.deleteButton.click()
  })
})
