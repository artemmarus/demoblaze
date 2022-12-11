// @ts-check
const {test, expect} = require('@playwright/test');
const BasePage = require('../pageobjects/basepage');
const UserModalIcons = require('../pageobjects/usermodalicons');
const SignInPage = require('../pageobjects/singinpage');
const LoginPage = require('../pageobjects/loginpage');

test.describe("demobaze", () => {
   
  test('should displayed categories by click', async ({page}) => {
    await page.goto('https://demoblaze.com/');
    const basepage = new BasePage(page);
    
    await basepage.checkThatItemsIsDisplayed("Phones");
    await basepage.checkThatItemsIsDisplayed("Laptops");
    await basepage.checkThatItemsIsDisplayed("Monitors");
  });
  
  test('should open user modal icons in the nav menu', async ({page}) => {
    await page.goto('https://demoblaze.com/');
    const userModalIcons = new UserModalIcons(page);
    
    await userModalIcons.openUserModalIcon("#signin2");
    await userModalIcons.submitUserModalIcon('#signInModalLabel')

    // other icons 
  });

  test('should fill sign in page', async ({page}) => {
      await page.goto('https://demoblaze.com/');
      const singinpage = new SignInPage(page);
      const userModalIcons = new UserModalIcons(page);
    
      await userModalIcons.openUserModalIcon("#signin2");
      await userModalIcons.submitUserModalIcon('#signInModalLabel');

      await singinpage.fillInputForUserName("marusetchenko99@gmail.com");
      await singinpage.fillInputForPassword("Camel11case");
    });
})