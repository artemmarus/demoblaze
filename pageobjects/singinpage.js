// @ts-check
const {expect} = require('@playwright/test');
const BasePage = require('./basepage');
const userJson = require('../fixtures/users.json')

class SignInPage extends BasePage {
    constructor(page){
        super(page);
    }
    openUserModalIcon = async () => {
        const singinItemInNav = await this.page.locator('#signin2');
        await singinItemInNav.click();
        await expect( await this.page.locator('#signInModalLabel') ).toBeVisible();
    }
    fillInputForUserName = async (userName) => {
        const fieldForUserName = await this.page.locator('#sign-username');
        await fieldForUserName.fill(userName);
        const inputValue = await fieldForUserName.inputValue();
        await expect(await inputValue.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)).toBeTruthy()
    }

    fillInputForPassword = async (password) => {
        const fieldForPassword = await this.page.locator('#sign-password');
        await fieldForPassword.fill(password);
        await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    }

    useTakenUsernamedWithNoPassword = async () => {
        const fieldForUserName = await this.page.locator('#sign-username');
        await fieldForUserName.fill(userJson.login);
        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Please fill out Username and Password.');
            await dialog.accept();
        });
        await fieldForUserName.clear();
    }
    signUpWithUsedUsernameAndPassword = async () => {
        const fieldForUserName = await this.page.locator('#sign-username');
        await fieldForUserName.fill(userJson.login);
        
        const fieldForPassword = await this.page.locator('#sign-password');
        await fieldForPassword.fill(userJson.password);
        
        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();
        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            console.log(await dialog.message())
            await expect(await dialog.message()).toContain('This user already exist.');
            await dialog.accept();
        });
        await fieldForUserName.clear();
        await fieldForPassword.clear();
    }

    usePasswordWithoutUsername = async () => {
        const fieldForPassword = await this.page.locator('#sign-password');
        await fieldForPassword.fill(userJson.password);

        const submitButtonInIcon = await this.page.locator('//h5[@id="signInModalLabel"]/../..//button[contains(text(), "Sign up")]');
        await submitButtonInIcon.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Please fill out Username and Password.');
            await dialog.accept();
        });
        await fieldForPassword.clear();
    }

    submitSinginUserAccount = async () => {
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

module.exports = SignInPage;