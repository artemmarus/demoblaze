// @ts-check
const {expect} = require('@playwright/test');
const BasePage = require('./basepage');

class SignInPage extends BasePage {
    constructor(page){
        super(page);
    }

    fillInputForUserName = async (userName) => {
        const fieldForUserName = await this.page.locator('#sign-username');
        await fieldForUserName.fill(userName);git remote add origin https://github.com/artemmarus/demoblaze.git

        const inputValue = await fieldForUserName.inputValue();
        console.log(typeof(userName))
        await expect(await inputValue.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)).toBeTruthy()
    }

    fillInputForPassword = async (password) => {
        const fieldForPassword = await this.page.locator('#sign-password');
        await fieldForPassword.fill(password);

        await expect(fieldForPassword).toHaveValue(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

    }
}

module.exports = SignInPage;