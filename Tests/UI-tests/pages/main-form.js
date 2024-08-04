const { expect } = require('@playwright/test')

class MainForm {
  constructor(page) {
    this.page = page
    this.motorCarrierHeader = page.locator('//form/h1')
    this.nameInput = page.locator(
      'body > app-root > div > div:nth-child(1) > form > div:nth-child(2) > input'
    )
    this.companyInput = page.locator(
      'body > app-root > div > div:nth-child(1) > form > div:nth-child(3) > input'
    )
    this.emailInput = page.locator(
      'body > app-root > div > div:nth-child(1) > form > div:nth-child(4) > input'
    )
    this.phoneInput = page.locator(
      'body > app-root > div > div:nth-child(1) > form > div:nth-child(5) > input'
    )
    this.addButton = page.locator(
      'body > app-root > div > div:nth-child(1) > form > div:nth-child(7) > button'
    )
    this.deleteButton = page.locator(
      'body > app-root > div > div> ul > li > div.mt-4.flex.w-full.gap-4 > button:nth-child(2) > svg > path'
    )
    this.contactFirstAndLastName = page.getByText('First Last')
  }

  async goto() {
    await this.page.goto('http://localhost:4200/')
  }
}

module.exports = MainForm
