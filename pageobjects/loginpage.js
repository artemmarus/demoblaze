// @ts-check

const { expect } = require("@playwright/test");
const BasePage = require("./basepage");

class LoginPage extends BasePage {
    constructor(page){
        super(page);
    }

    fillInputForUserName = async (userName) => {
        const fieldForUserName = await this.page.locator('#loginusername');
        await fieldForUserName.fill(userName);

        await expect(fieldForUserName).toHaveValue(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);
    }

    fillInputForPassword = async (password) => {
        const fieldForPassword = await this.page.locator('#loginpassword');
        await fieldForPassword.fill(password);

        // await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    }
}