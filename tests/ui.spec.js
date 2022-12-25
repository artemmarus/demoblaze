// @ts-check
const {test, expect} = require('@playwright/test');
const BasePage = require('../pageobjects/basepage');
const SignUpPage = require('../pageobjects/singuppage');
const LoginPage = require('../pageobjects/loginpage');

test.describe("demobaze", () => {

   // test.beforeEach(async ({page}) => {
   //    await page.goto('https://demoblaze.com/');
   // });
   
  test('should displayed categories by click', async ({page}) => {
    await page.goto('https://demoblaze.com/');
    const basepage = new BasePage(page);
    
    await basepage.checkThatItemsIsDisplayed("Phones");
    await basepage.checkThatItemsIsDisplayed("Laptops");
    await basepage.checkThatItemsIsDisplayed("Monitors"); //  заменить на проверку сразу всех категорий
  });
  
  test('should try to sign up with used login and password', async ({page}) => {
        await page.goto('https://demoblaze.com/');
        const singuppage = new SignUpPage(page);

        await singuppage.openUserModalIcon();
        await singuppage.signUpWithUsedUsernameAndPassword();
        await singuppage.closeSingUpUserAccount();
    });

  test('should try to sign up with used login but without password',async ({page}) => {
        await page.goto('https://demoblaze.com/');
        const singuppage = new SignUpPage(page);

        await singuppage.openUserModalIcon();
        await singuppage.signUpWithUsernameWithNoPassword();
        await singuppage.closeSingUpUserAccount();
    });

  test('should try to sign up with used password but without login',async ({page}) => {
        await page.goto('https://demoblaze.com/');
        const singuppage = new SignUpPage(page);

        await singuppage.openUserModalIcon();
        await singuppage.signUpWithPasswordAndNoUsername();
        await singuppage.closeSingUpUserAccount();
    });

  test('should try to sign up as a new user',async ({page}) => {
        await page.goto('https://demoblaze.com/');
        const singuppage = new SignUpPage(page);

        await singuppage.openUserModalIcon();
        await singuppage.signUpWithUsedUsernameAndPasswordAsNewUser();
        await singuppage.closeSingUpUserAccount();
    });

    test('should try to log in with wrong login and password', async ({page}) => {
       await page.goto('https://demoblaze.com/');
       const loginpage = new LoginPage(page);

       await loginpage.openUserModalIcon();
       await loginpage.logInWithUsedWrongUsernameAndPassword();
       await loginpage.closeLogInpUserAccount();
    });

    test('should try to log in with login but without password', async ({page}) => {
       await page.goto('https://demoblaze.com/');
       const loginpage = new LoginPage(page);

       await loginpage.openUserModalIcon();
       await loginpage.logInUsedOnlyUserName();
       await loginpage.closeLogInpUserAccount();
    });

    test('should try to log in with password but without login', async ({page}) => {
       await page.goto('https://demoblaze.com/');
       const loginpage = new LoginPage(page);

       await loginpage.openUserModalIcon();
       await loginpage.logInUsedOnlyPassword();
       await loginpage.closeLogInpUserAccount();
    });

    test('should try to log in with common login and password', async ({page}) => {
       await page.goto('https://demoblaze.com/');
       const loginpage = new LoginPage(page);

       await loginpage.openUserModalIcon();
       await loginpage.logInWithUsedUsernameAndPassword();
    });

    test('should add some item to the cart then delete it',  async ({page}) => {
       await page.goto('https://demoblaze.com/');
       const basepage = new BasePage(page);

       await basepage.addItemToTheCart();
       await basepage.deleteItemsFromTheCart();
    });

    test("1", async ({page}) => {
      await page.goto('https://demoblaze.com/');
      const basepage = new BasePage(page);

      await basepage.addItemToTheCart();
      await basepage.createOrderWithItems();
    })

    test('should send message', async ({page}) => {
       await page.goto('https://demoblaze.com/');
       const basepage = new BasePage(page);

       await basepage.openContactModalIcon();
       await basepage.sendMessageToContact();
    });
})