// @ts-check
const {expect} = require('@playwright/test');
const userJson = require('../fixtures/users.json');
// await expect(await inputValue.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)).toBeTruthy()

class SignUpPage{
    constructor(page){
        this.page = page;
    }

    openUserModalIcon = async () => {
        const singInItemInNav = await this.page.locator('//div[@class="navbar-collapse"]//a[contains(text(),"Sign up")]');
        await singInItemInNav.click();
        await expect( await this.page.locator('#signInModalLabel') ).toBeVisible();
    }

    signUpWithUsedUsernameAndPassword = async () => {
        const fieldForUserName = await this.page.locator('//h5[@id="signInModalLabel"]/../..//input[@id="sign-username"]');
        await fieldForUserName.fill(userJson.login);
        await expect(fieldForUserName).toHaveValue(userJson.login);
        await expect(fieldForUserName).toHaveValue(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);
        
        const fieldForPassword = await this.page.locator('//h5[@id="signInModalLabel"]/../..//input[@id="sign-password"]');
        await fieldForPassword.fill(userJson.password);
        await expect(fieldForPassword).toHaveValue(userJson.password);
        await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        
        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('This user already exist.');
            await dialog.accept();
        });
        await fieldForUserName.clear();
        await fieldForPassword.clear();
    }

    signUpWithUsernameWithNoPassword = async () => {
        const fieldForUserName = await this.page.locator('//h5[@id="signInModalLabel"]/../..//input[@id="sign-username"]');
        await fieldForUserName.fill(userJson.login);
        await expect(fieldForUserName).toHaveValue(userJson.login);
        await expect(fieldForUserName).toHaveValue(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);

        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Please fill out Username and Password.');
            await dialog.accept();
        });
        await fieldForUserName.clear();
    }

    signUpWithPasswordAndNoUsername = async () => {
        const fieldForPassword = await this.page.locator('//h5[@id="signInModalLabel"]/../..//input[@id="sign-password"]');
        await fieldForPassword.fill(userJson.password);
        await expect(fieldForPassword).toHaveValue(userJson.password);
        await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Please fill out Username and Password.');
            await dialog.accept();
        });
        await fieldForPassword.clear();
    }

    signUpWithUsedUsernameAndPasswordAsNewUser = async () => {
        const fieldForUserName = await this.page.locator('//h5[@id="signInModalLabel"]/../..//input[@id="sign-username"]');
        await fieldForUserName.fill(userJson.newLogin);
        await expect(fieldForUserName).toHaveValue(userJson.newLogin);
        await expect(fieldForUserName).toHaveValue(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);
        
        const fieldForPassword = await this.page.locator('//h5[@id="signInModalLabel"]/../..//input[@id="sign-password"]');
        await fieldForPassword.fill(userJson.password);
        await expect(fieldForPassword).toHaveValue(userJson.password);
        
        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Sign up successful.');
            await dialog.accept();
        });
        await fieldForUserName.clear();
        await fieldForPassword.clear();
    }

    submitSingInUserAccount = async () => {
        const headerInModalIcon = await this.page.locator('//h5[@id="signInModalLabel"]');
        await expect(headerInModalIcon).toBeVisible();

        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();
    }

    closeSingUpUserAccount = async () => {
        const btnToCloseModalIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Close")]');
        await btnToCloseModalIcon.click();
    }
}

module.exports = SignUpPage;