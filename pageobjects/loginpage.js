// @ts-check
const { expect } = require("@playwright/test");
const userJson = require('../fixtures/users.json');

class LoginPage {
    constructor(page){
        this.page = page;
    }

    openUserModalIcon = async () => {
        const loginItemInNav = await this.page.locator('//div[@class="navbar-collapse"]//a[contains(text(),"Log in")]');
        await loginItemInNav.click();
        await expect( await this.page.locator('//div[@id="logInModal"]//div[@class ="modal-content"]') ).toBeVisible();
    }
    
    logInWithUsedUsernameAndPassword = async () => {
        const fieldForUserName = await this.page.locator('//h5[@id="logInModalLabel"]/../..//input[@id="loginusername"]');
        await fieldForUserName.fill(userJson.commonLogin);
        await expect(fieldForUserName).toHaveValue(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);
        await expect(fieldForUserName).toHaveValue(userJson.commonLogin);
        
        const fieldForPassword = await this.page.locator('//h5[@id="logInModalLabel"]/../..//input[@id="loginpassword"]');
        await fieldForPassword.fill(userJson.commonPassword);
        await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        await expect(fieldForPassword).toHaveValue(userJson.commonPassword);

        const buttonToSubmitLogIn = await this.page.locator('//h5[@id="logInModalLabel"]/../..//button[contains(text(), "Log in")]');
        await buttonToSubmitLogIn.click();

        // result of success log in 
        await expect(await this.page.locator('//h5[@id="logInModalLabel"]/../..')).toBeVisible({visible: false});
    }

    logInWithUsedWrongUsernameAndPassword = async () => {
        const fieldForUserName = await this.page.locator('//h5[@id="logInModalLabel"]/../..//input[@id="loginusername"]');
        await fieldForUserName.fill(userJson.wrongLogin);
        await expect(fieldForUserName).toHaveValue(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);
        await expect(fieldForUserName).toHaveValue(userJson.wrongLogin);
        
        const fieldForPassword = await this.page.locator('//h5[@id="logInModalLabel"]/../..//input[@id="loginpassword"]');
        await fieldForPassword.fill(userJson.wrongPassword);
        await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        await expect(fieldForPassword).toHaveValue(userJson.wrongPassword);

        const buttonToSubmitLogIn = await this.page.locator('//h5[@id="logInModalLabel"]/../..//button[contains(text(), "Log in")]');
        await buttonToSubmitLogIn.click();

         this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('User does not exist.');
            await dialog.accept();
        });
        await fieldForUserName.clear();
        await fieldForPassword.clear();
    }
    logInUsedOnlyUserName = async () => {
        const fieldForUserName = await this.page.locator('//h5[@id="logInModalLabel"]/../..//input[@id="loginusername"]');
        await fieldForUserName.fill(userJson.login);
        await expect(fieldForUserName).toHaveValue(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);
        await expect(fieldForUserName).toHaveValue(userJson.login);

        const buttonToSubmitLogIn = await this.page.locator('//h5[@id="logInModalLabel"]/../..//button[contains(text(), "Log in")]');
        await buttonToSubmitLogIn.click();

         this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Please fill out Username and Password.');
            await dialog.accept();
        });
        await fieldForUserName.clear();
    }

    logInUsedOnlyPassword = async () => {
        const fieldForPassword = await this.page.locator('//h5[@id="logInModalLabel"]/../..//input[@id="loginpassword"]');
        await fieldForPassword.fill(userJson.password);
        await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        await expect(fieldForPassword).toHaveValue(userJson.password);

        const buttonToSubmitLogIn = await this.page.locator('//h5[@id="logInModalLabel"]/../..//button[contains(text(), "Log in")]');
        await buttonToSubmitLogIn.click();

         this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Please fill out Username and Password.');
            await dialog.accept();
        });
        await fieldForPassword.clear();
    }
    
    closeLogInpUserAccount = async () => {
        const btnToCloseModalIcon = await this.page.locator('//h5[@id="logInModalLabel"]/../..//button[contains(text(), "Close")]');
        await btnToCloseModalIcon.click();
    }
}

module.exports = LoginPage; 